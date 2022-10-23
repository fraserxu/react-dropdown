import React, { Component, createRef } from 'react'
import classNames from 'classnames'

const DEFAULT_PLACEHOLDER_STRING = 'Select...'

class Dropdown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: this.parseValue(props.value, props.options) || {
        label: typeof props.placeholder === 'undefined' ? DEFAULT_PLACEHOLDER_STRING : props.placeholder,
        value: ''
      },
      showMenu: false,
      isOpen: false,
      isClosing: false
    }
    this.dropdownRef = createRef()
    this.timerRef = createRef()
    this.mounted = true
    this.handleDocumentClick = this.handleDocumentClick.bind(this)
    this.fireChangeEvent = this.fireChangeEvent.bind(this)
  }

  componentDidUpdate (prevProps) {
    if (this.props.value !== prevProps.value) {
      if (this.props.value) {
        let selected = this.parseValue(this.props.value, this.props.options)
        if (selected !== this.state.selected) {
          this.setState({ selected })
        }
      } else {
        this.setState({
          selected: {
            label: typeof this.props.placeholder === 'undefined' ? DEFAULT_PLACEHOLDER_STRING : this.props.placeholder,
            value: ''
          }
        })
      }
    }
  }

  componentDidMount () {
    document.addEventListener('click', this.handleDocumentClick, false)
    document.addEventListener('touchend', this.handleDocumentClick, false)
  }

  componentWillUnmount () {
    this.mounted = false
    document.removeEventListener('click', this.handleDocumentClick, false)
    document.removeEventListener('touchend', this.handleDocumentClick, false)

    clearTimeout(this.timerRef.current)
  }

  open () {
    this.setState({
      showMenu: true,
      isOpen: false,
      isClosing: false
    })

    clearTimeout(this.timerRef.current)

    this.timerRef.current = setTimeout(() => {
      this.setState({
        showMenu: true,
        isOpen: true,
        isClosing: false
      })
    }, 0)
  }

  close () {
    this.setState({
      showMenu: true,
      isOpen: false,
      isClosing: true
    })

    clearTimeout(this.timerRef.current)

    this.timerRef.current = setTimeout(() => {
      this.setState({
        showMenu: false,
        isOpen: false,
        isClosing: false
      })
    }, this.props.closeDelayMS || 0)
  }

  toggle (open) {
    open ? this.open() : this.close()
  }

  handleMouseDown (event) {
    if (this.props.onFocus && typeof this.props.onFocus === 'function') {
      this.props.onFocus(this.state.isOpen)
    }
    if (event.type === 'mousedown' && event.button !== 0) return
    event.stopPropagation()
    event.preventDefault()

    if (!this.props.disabled) {
      this.toggle(!this.state.isOpen)
    }
  }

  parseValue (value, options) {
    let option

    if (typeof value === 'string') {
      for (var i = 0, num = options.length; i < num; i++) {
        if (options[i].type === 'group') {
          const match = options[i].items.filter(item => item.value === value)
          if (match.length) {
            option = match[0]
          }
        } else if (typeof options[i].value !== 'undefined' && options[i].value === value) {
          option = options[i]
        }
      }
    }

    return option || value
  }

  setValue (value, label) {
    let newState = {
      selected: {
        value,
        label}
    }
    this.fireChangeEvent(newState)
    this.setState(newState)
    this.toggle(false)
  }

  fireChangeEvent (newState) {
    if (newState.selected !== this.state.selected && this.props.onChange) {
      this.props.onChange(newState.selected)
    }
  }

  renderOption (option) {
    let value = option.value
    if (typeof value === 'undefined') {
      value = option.label || option
    }
    let label = option.label || option.value || option
    let isSelected = value === this.state.selected.value || value === this.state.selected

    const classes = {
      [`${this.props.baseClassName}-option`]: true,
      [option.className]: !!option.className,
      'is-selected': isSelected
    }

    const optionClass = classNames(classes)

    const dataAttributes = Object.keys(option.data || {}).reduce(
      (acc, dataKey) => ({
        ...acc,
        [`data-${dataKey}`]: option.data[dataKey]
      }),
      {}
    )

    return (
      <div
        key={value}
        className={optionClass}
        onMouseDown={this.setValue.bind(this, value, label)}
        onClick={this.setValue.bind(this, value, label)}
        role='option'
        aria-selected={isSelected ? 'true' : 'false'}
        {...dataAttributes}
      >
        {label}
      </div>
    )
  }

  buildMenu () {
    let { options, baseClassName } = this.props
    let ops = options.map((option) => {
      if (option.type === 'group') {
        let groupTitle = (<div className={`${baseClassName}-title`}>
          {option.name}
        </div>)
        let _options = option.items.map((item) => this.renderOption(item))

        return (
          <div className={`${baseClassName}-group`} key={option.name} role='listbox' tabIndex='-1'>
            {groupTitle}
            {_options}
          </div>
        )
      } else {
        return this.renderOption(option)
      }
    })

    return ops.length ? ops : <div className={`${baseClassName}-noresults`}>
                                No options found
    </div>
  }

  handleDocumentClick (event) {
    if (this.mounted) {
      if (!this.dropdownRef.current.contains(event.target)) {
        if (this.state.isOpen) {
          this.toggle(false)
        }
      }
    }
  }

  isValueSelected () {
    return typeof this.state.selected === 'string' || this.state.selected.value !== ''
  }

  render () {
    const { baseClassName, controlClassName, placeholderClassName, menuClassName, arrowClassName, arrowClosed, arrowOpen, className } = this.props

    const disabledClass = this.props.disabled ? 'Dropdown-disabled' : ''
    const placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label

    const dropdownClass = classNames({
      [`${baseClassName}-root`]: true,
      [className]: !!className,
      'is-open': this.state.isOpen,
      'is-closing': this.state.isClosing
    })
    const controlClass = classNames({
      [`${baseClassName}-control`]: true,
      [controlClassName]: !!controlClassName,
      [disabledClass]: !!disabledClass
    })
    const placeholderClass = classNames({
      [`${baseClassName}-placeholder`]: true,
      [placeholderClassName]: !!placeholderClassName,
      'is-selected': this.isValueSelected()
    })
    const menuClass = classNames({
      [`${baseClassName}-menu`]: true,
      [menuClassName]: !!menuClassName
    })
    const arrowClass = classNames({
      [`${baseClassName}-arrow`]: true,
      [arrowClassName]: !!arrowClassName
    })

    const value = (<div className={placeholderClass}>
      {placeHolderValue}
    </div>)
    const menu = this.state.showMenu ? <div className={menuClass} aria-expanded='true'>
      {this.buildMenu()}
    </div> : null

    return (
      <div ref={this.dropdownRef} className={dropdownClass}>
        <div className={controlClass} onMouseDown={this.handleMouseDown.bind(this)} onTouchEnd={this.handleMouseDown.bind(this)} aria-haspopup='listbox'>
          {value}
          <div className={`${baseClassName}-arrow-wrapper`}>
            {arrowOpen && arrowClosed
              ? this.state.showMenu ? arrowOpen : arrowClosed
              : <span className={arrowClass} />}
          </div>
        </div>
        {menu}
      </div>
    )
  }
}

Dropdown.defaultProps = { baseClassName: 'Dropdown' }
export default Dropdown
