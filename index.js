'use strict'

var React = require('react/addons')
var cx = React.addons.classSet

var Dropdown = React.createClass({

  displayName: 'Dropdown',

  propTypes: {
  },

  getInitialState: function() {
    return {
      selected: {
        label: 'Select...',
        value: ''
      },
      options: this.props.options,
      isOpen: false
    }
  },

  componentWillMount: function() {
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
    this.setState({
      selected: option,
      isOpen: false
    })
  },

  renderOption: function (option) {
    var optionClass = cx({
      'Dropdown-option': true,
      'is-selected': false
    })

    return <div key={option.value} className={optionClass} onMouseDown={this.setValue.bind(this, option)} onClick={this.setValue.bind(this, option)}>{option.label}</div>
  },

  buildMenu: function() {
    var ops = this.state.options.map(function(option) {

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

    var arrowStyle = {
      borderColor: '#999 transparent transparent',
      borderStyle: 'solid',
      borderWidth: '5px 5px 0',
      content: ' ',
      display: 'block',
      height: 0,
      marginTop: '-ceil(2.5)',
      position: 'absolute',
      right: '10px',
      top: '14px',
      width: 0
    }

    if(this.state.isOpen) {
      arrowStyle.borderColor = 'transparent transparent #999'
      arrowStyle.borderWidth = '0 5px 5px'
    }

    var dropdownClass = cx({
      'Dropdown': true,
      'is-open': this.state.isOpen
    })

    return (
      <div className={dropdownClass}>
        <div className='Dropdown-control' onMouseDown={this.handleMouseDown} onTouchEnd={this.handleMouseDown}>
          {value}
          <span style={arrowStyle} className='Dropdown-arrow' />
        </div>
        {menu}
      </div>
    )
  }

})

module.exports = Dropdown