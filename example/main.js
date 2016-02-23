import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dropdown from '../index.js';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selected: { value: 'two', label: 'Two'}
    }
  }

  _onSelect(option) {
    console.log('You selected ', option.label)
    this.setState({selected: option})
  }

  render() {

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

    let defaultOption = this.state.selected

    return (
      <div>
        <header>
          <h2><a href='https://github.com/fraserxu/react-dropdown'>react-dropdown</a></h2>
        </header>
        <section className='description'>
          <p>
            Simple Dropdown component for React, inspired by <a href='https://github.com/JedWatson/react-select'>react-select</a>
          </p>
          <div className='code'>
            <pre>
              { "$ npm install react-dropdown --save" }
            </pre>
          </div>
        </section>
        <section>
          <h3>Usage: </h3>
        </section>
        <Dropdown options={options} onChange={this._onSelect.bind(this)} value={defaultOption} placeholder="Select an option" />
        <div className='result'>
          You selected
          <strong> {this.state.selected ?
            this.state.selected.label
            : ''
          }</strong>
        </div>
        <section>
          <h3>Code: </h3>
        </section>
        <div className='code'>
          <pre>
            <code>
              {
                `
'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Dropdown from '../';

class App extends Component {

  constructor() {
    this.state = {
      selected: { value: 'two', label: 'Two'}
    }
  }

  _onSelect(option) {
    console.log('You selected ', option.label)
    this.setState({selected: option})
  }

  render() {

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

    let defaultOption = this.state.selected

    return (
      <Dropdown options={options} onChange={this._onSelect.bind(this)} value={defaultOption} />
    )
  }

}
React.render(<App />, document.querySelector('#app'))
                `
              }
            </code>
          </pre>
        </div>
        <section>
          <h3>License: </h3>
        </section>
        <footer>
          <p>MIT | Build for <a href='https://csviz.org'>CSViz</a> project @<a href='http://wiredcraft.com'>Wiredcraft</a></p>
        </footer>
      </div>

    )
  }

}

ReactDOM.render(<App />, document.querySelector('#app'))
