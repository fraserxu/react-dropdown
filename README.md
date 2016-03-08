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
$ npm install react-dropdown  --save
```

### Changelog

If you want to support React version under v0.13, use react-dropdown@v0.6.1

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
import Dropdown from 'react-dropdown'
const defaultOption = options[0]
<Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
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
