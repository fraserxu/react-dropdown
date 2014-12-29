'use strict'

var React = require('react/addons')
var cx = React.addons.classSet

var Dropdown = React.createClass({

  displayName: 'Dropdown',

  getInitialState: function() {
    return {
      selected: { label: 'Select...', value: '' },
      isOpen: false
    }
  },

  componentWillReceiveProps: function(newProps) {
    if (newProps.value && newProps.value !== this.state.selected) {
      this.setState({selected: newProps.value})
    }
  },

  handleMouseDown: function(event) {

    if (event.type == 'mousedown' && event.button !== 0) return
    event.stopPropagation()
    event.preventDefault()

    this.setState({
      isOpen: !this.state.isOpen
    })
  },

  setValue: function(option) {
    var newState = {
      selected: option,
      isOpen: false
    }
    this.fireChangeEvent(newState)
    this.setState(newState)
  },

  fireChangeEvent: function(newState) {
    if (newState.selected !== this.state.selected &&this.props.onChange) {
      this.props.onChange(newState.selected);
    }
  },

  renderOption: function (option) {
    var optionClass = cx({
      'Dropdown-option': true,
      'is-selected': option == this.state.selected
    })

    return <div key={option.value} className={optionClass} onMouseDown={this.setValue.bind(this, option)} onClick={this.setValue.bind(this, option)}>{option.label}</div>
  },

  buildMenu: function() {
    var ops = this.props.options.map(function(option) {

      if (option.type == 'group') {
        var groupTitle = (<div className='title'>{option.name}</div>)
        var _options = option.items.map(function(item) {
          return this.renderOption(item)
        }.bind(this))
        return (
          <div className='group' key={option.name}>
            {groupTitle}
            {_options}
          </div>
        )
      } else {
        return this.renderOption(option)
      }

    }.bind(this))

    return ops.length ? ops : <div className='Dropdown-noresults'>No opitons found</div>
  },

  render: function() {
    var value = ''

    value = (<div className='placeholder'>{this.state.selected.label}</div>)
    var menu = this.state.isOpen ? <div className='Dropdown-menu'>{this.buildMenu()}</div> : null

    var dropdownClass = cx({
      'Dropdown': true,
      'is-open': this.state.isOpen
    })

    return (
      <div className={dropdownClass}>
        <div className='Dropdown-control' onMouseDown={this.handleMouseDown} onTouchEnd={this.handleMouseDown}>
          {value}
          <span className='Dropdown-arrow' />
        </div>
        {menu}
      </div>
    )
  }

})

module.exports = Dropdown