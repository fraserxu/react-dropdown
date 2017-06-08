import React, { Component } from 'react'
import Dropdown from '../index.js'

class ObjectArrayExample extends Component {
  constructor (props) {
    super(props)
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
    this.state = {
      options,
      selected: options[1]
    }
    this._onSelect = this._onSelect.bind(this)
  }

  _onSelect (option) {
    console.log('You selected ', option)
    this.setState({selected: option})
  }

  render () {
    const defaultOption = this.state.selected
    const placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label

    return (
      <section>
        <h4>Object Array Example </h4>
        <Dropdown options={this.state.options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
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
              `}
            </pre>
          </div>
        </section>
      </section>
    )
  }
}

export default ObjectArrayExample
