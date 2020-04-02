import React, { Component } from 'react'
import Dropdown from '../index.js'

class OnOpenOnCloseExample extends Component {
  constructor (props) {
    super(props)

    this.handler = this.handler.bind(this)
    this.state = { events: [] }
  }

  handler (type) {
    const str = `Dropdown is now ${type}`
    const events = this.state.events.slice()
    
    console.log(str)
    events.push(str)
    this.setState({ events })
  }

  render () {
    const options = ['option1', 'option2']

    return (
      <section>
        <h4>onOpen and onClose Example </h4>
        <Dropdown
          options={options}
          onOpen={() => { this.handler('open') }}
          onClose={() => { this.handler('closed') }}
        />
        <section>
          <h3>Usage: </h3>
          <div className='code'>
            <pre>
              {`
<Dropdown
  options={options}
  onOpen={() => { this.handler('open') }}
  onClose={() => { this.handler('closed') }}
/>
              `}
            </pre>
          </div>
          <h3>Events: </h3>
          <div className='code'>
            <pre>
              {`
${this.state.events.join('\n')}
              `}
            </pre>
          </div>
        </section>
      </section>
    )
  }
}

export default OnOpenOnCloseExample
