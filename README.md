react-dropdown(WIP)
==============

Simple Dropdown component for React


### Why?

Because the default HTML select element is hard to style, and if you want more advanced select, check [react-select](https://github.com/JedWatson/react-select)

And sometime we also want grouped menus, this component could be help.

### Installation

```
$ npm install react-dropdown  --save
```

### Usage

```
var Dropdown = require('react-dropdown ')

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

```

### License

MIT