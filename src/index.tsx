import * as React from 'react'
import * as classNames from 'classnames'

interface Option {
  label: string
  value: string
  type?: string
  name?: string
  items?: Array<Option>
}

interface IProps {
  className?: string
  baseClassName?: string
  disabled?: boolean
  value?: string | Option
  placeholder?: string
  options?: Array<Option> | Array<string>
  onFocus?: (boolean) => void
}

interface IState {
  isOpen: boolean
  selected: string | Option
}

const DEFAULT_PLACEHOLDER_STRING = 'Select...'

class Dropdown extends React.Component<IProps, IState> {
  private mounted: boolean

  static defaultProps = {
    baseClassName: 'Dropdown',
    options: []
  }

  constructor(props: IProps) {
    super(props)

    this.state = {
      isOpen: false,
      selected: props.value || {
        label: props.placeholder || DEFAULT_PLACEHOLDER_STRING,
        value: ''
      }
    }

    this.mounted = true
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  handleMouseDown(event) {
    const { isOpen } = this.state
    if (this.props.onFocus && typeof this.props.onFocus === 'function') {
      this.props.onFocus(isOpen)
    }

    if (event.type === 'mousedown' && event.button !== 0) return
    event.stopPropagation()
    event.preventDefault()

    if (!this.props.disabled) {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }
  }

  renderOption(option) {
    const { baseClassName } = this.props
    const { selected } = this.state

    const optionClassName = classNames(`${this.props.baseClassName}-option`, {
      'is-selected': option === selected
    })

    const value = option.value || option.label || option
    const label = option.label || option.value || option

    return (
      <div
        key={value}
        className={optionClassName}
      >
        {label}
      </div>
    )
  }

  buildMenu() {
    const { options, baseClassName } = this.props
    const optionsElements = options.map(option => {
      if (option.type === 'group') {
        const groupTitleClassName = `${baseClassName}-title`
        const groupTitleElement = <div className={groupTitleClassName}>{option.name}</div>
        const subOptionsElements = option.items.map(item => this.renderOption(item))

        return (
          <div key={option.name}>
            {groupTitleElement}
            {subOptionsElements}
          </div>
        )
      } else {
        return this.renderOption(option)
      }
    })

    const noOptionClassName = `${baseClassName}-noresults`
    const noOptionElement = <div className={noOptionClassName}>No options found</div>
    return optionsElements.length ? optionsElements : noOptionElement
  }

  render() {
    const { baseClassName, className, disabled } = this.props
    const { selected, isOpen } = this.state

    const placeHolderValue = typeof selected === 'string'
      ? selected
      : selected.label

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

    return <div className={dropdownRootClassName}>
      <div
        className={dropdownControlClassName}
        onMouseDown={this.handleMouseDown}
        onTouchEnd={this.handleMouseDown}
      >
        <div className={placeHolderClassName}>
          {placeHolderValue}
          <span className={placeHolderArrowClassName} />
        </div>

        {isOpen &&
          <div className={menuClassName}>
            {this.buildMenu()}
          </div>
        }
      </div>
    </div>
  }
}

export default Dropdown
