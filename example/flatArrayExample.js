import React, { Component } from 'react'
import Dropdown from '../index.js'

const options = [
  { id: 1, value: 'lorem', label: 'Lorem' },
  { id: 2, value: 'ipsum', label: 'Ipsum' }
]

class FlatArrayExample extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: '',
      breadcrumb: {
        value: '',
        id: null
      }
    }
    this._onSelect = this._onSelect.bind(this)
    this._onSearch = this._onSearch.bind(this)
    this._returnBreadcrumbs = this._returnBreadcrumbs.bind(this)
  }

  _onSelect (option) {
    console.log('You selected ', option.label)
    this.setState({selected: option})
  }

  _onSearch (value) {
    console.log('search:  ', value)
  }

  _returnBreadcrumbs(value) {
    const breadcrumbs = [
      { id: 1, value: 'lorem' },
      { id: 2, value: 'demo' },
      { id: 3, value: 'ipsum' },
    ]

    const found = breadcrumbs.find(e => (
      e.id ===  value.id
    ));

    this.setState({
      breadcrumb: {
        id: found.id,
        value: found.value
      }
    }, () => {
      console.debug('found', found)
    })
  }

  _clearBreadCrumb() {
    this.setState({
      breadcrumb: {
        id: -1,
        value: ''
      }
    }, () => {
      console.debug('stateLeave', this.state.breadcrumb)
    })
  }

  render () {
    const defaultOption = this.state.selected
    const placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label

    return (
      <section>
        <h3>Flat Array Example – zilahir</h3>
        <Dropdown
          onMouseLeave={() => this._clearBreadCrumb()}
          onMouseEnter={(value) => this._returnBreadcrumbs(value)}
          onSearch={this._onSearch}
          isSearchEnabled={false}
          options={options}
          onChange={this._onSelect}
          value={defaultOption}
          placeholder="Select an option"
          isHidden={false}
        />
        <div className='result'>
          You selected
          <strong> {placeHolderValue} </strong>
        </div>

        <section>
          <h4>Options: </h4>
          <div className='code'>
            <pre>
              {`
const options = [
  'one', 'two', 'three'
]
              `}
            </pre>
          </div>
        </section>
      </section>
    )
  }
}

export default FlatArrayExample
