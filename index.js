'use strict'

var React = require('react/addons')
var cx = React.addons.classSet

var Dropdown = React.createClass({

  displayName: 'Dropdown',

  getInitialState: function() {
    return {
      selected: undefined,
      isOpen: false
    }
  },

  componentWillMount: function() {
    this.setState({
      selected: this.props.value || { label: 'Select...', value: '' }
    })
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

    return React.createElement("div", {key: option.value, className: optionClass, onMouseDown: this.setValue.bind(this, option), onClick: this.setValue.bind(this, option)}, option.label)
  },

  buildMenu: function() {
    var ops = this.props.options.map(function(option) {

      if (option.type == 'group') {
        var groupTitle = (React.createElement("div", {className: "title"}, option.name))
        var _options = option.items.map(function(item) {
          return this.renderOption(item)
        }.bind(this))
        return (
          React.createElement("div", {className: "group", key: option.name}, 
            groupTitle, 
            _options
          )
        )
      } else {
        return this.renderOption(option)
      }

    }.bind(this))

    return ops.length ? ops : React.createElement("div", {className: "Dropdown-noresults"}, "No opitons found")
  },

  render: function() {
    var value = ''

    value = (React.createElement("div", {className: "placeholder"}, this.state.selected.label))
    var menu = this.state.isOpen ? React.createElement("div", {className: "Dropdown-menu"}, this.buildMenu()) : null

    var dropdownClass = cx({
      'Dropdown': true,
      'is-open': this.state.isOpen
    })

    return (
      React.createElement("div", {className: dropdownClass}, 
        React.createElement("div", {className: "Dropdown-control", onMouseDown: this.handleMouseDown, onTouchEnd: this.handleMouseDown}, 
          value, 
          React.createElement("span", {className: "Dropdown-arrow"})
        ), 
        menu
      )
    )
  }

})

module.exports = Dropdown