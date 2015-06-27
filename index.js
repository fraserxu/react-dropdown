'use strict';

import React from 'react';
import classNames from 'classnames';

class Dropdown extends React.Component {

  displayName: 'Dropdown'

  constructor(props) {
    super(props);
    this.state = {
      selected: props.value || { label: 'Select...', value: '' },
      isOpen: false
    }
    this.mounted = true;
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value && newProps.value !== this.state.selected) {
      this.setState({selected: newProps.value});
    }
  }

  componentDidMount() {
    document.addEventListener("click", this.handleDocumentClick.bind(this), false);
  }

  componentWillUnmount() {
    this.mounted = false;
    document.removeEventListener("click", this.handleDocumentClick.bind(this), false);
  }

  handleMouseDown(event) {

    if (event.type == 'mousedown' && event.button !== 0) return;
    event.stopPropagation();
    event.preventDefault();

    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  setValue(option) {
    let newState = {
      selected: option,
      isOpen: false
    }
    this.fireChangeEvent(newState);
    this.setState(newState);
  }

  fireChangeEvent(newState) {
    if (newState.selected !== this.state.selected && this.props.onChange) {
      this.props.onChange(newState.selected);
    }
  }

  renderOption (option) {
    let optionClass = classNames({
      'Dropdown-option': true,
      'is-selected': option == this.state.selected
    });

    return <div key={option.value} className={optionClass} onMouseDown={this.setValue.bind(this, option)} onClick={this.setValue.bind(this, option)}>{option.label}</div>
  }

  buildMenu() {
    let ops = this.props.options.map((option) => {
      if (option.type == 'group') {
        let groupTitle = (<div className='title'>{option.name}</div>);
        let _options = option.items.map((item) => this.renderOption(item));

        return (
          <div className='group' key={option.name}>
            {groupTitle}
            {_options}
          </div>
        );
      } else {
        return this.renderOption(option);
      }
    })

    return ops.length ? ops : <div className='Dropdown-noresults'>No opitons found</div>;
  }

  handleDocumentClick(event) {
    if(this.mounted) {
      if (!React.findDOMNode(this).contains(event.target)) {
        this.setState({isOpen:false});
      }
    }
  }

  render() {
    let value = (<div className='placeholder'>{this.state.selected.label}</div>);
    let menu = this.state.isOpen ? <div className='Dropdown-menu'>{this.buildMenu()}</div> : null;

    let dropdownClass = classNames({
      'Dropdown': true,
      'is-open': this.state.isOpen
    });

    return (
      <div className={dropdownClass}>
        <div className='Dropdown-control' onMouseDown={this.handleMouseDown.bind(this)} onTouchEnd={this.handleMouseDown.bind(this)}>
          {value}
          <span className='Dropdown-arrow' />
        </div>
        {menu}
      </div>
    );
  }

}

export default Dropdown;
