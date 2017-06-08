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
    } else if (!newProps.value) {
      this.setState({selected: {
        label: newProps.placeholder || DEFAULT_PLACEHOLDER_STRING,
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
    this.props.onFocus(this.state.isOpen)
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
    if (this.props.disabled) {
      return
    }

    let newState = {
      selected: {
        value,
        label
      },
      isOpen: this.props.keepOpen
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
    const isSelected = option.value === this.state.selected.value && this.props.keepOpen
    let optionClass = classNames({
      [`${this.props.baseClassName}-option`]: true,
      'is-selected': isSelected
    })

    let value = option.value || option.label || option
    let label = option.label || option.value || option
    const Icon = this.props.icon;
    return (
      <div
        key={value}
        className={optionClass}
        onClick={this.setValue.bind(this, value, label)}>
        {
          isSelected && <span><Icon /></span>
        }
        {
          !isSelected && <span>{label}</span>
        }
      </div>
    )
  }

  buildMenu () {
    let { options, baseClassName } = this.props
    let ops = options.map((option) => {
      if (option.type === 'group') {
        let groupTitle = (<div className={`${baseClassName}-title`}>{option.name}</div>)
        let _options = option.items.map((item) => this.renderOption(item))

        return (
          <div className={`${baseClassName}-group`} key={option.name}>
            {groupTitle}
            {_options}
          </div>
        )
      } else {
        return this.renderOption(option)
      }
    })

    return ops.length ? ops : <div className={`${baseClassName}-noresults`}>No options found</div>
  }

  handleDocumentClick (event) {
    if (this.mounted) {
      if (!ReactDOM.findDOMNode(this).contains(event.target)) {
        this.setState({ isOpen: false })
      }
    }
  }

  render () {
    const { baseClassName } = this.props
    const disabledClass = this.props.disabled ? 'Dropdown-disabled' : ''
    const placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label
    let value = (<div className={`${baseClassName}-placeholder`}>{placeHolderValue}</div>)
    let menu = this.state.isOpen || this.props.keepOpen ? <div className={`${baseClassName}-menu`}>{this.buildMenu()}</div> : null

    let dropdownClass = classNames({
      [`${baseClassName}-root`]: true,
      'is-open': this.state.isOpen || this.props.keepOpen,
      [disabledClass]: true
    })

    return (
      <div className={dropdownClass}>
        <div className={`${baseClassName}-control ${disabledClass}`} onMouseDown={this.handleMouseDown.bind(this)} onTouchEnd={this.handleMouseDown.bind(this)}>
          {value}
          <span className={`${baseClassName}-arrow`} />
        </div>
        {menu}
      </div>
    )
  }

}

Dropdown.defaultProps = { baseClassName: 'Dropdown' }
export default Dropdown
