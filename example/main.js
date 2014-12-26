var React = require('react')
var Dropdown = require('../index')

var Pie = React.createClass({
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

    return (
      <div>
        <Dropdown options={options} />
      </div>
    )
  }
})

window['React'] = React

React.render(<Pie />, document.body)