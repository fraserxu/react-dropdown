import React, { Component } from 'react'
import ReactDOM from 'react-dom'
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
      isOpen: false
    }
    this.mounted = true
    this.handleDocumentClick = this.handleDocumentClick.bind(this)
    this.fireChangeEvent = this.fireChangeEvent.bind(this)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.value) {
      var selected = this.parseValue(newProps.value, newProps.options)
      if (selected !== this.state.selected) {
        this.setState({selected: selected})
      }
    } else {
      this.setState({selected: {
        label: typeof newProps.placeholder === 'undefined' ? DEFAULT_PLACEHOLDER_STRING : newProps.placeholder,
        value: ''
      }})
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
  }

  handleMouseDown (event) {
    if (this.props.onFocus && typeof this.props.onFocus === 'function') {
      this.props.onFocus(this.state.isOpen)
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
        label},
      isOpen: false
    }
    this.fireChangeEvent(newState)
    this.setState(newState)
  }

  fireChangeEvent (newState) {
    if (newState.selected !== this.state.selected && this.props.onChange) {
      this.props.onChange(newState.selected)
    }
  }

  handleSearch (searchString) {
    console.debug('searchString', searchString)
    if (this.props.onSearch) {
      this.props.onSearch(searchString)
    }
  }

  renderOption (option, onMouseEnter, breadcrumbs) {
    let value = option.value
    let key = option.key
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
    return (
      <div
        key={key}
        className={optionClass}
        onMouseDown={this.setValue.bind(this, value, label)}
        onMouseEnter={() => this.props.onMouseEnter(option)}
        onMouseLeave={() => this.props.onMouseLeave()}
        onClick={this.setValue.bind(this, value, label)}
        role='option'
        aria-selected={isSelected ? 'true' : 'false'}>
        <p>
          {
            breadcrumbs ?
              (
                <small className={`${breadcrumbs && breadcrumbs.id === option.id ? '' : 'hidden'}`}>
                  {breadcrumbs.value || ''}
                </small>
              )
            : null
          }
          {label}
        </p>
      </div>
    )
  }

  buildMenu (isSearchEnabled, onMouseEnter, breadcrumbs) {
    setTimeout(() => {
      if (isSearchEnabled) {
        this.searchInput.focus()
      }
    }, 100)
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
        return this.renderOption(option, onMouseEnter, breadcrumbs)
      }
    })

    return ops.length ? ops : <div className={`${baseClassName}-noresults`}>
                                No options found
    </div>
  }

  handleDocumentClick (event) {
    if (this.mounted) {
      if (!ReactDOM.findDOMNode(this).contains(event.target)) {
        if (this.state.isOpen) {
          this.setState({ isOpen: false })
        }
      }
    }
  }

  isValueSelected () {
    return typeof this.state.selected === 'string' || this.state.selected.value !== ''
  }

  render () {
    const { baseClassName, controlClassName, placeholderClassName, menuClassName, arrowClassName, arrowClosed, arrowOpen, className, searchInputClasName, isSearchEnabled, onMouseEnter, breadcrumbs } = this.props
    const disabledClass = this.props.disabled ? 'Dropdown-disabled' : ''
    const placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label

    const dropdownClass = classNames({
      [`${baseClassName}-root`]: true,
      [className]: !!className,
      'is-open': this.state.isOpen
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
    const menu = this.state.isOpen ? <div className={menuClass} aria-expanded='true'>
      {this.buildMenu(isSearchEnabled, onMouseEnter, breadcrumbs)}
    </div> : null

    return (
      <div className={dropdownClass}>
        <div className={controlClass} onMouseDown={this.handleMouseDown.bind(this)} onTouchEnd={this.handleMouseDown.bind(this)} aria-haspopup='listbox'>
          <div>
            {
              !this.state.isOpen
                ? {...value}
                : this.state.isOpen && isSearchEnabled
                  ? <input className={searchInputClasName} ref={(input) => { this.searchInput = input }} type='text' onChange={(e) => this.handleSearch(e.target.value)} />
                  : {...value}
            }
          </div>
          <div className={`${baseClassName}-arrow-wrapper`}>
            {arrowOpen && arrowClosed
              ? this.state.isOpen ? arrowOpen : arrowClosed
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
