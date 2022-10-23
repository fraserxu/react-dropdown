import React, { Component } from 'react'
import Dropdown from '../index.js'

const options = [
  'one', 'two', 'three'
]

class OpenCloseAnimationExample extends Component {
  render () {
    return (
      <section className="open-close-animation-example">
        <h3>Open/Close Animation Example</h3>
        <Dropdown
          options={options}
          placeholder="Select an option"
          closeDelayMS={500}
        />

        <section>
          <h4>Usage: </h4>
          <div className='code'>
            <pre>
              {`
<Dropdown
  options={options}
  placeholder="Select an option"
  closeDelayMS={500}
/>
              `}
            </pre>
          </div>
        </section>
      </section>
    )
  }
}

export default OpenCloseAnimationExample
