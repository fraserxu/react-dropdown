import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import FlatArrayExample from './flatArrayExample'
import ObjectArrayExample from './objectArrayExample'

class App extends Component {
  render () {
    return (
      <div>
        <header>
          <h2><a href='https://github.com/fraserxu/react-dropdown'>React Dropdown</a></h2>
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
          <h3>Examples: </h3>
          <h4>Usage: </h4>
          <div className='code'>
            <pre>
              {`
<Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
              `}
            </pre>
          </div>
        </section>

        <FlatArrayExample />
        <ObjectArrayExample />

        <section>
          <h3>License: </h3>
        </section>
        <footer>
          <p>MIT</p>
        </footer>
      </div>

    )
  }

}

ReactDOM.render(<App />, document.querySelector('#app'))
