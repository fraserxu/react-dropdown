import * as React from 'react'
import * as classNames from 'classnames'

export interface Option {
  label: string
  value: string
  type?: string
  name?: string
  items?: Array<Option>
}

export interface DropdownProps {
  className?: string
  baseClassName?: string
  disabled?: boolean
  value?: string | Option
  placeholder?: string
  options?: Array<Option | string>
  onFocus?: (isOpen: boolean) => void
  onChange?: (data: string | Option) => void
}

export interface DropdownState {
  isOpen: boolean
  selected: string | Option
}

const DEFAULT_PLACEHOLDER_STRING = 'Select...'

class Dropdown extends React.Component<DropdownProps, DropdownState> {
  private mounted: boolean
  private container: HTMLDivElement

  static defaultProps: DropdownProps = {
    baseClassName: 'Dropdown',
    options: []
  }
  constructor(props: DropdownProps) {
    super(props)

    this.state = {
      isOpen: false,
      selected: props.value || {
        label: props.placeholder || DEFAULT_PLACEHOLDER_STRING,
        value: ''
      }
    }

    this.mounted = true
    this.getContainer = this.getContainer.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  componentWillReceiveProps(newProps: DropdownProps) {
    if (newProps.value && newProps.value !== this.state.selected) {
      this.setState({ selected: newProps.value })
    } else if (!newProps.value) {
      this.setState({
        selected: {
          label: newProps.placeholder || DEFAULT_PLACEHOLDER_STRING,
          value: ''
        }
      })
    }
  }

  componentDidMount() {
    document.addEventListener(
      'click',
      this.handleDocumentClick.bind(this),
      false
    )
    document.addEventListener(
      'touchend',
      this.handleDocumentClick.bind(this),
      false
    )
  }

  componentWillUnmount() {
    this.mounted = false
    document.removeEventListener(
      'click',
      this.handleDocumentClick.bind(this),
      false
    )
    document.removeEventListener(
      'touchend',
      this.handleDocumentClick.bind(this),
      false
    )
  }

  getContainer(ref: HTMLDivElement) {
    this.container = ref
  }

  handleMouseDown(
    event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>
  ) {
    const { isOpen } = this.state
    if (this.props.onFocus && typeof this.props.onFocus === 'function') {
      this.props.onFocus(isOpen)
    }

    // if (event.type === 'mousedown' && event.button !== 0) return
    event.stopPropagation()
    event.preventDefault()

    if (!this.props.disabled) {
      this.setState({
        isOpen: !isOpen
      })
    }
  }

  setValue(value: string, label: string) {
    const newState = {
      selected: {
        value,
        label
      },
      isOpen: false
    }
    this.fireChangeEvent(newState)
    this.setState(newState)
  }

  fireChangeEvent(newState: DropdownState) {
    if (newState.selected !== this.state.selected && this.props.onChange) {
      this.props.onChange(newState.selected)
    }
  }

  renderOption(option: Option | string) {
    const { baseClassName } = this.props
    const { selected } = this.state

    const optionClassName = classNames(`${baseClassName}-option`, {
      'is-selected': option === selected
    })

    let value, label
    if (typeof option === 'string') {
      value = option
      label = option
    } else {
      value = option.value || option.label
      value = option.label || option.value
    }

    return (
      <div
        key={value}
        className={optionClassName}
        onMouseDown={this.setValue.bind(this, value, label)}
        onClick={this.setValue.bind(this, value, label)}
      >
        {label}
      </div>
    )
  }

  buildMenu() {
    const { options, baseClassName } = this.props
    const optionsElements = options.map(option => {
      if (typeof option === 'object' && option.type === 'group') {
        const groupTitleClassName = `${baseClassName}-title`
        const groupClassName = `${baseClassName}-group`
        const groupTitleElement = (
          <div className={groupTitleClassName}>{option.name}</div>
        )
        const subOptionsElements = option.items.map(item =>
          this.renderOption(item)
        )

        return (
          <div key={option.name} className={groupClassName}>
            {groupTitleElement}
            {subOptionsElements}
          </div>
        )
      } else {
        return this.renderOption(option)
      }
    })

    const noOptionClassName = `${baseClassName}-noresults`
    const noOptionElement = (
      <div className={noOptionClassName}>No options found</div>
    )
    return optionsElements.length ? optionsElements : noOptionElement
  }

  handleDocumentClick(event: React.MouseEvent<HTMLElement>) {
    if (this.mounted) {
      if (!this.container.contains(event.target as Node)) {
        if (this.state.isOpen) {
          this.setState({
            isOpen: false
          })
        }
      }
    }
  }

  render() {
    const { baseClassName, className, disabled } = this.props
    const { selected, isOpen } = this.state

    const placeHolderValue =
      typeof selected === 'string' ? selected : selected.label

    const disabledClassName = disabled ? 'Dropdown-disabled' : ''
    const dropdownRootClassName = classNames(`${baseClassName}-root`, {
      [className]: !!className,
      'is-open': isOpen
    })
    const dropdownControlClassName = classNames(
      `${baseClassName}-control`,
      disabledClassName
    )
    const placeHolderClassName = `${baseClassName}-placeholder`
    const placeHolderArrowClassName = `${baseClassName}-arrow`
    const menuClassName = `${baseClassName}-menu`

    return (
      <div className={dropdownRootClassName} ref={this.getContainer}>
        <div
          className={dropdownControlClassName}
          onMouseDown={this.handleMouseDown}
          onTouchEnd={this.handleMouseDown}
        >
          <div className={placeHolderClassName}>
            {placeHolderValue}
            <span className={placeHolderArrowClassName} />
          </div>
        </div>
        {isOpen && <div className={menuClassName}>{this.buildMenu()}</div>}
      </div>
    )
  }
}

export default Dropdown
