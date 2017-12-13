import React from 'react'
import Head from 'next/head'

import Dropdown from '../dist'

const options = ['one', 'two', 'three']

class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: options[0]
    }
    this.onSelect = this.onSelect.bind(this)
  }

  onSelect(option) {
    this.setState({
      selected: option
    })
  }

  render() {
    const { selected } = this.state
    return (
      <div>
        <Head>
          <title>React Dropdown</title>
          <link rel="stylesheet" href="/static/style.css" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Dropdown
          options={options}
          onChange={this.onSelect}
          value={selected}
          placeholder="Select an option"
        />
      </div>
    )
  }
}

export default Example
