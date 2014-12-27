react-dropdown
==============

Simple Dropdown component for React, inspired by [react-select](https://github.com/JedWatson/react-select)


### Why

* The default HTML select element is hard to style
* And sometime we also want grouped menus
* if you want more advanced select, check [react-select](https://github.com/JedWatson/react-select)

### Installation

```
$ npm install react-dropdown  --save
```

### Usage

```JavaScript
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

    function onChange(value) {
      console.log('Selected ', value)
    }

    return (
      <div>
        <Dropdown options={options} onChange={onChange}/>
      </div>
    )
  }
})

```

### License

MIT