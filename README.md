react-dropdown
==============

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]

Simple Dropdown component for React, inspired by [react-select](https://github.com/JedWatson/react-select)
Demo is available [here](http://fraserxu.me/react-dropdown/)

### Why

* The default HTML select element is hard to style
* And sometime we also want grouped menus
* if you want more advanced select, check [react-select](https://github.com/JedWatson/react-select)

### Installation

```
// with npm
$ npm install react-dropdown  --save

// with yarn
$ yarn add react-dropdown
```

### Changelog

If you want to support React version under v0.13, use react-dropdown@v0.6.1

### Usage

This is the basic usage of react-dropdown

```Javascript
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const options = [
  'one', 'two', 'three'
];
const defaultOption = options[0];
<Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />;
```

**Options**

Flat Array options

```JavaScript

const options = [
  'one', 'two', 'three'
];
```

Object Array options

```JavaScript

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two', className: 'myOptionClassName' },
  {
   type: 'group', name: 'group1', items: [
     { value: 'three', label: 'Three', className: 'myOptionClassName' },
     { value: 'four', label: 'Four' }
   ]
  },
  {
   type: 'group', name: 'group2', items: [
     { value: 'five', label: 'Five' },
     { value: 'six', label: 'Six' }
   ]
  }
];
```

When using Object options you can add to each option a className string to further customize the dropdown, e.g. adding icons to options

**Search in the options**

You can pass 3 props to the `<Dropdown>` component: 

`searchInputClasName={null}`
`onSearch={(value) => console.debug('value', value)}`
`isSearchEnabled={false}`

While setting the `isSearchEnabled` to `true`, by opening the dropdown, you will be able to pass any filtering function you want. 

Here is a short example: 

```
const [userList, setUserList] = useState([]) //using react hooks for updating the options bassed down to the Dropdown component

function filterUsers(searchString) {
		const users = store.getState().allUsers  // i am storing all the value in a redux state
		const filteredUsers = users.filter((
			user => user.label.toLowerCase().includes(searchString.toLowerCase())))
		setUserList(filteredUsers)
}

```

**Disabling the Dropdown**

Just pass a disabled boolean value to the Dropdown to disable it. This will also give you a `.Dropdown-disabled` class on the element, so you can style it yourself.

```JavaScript
<Dropdown disabled onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />;
```

### Customizing the dropdown

**className**

The `className` prop is passed down to the wrapper `div`, which also has the `Dropdown-root` class.

```JavaScript
<Dropdown className='myClassName' />;
```

**controlClassName**

The `controlClassName` prop is passed down to the control `div`, which also has the `Dropdown-control` class.

```JavaScript
<Dropdown controlClassName='myControlClassName' />;
```

**placeholderClassName**

The `placeholderClassName` prop is passed down to the placeholder `div`, which also has the `Dropdown-placeholder` class.

```JavaScript
<Dropdown placeholderClassName='myPlaceholderClassName' />;
```

**menuClassName**

The `menuClassName` prop is passed down to the menu `div` (the one that opens and closes and holds the options), which also has the `Dropdown-menu` class.

```JavaScript
<Dropdown menuClassName='myMenuClassName' />;
```

**arrowClassName**

The `arrowClassName` prop is passed down to the arrow `span` , which also has the `Dropdown-arrow` class.

```JavaScript
<Dropdown arrowClassName='myArrowClassName' />;
```

**arrowClosed**, **arrowOpen**

The `arrowClosed` & `arrowOpen` props enable passing in custom elements for the open/closed state arrows.

```JavaScript
<Dropdown
  arrowClosed={<span className="arrow-closed" />}
  arrowOpen={<span className="arrow-open" />}
/>;
```

Check more examples in the example folder.

**Run example**

```
$ npm start
```

### License

MIT | Build for [CSViz](https://csviz.org) project @[Wiredcraft](http://wiredcraft.com)

[npm-image]: https://img.shields.io/npm/v/react-dropdown.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-dropdown
[downloads-image]: http://img.shields.io/npm/dm/react-dropdown.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/react-dropdown
