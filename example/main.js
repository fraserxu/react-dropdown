var React = require('react')
var Dropdown = require('../index')

var App = React.createClass({

  getInitialState: function() {
    return {
      selected: { value: 'two', label: 'Two'}
    }
  },

  _onSelect: function(option) {
    console.log('You selected ', option.label)
    this.setState({selected: option})
  },

  render: function() {

    var options = [
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

    var defaultOption = this.state.selected

    return (
      <div>
        <header>
          <h2>react-dropdown</h2>
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
          <h3>Usage: </h3>
        </section>
        <Dropdown options={options} onChange={this._onSelect} value={defaultOption} />
        <div className='result'>
          You selected
          <strong> {this.state.selected ?
            this.state.selected.label
            : ''
          }</strong>
        </div>
        <section>
          <h3>Code: </h3>
        </section>
        <div className='code'>
          <pre>
            <code>
              {
                "var Dropdown = require('react-dropdown')\n" +
                "var React = require('react')\n" +
                "\n" +
                "var App = React.createClass({\n" +
                "  _onSelect: function(option) {\n" +
                "    console.log('You selected ', option.label)\n" +
                "  },\n" +
                "  render: function() {\n" +
                "    var options = [\n" +
                "      { value: 'one', label: 'One' },\n" +
                "      { value: 'two', label: 'Two' },\n" +
                "      {\n" +
                "        type: 'group', name: 'group1', items: [\n" +
                "          { value: 'three', label: 'Three' },\n" +
                "          { value: 'four', label: 'Four' }\n" +
                "        ]\n" +
                "      },\n" +
                "      {\n" +
                "        type: 'group', name: 'group2', items: [\n" +
                "          { value: 'five', label: 'Five' },\n" +
                "          { value: 'six', label: 'Six' }\n" +
                "        ]\n" +
                "      }\n" +
                "    ]\n" +
                "\n" +
                "    var defaultOption = { value: 'two', label: 'Two' }\n" +
                "\n" +
                "    <Dropdown options={options} onChange={this._onSelect} value={defaultOption} />\n" +
                "  }\n" +
                "})\n"
              }
            </code>
          </pre>
        </div>
        <section>
          <h3>License: </h3>
        </section>
        <footer>
          <p>MIT | Build for <a href='https://csviz.org'>CSViz</a> project @<a href='http://wiredcraft.com'>Wiredcraft</a></p>
        </footer>
      </div>

    )
  }
})

window['React'] = React

React.render(<App />, document.body)