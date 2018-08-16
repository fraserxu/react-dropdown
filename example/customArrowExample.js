import React, { Component } from 'react'
import Dropdown from '../index.js'

const options = [
  'one', 'two', 'three'
]

const arrowClosed = (
  <span className="arrow-closed" />
)
const arrowOpen = (
  <span className="arrow-open" />
)

class CustomArrowExample extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: ''
    }
  }

  render () {
    const defaultOption = this.state.selected

    return (
      <section>
        <h3>Custom Arrow Example</h3>
        <Dropdown
          arrowClosed={arrowClosed}
          arrowOpen={arrowOpen}
          options={options}
          value={defaultOption}
          placeholder="Select an option"
        />

        <section>
          <h4>Usage: </h4>
          <div className='code'>
            <pre>
              {`
const arrowClosed = (
  <span className="arrow-closed" />
)
const arrowOpen = (
  <span className="arrow-open" />
)

<Dropdown
  arrowClosed={arrowClosed}
  arrowOpen={arrowOpen}
  options={options}
  value={defaultOption}
  placeholder="Select an option"
/>
              `}
            </pre>
          </div>
        </section>
      </section>
    )
  }
}

export default CustomArrowExample
