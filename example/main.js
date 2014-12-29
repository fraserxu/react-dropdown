var React = require('react')
var Dropdown = require('../index')

var App = React.createClass({

  getInitialState: function() {
    return {
      selected: { value: 'two', label: 'Two'}
    }
  },

  _onSelect: function(option) {
    console.log('You selected ', option.label)
    this.setState({selected: option})
  },

  render: function() {

    var options = [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
      {
        type: 'group', name: 'group1', items: [
          { value: 'three', label: 'Three' },
          { value: 'four', label: 'Four' }
        ]
      },
      {
        type: 'group', name: 'group2', items: [
          { value: 'five', label: 'Five' },
          { value: 'six', label: 'Six' }
        ]
      }
    ]

    var defaultOption = this.state.selected

    return (
      <div>
        <Dropdown options={options} onChange={this._onSelect} value={defaultOption} />
        <div className='result'>
          You selected
          <strong> {this.state.selected ?
            this.state.selected.label
            : ''
          }</strong>
        </div>
      </div>
    )
  }
})

window['React'] = React

React.render(<App />, document.body)