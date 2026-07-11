import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'

export type DropdownValue = string | number | boolean

export interface Option {
  value: DropdownValue
  label: ReactNode
  className?: string
  disabled?: boolean
  data?: Record<string, string | number | boolean | undefined>
}

export interface Group {
  type: 'group'
  name: ReactNode
  items: DropdownItem[]
}

export type DropdownItem = Option | DropdownValue
export type DropdownEntry = Group | DropdownItem

export interface RenderOptionState {
  active: boolean
  selected: boolean
}

export interface ReactDropdownProps {
  options: DropdownEntry[]
  value?: Option | DropdownValue | null
  defaultValue?: Option | DropdownValue | null
  open?: boolean
  defaultOpen?: boolean
  placeholder?: ReactNode
  disabled?: boolean
  name?: string
  form?: string
  id?: string
  tabIndex?: number
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-required'?: boolean
  baseClassName?: string
  className?: string
  controlClassName?: string
  placeholderClassName?: string
  menuClassName?: string
  optionClassName?: string | ((option: Option, state: RenderOptionState) => string | undefined)
  arrowClassName?: string
  arrowClosed?: ReactNode
  arrowOpen?: ReactNode
  noOptionsContent?: ReactNode
  renderOption?: (option: Option, state: RenderOptionState) => ReactNode
  onChange?: (option: Option) => void
  onFocus?: (isOpen: boolean) => void
  onOpenChange?: (isOpen: boolean) => void
}

interface NormalizedOption {
  option: Option
  index: number
  key: string
}

interface NormalizedOptionEntry {
  type: 'option'
  item: NormalizedOption
}

interface NormalizedGroupEntry {
  type: 'group'
  key: string
  name: ReactNode
  items: NormalizedOption[]
}

type NormalizedEntry = NormalizedOptionEntry | NormalizedGroupEntry

const DEFAULT_PLACEHOLDER = 'Select...'

function cx(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ')
}

function isGroup(entry: DropdownEntry): entry is Group {
  return typeof entry === 'object' && entry !== null && 'type' in entry && entry.type === 'group'
}

function isOption(item: DropdownItem | Option | DropdownValue | null | undefined): item is Option {
  return typeof item === 'object' && item !== null && 'value' in item && 'label' in item
}

function normalizeOption(item: DropdownItem): Option {
  return isOption(item) ? item : { value: item, label: String(item) }
}

function valueOf(value: Option | DropdownValue | null | undefined): DropdownValue | null | undefined {
  return isOption(value) ? value.value : value
}

function optionMatches(option: Option, value: Option | DropdownValue | null | undefined): boolean {
  return Object.is(option.value, valueOf(value))
}

function getNextEnabledIndex(options: NormalizedOption[], start: number, direction: 1 | -1): number {
  if (options.length === 0) return -1

  for (let offset = 1; offset <= options.length; offset += 1) {
    const index = (start + direction * offset + options.length) % options.length
    if (!options[index]?.option.disabled) return index
  }

  return -1
}

const Dropdown = forwardRef<HTMLButtonElement, ReactDropdownProps>(function Dropdown(
  {
    options,
    value,
    defaultValue = null,
    open,
    defaultOpen = false,
    placeholder = DEFAULT_PLACEHOLDER,
    disabled = false,
    name,
    form,
    id,
    tabIndex,
    baseClassName = 'Dropdown',
    className,
    controlClassName,
    placeholderClassName,
    menuClassName,
    optionClassName,
    arrowClassName,
    arrowClosed,
    arrowOpen,
    noOptionsContent = 'No options found',
    renderOption,
    onChange,
    onFocus,
    onOpenChange,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-required': ariaRequired,
  },
  forwardedRef,
) {
  const generatedId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const controlRef = useRef<HTMLButtonElement>(null)
  const [internalValue, setInternalValue] = useState<Option | DropdownValue | null>(defaultValue)
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const [activeIndex, setActiveIndex] = useState(-1)

  const isControlled = value !== undefined
  const isOpenControlled = open !== undefined
  const currentValue = isControlled ? value : internalValue
  const isOpen = isOpenControlled ? open : internalOpen
  const controlId = id ?? `react-dropdown-${generatedId}`
  const menuId = `${controlId}-listbox`

  useImperativeHandle(forwardedRef, () => controlRef.current as HTMLButtonElement, [])

  const { entries, flatOptions } = useMemo(() => {
    const normalizedEntries: NormalizedEntry[] = []
    const normalizedFlatOptions: NormalizedOption[] = []

    const addOption = (item: DropdownItem, keyPrefix: string): NormalizedOption => {
      const option = normalizeOption(item)
      const normalized = {
        option,
        index: normalizedFlatOptions.length,
        key: `${keyPrefix}-${typeof option.value}-${String(option.value)}`,
      }
      normalizedFlatOptions.push(normalized)
      return normalized
    }

    options.forEach((entry, entryIndex) => {
      if (isGroup(entry)) {
        normalizedEntries.push({
          type: 'group',
          key: `group-${entryIndex}`,
          name: entry.name,
          items: entry.items.map((item, itemIndex) => addOption(item, `${entryIndex}-${itemIndex}`)),
        })
      } else {
        normalizedEntries.push({
          type: 'option',
          item: addOption(entry, String(entryIndex)),
        })
      }
    })

    return { entries: normalizedEntries, flatOptions: normalizedFlatOptions }
  }, [options])

  const selectedOption = useMemo(
    () => flatOptions.find(({ option }) => optionMatches(option, currentValue))?.option,
    [currentValue, flatOptions],
  )
  const selectedIndex = selectedOption
    ? flatOptions.findIndex(({ option }) => Object.is(option.value, selectedOption.value))
    : -1
  const activeOption = flatOptions[activeIndex]
  const safeActiveIndex = activeOption && !activeOption.option.disabled ? activeIndex : -1

  const updateOpen = useCallback(
    (nextOpen: boolean) => {
      if (nextOpen === isOpen) return
      if (!isOpenControlled) setInternalOpen(nextOpen)
      onOpenChange?.(nextOpen)
    },
    [isOpen, isOpenControlled, onOpenChange],
  )

  const activateInitialOption = useCallback(
    (direction: 1 | -1 = 1) => {
      if (selectedIndex >= 0 && !flatOptions[selectedIndex]?.option.disabled) {
        setActiveIndex(selectedIndex)
        return
      }

      const edge = direction === 1 ? -1 : 0
      setActiveIndex(getNextEnabledIndex(flatOptions, edge, direction))
    },
    [flatOptions, selectedIndex],
  )

  const openMenu = (direction: 1 | -1 = 1) => {
    if (disabled) return
    activateInitialOption(direction)
    updateOpen(true)
  }

  const selectOption = (option: Option) => {
    if (option.disabled) return
    if (!isControlled) setInternalValue(option)
    onChange?.(option)
    updateOpen(false)
    controlRef.current?.focus()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        event.preventDefault()
        const direction = event.key === 'ArrowDown' ? 1 : -1
        if (!isOpen) {
          openMenu(direction)
        } else {
          setActiveIndex((current) => getNextEnabledIndex(flatOptions, current, direction))
        }
        break
      }
      case 'Enter':
      case ' ': {
        event.preventDefault()
        if (!isOpen) {
          openMenu()
        } else if (safeActiveIndex >= 0) {
          const activeOption = flatOptions[safeActiveIndex]
          if (activeOption) selectOption(activeOption.option)
        }
        break
      }
      case 'Escape':
        if (isOpen) {
          event.preventDefault()
          updateOpen(false)
        }
        break
      case 'Home':
      case 'End':
        if (isOpen) {
          event.preventDefault()
          const direction = event.key === 'Home' ? 1 : -1
          const edge = direction === 1 ? -1 : 0
          setActiveIndex(getNextEnabledIndex(flatOptions, edge, direction))
        }
        break
      case 'Tab':
        updateOpen(false)
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (!isOpen) return undefined

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) updateOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [isOpen, updateOpen])

  useEffect(() => {
    if (!isOpen) return
    if (activeIndex < 0 || activeIndex >= flatOptions.length || flatOptions[activeIndex]?.option.disabled) {
      activateInitialOption()
    }
  }, [activeIndex, activateInitialOption, flatOptions, isOpen])

  const renderNormalizedOption = ({ option, index, key }: NormalizedOption) => {
    const selected = selectedOption ? Object.is(option.value, selectedOption.value) : false
    const active = index === safeActiveIndex
    const state = { active, selected }
    const customOptionClass =
      typeof optionClassName === 'function' ? optionClassName(option, state) : optionClassName
    const dataAttributes = Object.fromEntries(
      Object.entries(option.data ?? {}).map(([dataKey, dataValue]) => [`data-${dataKey}`, dataValue]),
    )

    return (
      <li
        id={`${menuId}-option-${index}`}
        key={key}
        className={cx(
          `${baseClassName}-option`,
          option.className,
          customOptionClass,
          selected && 'is-selected',
          active && 'is-active',
          option.disabled && 'is-disabled',
        )}
        role="option"
        aria-selected={selected}
        aria-disabled={option.disabled || undefined}
        onClick={() => selectOption(option)}
        onPointerDown={(event) => event.preventDefault()}
        onPointerMove={() => !option.disabled && setActiveIndex(index)}
        {...dataAttributes}
      >
        {renderOption ? renderOption(option, state) : option.label}
      </li>
    )
  }

  return (
    <div
      ref={rootRef}
      className={cx(`${baseClassName}-root`, className, isOpen && 'is-open')}
    >
      <button
        ref={controlRef}
        id={controlId}
        className={cx(
          `${baseClassName}-control`,
          controlClassName,
          disabled && `${baseClassName}-disabled`,
        )}
        type="button"
        tabIndex={tabIndex}
        role="combobox"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-controls={isOpen ? menuId : undefined}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-activedescendant={
          isOpen && safeActiveIndex >= 0 ? `${menuId}-option-${safeActiveIndex}` : undefined
        }
        aria-required={ariaRequired}
        disabled={disabled}
        onBlur={() => updateOpen(false)}
        onClick={() => (isOpen ? updateOpen(false) : openMenu())}
        onFocus={() => onFocus?.(isOpen)}
        onKeyDown={handleKeyDown}
      >
        <span
          className={cx(
            `${baseClassName}-placeholder`,
            placeholderClassName,
            selectedOption && 'is-selected',
          )}
        >
          {selectedOption?.label ?? placeholder}
        </span>
        <span className={`${baseClassName}-arrow-wrapper`} aria-hidden="true">
          {arrowOpen !== undefined && arrowClosed !== undefined ? (
            isOpen ? arrowOpen : arrowClosed
          ) : (
            <span className={cx(`${baseClassName}-arrow`, arrowClassName)} />
          )}
        </span>
      </button>

      {name ? (
        <input
          type="hidden"
          name={name}
          form={form}
          value={selectedOption ? String(selectedOption.value) : ''}
        />
      ) : null}

      {isOpen ? (
        <ul id={menuId} className={cx(`${baseClassName}-menu`, menuClassName)} role="listbox">
          {entries.length > 0 ? (
            entries.map((entry) => {
              if (entry.type === 'option') return renderNormalizedOption(entry.item)

              const groupLabelId = `${menuId}-${entry.key}-label`
              return (
                <li className={`${baseClassName}-group`} key={entry.key} role="presentation">
                  <div
                    id={groupLabelId}
                    className={`${baseClassName}-title`}
                    role="presentation"
                  >
                    {entry.name}
                  </div>
                  <ul role="group" aria-labelledby={groupLabelId}>
                    {entry.items.map(renderNormalizedOption)}
                  </ul>
                </li>
              )
            })
          ) : (
            <li className={`${baseClassName}-noresults`} role="presentation">
              {noOptionsContent}
            </li>
          )}
        </ul>
      ) : null}
    </div>
  )
})

Dropdown.displayName = 'Dropdown'

export default Dropdown
