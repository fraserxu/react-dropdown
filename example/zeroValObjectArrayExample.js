import React, { Component } from 'react'
import Dropdown from '../index.js'

class ZeroValObjectArrayExample extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: { value: 0, label: 'Zero'}
    }
    this._onSelect = this._onSelect.bind(this)
  }

  _onSelect (option) {
    console.log(`You selected ${option.label}, with value ${option.value}`)
    this.setState({selected: option})
  }

  render () {
    const options = [
      { value: 0, label: 'Zero' },
      { value: 1, label: 'One' }
    ]

    const defaultOption = this.state.selected
    const placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label

    return (
      <section>
        <h4>Zero-Value Object Array Example </h4>
        <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
        <div className='result'>
          You selected
          <strong> {placeHolderValue} </strong>
        </div>
        <section>
          <h3>Options: </h3>
          <div className='code'>
            <pre>
              {`
const options = [
{ value: 0, label: 'Zero' },
{ value: 1, label: 'One' }
]
              `}
            </pre>
          </div>
        </section>
      </section>
    )
  }
}

export default ZeroValObjectArrayExample
