import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

const DEFAULT_PLACEHOLDER_STRING = 'Select...'

class Dropdown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: props.value || {
        label: props.placeholder || DEFAULT_PLACEHOLDER_STRING,
        value: ''
      },
      isOpen: false
    }
    this.mounted = true
    this.handleDocumentClick = this.handleDocumentClick.bind(this)
    this.fireChangeEvent = this.fireChangeEvent.bind(this)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.value && newProps.value !== this.state.selected) {
      this.setState({selected: newProps.value})
    } else if (!newProps.value && newProps.placeholder) {
      this.setState({selected: { label: newProps.placeholder, value: '' }})
    } else {
      this.setState({selected: { label: DEFAULT_PLACEHOLDER_STRING, value: '' }})
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
    if (event.type === 'mousedown' && event.button !== 0) return
    event.stopPropagation()
    event.preventDefault()

    if (!this.props.disabled) {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }
  }

  setValue (value, label) {
    let newState = {
      selected: {
        value,
        label
      },
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

  renderOption (option) {
    const { customStylingClassNames } = this.props
    const { optionClass, selectedOptionClass } = customStylingClassNames
    let optionClassName
    if(optionClass) {
      optionClassName = classNames({
        [optionClass]: true,
        [selectedOptionClass]: option === this.state.selected
      })
    } else {
      optionClassName = classNames({
        [`${this.props.baseClassName}-option`]: true,
        'is-selected': option === this.state.selected
      })
    }

    let value = option.value || option.label || option
    let label = option.label || option.value || option

    return (
      <div
        key={value}
        className={optionClassName}
        onMouseDown={this.setValue.bind(this, value, label)}
        onClick={this.setValue.bind(this, value, label)}>
        {label}
      </div>
    )
  }

  buildMenu () {
    let { options, baseClassName, customStylingClassNames } = this.props
    const { groupClass, groupTitleClass, noResultsClass } = customStylingClassNames
    let ops = options.map((option) => {
      if (option.type === 'group') {
        let groupTitle = (<div className={groupTitleClass || `${baseClassName}-title`}>{option.name}</div>)
        let _options = option.items.map((item) => this.renderOption(item))

        return (
          <div className={groupClass || `${baseClassName}-group`} key={option.name}>
            {groupTitle}
            {_options}
          </div>
        )
      } else {
        return this.renderOption(option)
      }
    })

    return ops.length ? ops : <div className={noResultsClass || `${baseClassName}-noresults`}>No options found</div>
  }

  handleDocumentClick (event) {
    if (this.mounted) {
      if (!ReactDOM.findDOMNode(this).contains(event.target)) {
        this.setState({ isOpen: false })
      }
    }
  }

  render () {
    const { baseClassName, customStylingClassNames } = this.props
    const { disabledClass, rootClass, isOpenClass, placeholderClass, menuClass, controlClass, arrowClass } = customStylingClassNames
    const disabledClassName = this.props.disabled ? disabledClass || 'Dropdown-disabled' : ''
    const controlClassName = controlClass || `${baseClassName}-control`
    const placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label
    let value = (<div className={placeholderClass || `${baseClassName}-placeholder`}>{placeHolderValue}</div>)
    let menu = this.state.isOpen ? <div className={menuClass || `${baseClassName}-menu`}>{this.buildMenu()}</div> : null

    let dropdownClass
    if(rootClass) {
      dropdownClass = classNames({
        [rootClass]: true,
        [isOpenClass]: this.state.isOpen
      })
    } else {
      dropdownClass = classNames({
        [`${baseClassName}-root`]: true,
        'is-open': this.state.isOpen
      })
    }

    return (
      <div className={dropdownClass}>
        <div className={`${controlClassName} ${disabledClassName}`} onMouseDown={this.handleMouseDown.bind(this)} onTouchEnd={this.handleMouseDown.bind(this)}>
          {value}
          <span className={arrowClass || `${baseClassName}-arrow`} />
        </div>
        {menu}
      </div>
    )
  }

}

Dropdown.defaultProps = {
  baseClassName: 'Dropdown',
  customStylingClassNames: {
    rootClass: '',
    disabledClass: '',
    controlClass: '',
    isOpenClass: '',
    optionClass: '',
    selectedOptionClass: '',
    menuClass: '',
    placeholderClass: '',
    groupTitleClass: '',
    groupClass: '',
    noResultsClass: '',
    arrowClass: ''
  }
}
export default Dropdown
