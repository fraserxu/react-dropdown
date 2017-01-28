react-accessible-dropdown
==============

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]

This is an extension of [react-dropdown](https://github.com/fraserxu/react-dropdown) and should be a drop-in replacement for it.

### Changes
* Added keyboard controls
* An additional prop called `tabIndex`, which sets the tabIndex of the dropdown menu. Defaults to 0.

### Important Notes
* I needed this immediately so thats why I am publishing this as a separate package as opposed to submitting a pull request to the original repo.
* Feel free to submit bug reports and pull requests, but don't be offended if I don't get right on it because I am a full time student and work full time :)

### Installation

```
$ npm install react-accessible-dropdown  --save
```

### Usage

Flat Array options

```JavaScript

const options = [
  'one', 'two', 'three'
]
```

Object Array options

```JavaScript

const options = [
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
```

Monut

```JavaScript
import Dropdown from 'react-dropdown';
const defaultOption = options[0];
<Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
```

Disabling the Dropdown:

Just pass a disabled boolean value to the Dropdown to disable it. This will also give you a `.Dropdown-disabled` class on the element, so you can style it yourself.

```JavaScript
<Dropdown disabled onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
```

Check more examples in the example folder.

**Run example**

```
$ npm start
```

### License

MIT

[npm-image]: https://img.shields.io/npm/v/react-dropdown.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-accessible-dropdown
[downloads-image]: http://img.shields.io/npm/dm/react-accessible-dropdown.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/react-accessible-dropdown
