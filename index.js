import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

class Dropdown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: props.value || {
        label: props.placeholder || 'Select...',
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

    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  setValue (option) {
    const newState = {
      selected: option,
      isOpen: false
    }
    this.fireChangeEvent(option)
    this.setState(newState)
  }

  fireChangeEvent (option) {
    if (option !== this.state.selected && this.props.onChange) {
      this.props.onChange(option)
    }
  }

  renderOption (option) {
    let optionClass = classNames({
      [`${this.props.baseClassName}-option`]: true,
      'is-selected': option === this.state.selected
    })

    const value = typeof option.value === 'undefined' ? option : option.value;
    const label = typeof option.label === 'undefined' ? option : option.label;

    return (
      <div
        key={value}
        className={optionClass}
        onMouseDown={this.setValue.bind(this, option)}
        onClick={this.setValue.bind(this, option)}>
        {label}
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
    const placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label
    let value = (<div className={`${baseClassName}-placeholder`}>{placeHolderValue}</div>)
    let menu = this.state.isOpen ? <div className={`${baseClassName}-menu`}>{this.buildMenu()}</div> : null

    let dropdownClass = classNames({
      [`${baseClassName}-root`]: true,
      'is-open': this.state.isOpen
    })

    return (
      <div className={dropdownClass}>
        <div className={`${baseClassName}-control`} onMouseDown={this.handleMouseDown.bind(this)} onTouchEnd={this.handleMouseDown.bind(this)}>
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
