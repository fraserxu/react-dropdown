import React, { Component } from 'react'
import Dropdown from '../index.js'

class ObjectArrayExample extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: { value: 'two', label: 'Two'}
    }
    this._onSelect = this._onSelect.bind(this)
  }

  _onSelect (option) {
    console.log('You selected ', option.label)
    this.setState({selected: option})
  }

  render () {
    const { toggleClassName, togglePlaholderClassName, toggleMenuClassName, toggleOptionsClassName } = this.state

    const options = [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two', className: toggleOptionsClassName && 'my-custom-class' },
      {
       type: 'group', name: 'Prenotazione immediata', items: [
         { value: 'three', label: '11:00', className: toggleOptionsClassName && 'my-custom-class' },
         { value: 'four', label: '15:00' }
       ]
      },
      {
       type: 'group', name: 'Prenotazione su conferma', items: [
         { value: 'five', label: '10:00' },
         { value: 'six', label: '16:00' }
       ]
      }
    ]


    const defaultOption = this.state.selected
    const placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label

    return (
      <section>
        <h4>Object Array Example </h4>
        <div className="buttons">
          <button onClick={() => this.setState({ toggleClassName: !toggleClassName })}>
            Toggle dropdown custom class
          </button>
          <button onClick={() => this.setState({ togglePlaholderClassName: !togglePlaholderClassName })}>
            Toggle placeholder custom class
          </button>
          <button onClick={() => this.setState({ toggleMenuClassName: !toggleMenuClassName })}>
            Toggle menu custom class
          </button>
          <button onClick={() => this.setState({ toggleOptionsClassName: !toggleOptionsClassName })}>
            Toggle options custom class
          </button>
        </div>
        <Dropdown
          options={options}
          onChange={this._onSelect}
          value={defaultOption}
          placeholder="Select an option"
          className={ toggleClassName ? 'my-custom-class' : '' }
          placeholderClassName={ togglePlaholderClassName ? 'my-custom-class' : '' }
          menuClassName={ toggleMenuClassName ? 'my-custom-class' : '' }
        />
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
{ value: 'two', label: 'Two'${toggleOptionsClassName ? ", classNames: ['my-custom-class']" : ""} },
{
 type: 'group', name: 'group1', items: [
   { value: 'three', label: 'Three' },
   { value: 'four', label: 'Four'${toggleOptionsClassName ? ", classNames: ['my-custom-class']" : ""} }
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
