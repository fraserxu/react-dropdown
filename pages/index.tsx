import * as React from 'react'
import Dropdown from '../src'

const options = [
  'one', 'two', 'three'
]

export default () =>
  <div>
    <h1>React Dropdown Demo</h1>
    <Dropdown options={options} />
  </div>
