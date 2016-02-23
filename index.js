'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

class Dropdown extends React.Component {

  displayName: 'Dropdown'

  constructor(props) {
    super(props);
    this.state = {
      selected: props.value || { label: props.placeholder || 'Select...', value: '' },
      isOpen: false
    }
    this.mounted = true;
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value && newProps.value !== this.state.selected) {
      this.setState({selected: newProps.value});
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick, false);
  }

  componentWillUnmount() {
    this.mounted = false;
    document.removeEventListener('click', this.handleDocumentClick, false);
  }

  handleMouseDown(event) {

    if (event.type == 'mousedown' && event.button !== 0) return;
    event.stopPropagation();
    event.preventDefault();

    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  setValue(value, label) {
    let newState = {
      selected: {
        value,
        label
      },
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

    let value = option.value || option.label || option;
    let label = option.label || option.value || option;

    return <div key={value} className={optionClass} onMouseDown={this.setValue.bind(this, value, label)} onClick={this.setValue.bind(this, value, label)}>{label}</div>
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

    return ops.length ? ops : <div className='Dropdown-noresults'>No options found</div>;
  }

  handleDocumentClick(event) {
    if(this.mounted) {
      if (!ReactDOM.findDOMNode(this).contains(event.target)) {
        this.setState({isOpen:false});
      }
    }
  }

  render() {
    const { controlClassName, menuClassName } = this.props;
    let value = (<div className='placeholder'>{this.state.selected.label}</div>);
    let menu = this.state.isOpen ? <div className={menuClassName}>{this.buildMenu()}</div> : null;

    let dropdownClass = classNames({
      'Dropdown': true,
      'is-open': this.state.isOpen
    });

    return (
      <div className={dropdownClass}>
        <div className={controlClassName} onMouseDown={this.handleMouseDown.bind(this)} onTouchEnd={this.handleMouseDown.bind(this)}>
          {value}
          <span className='Dropdown-arrow' />
        </div>
        {menu}
      </div>
    );
  }

}
Dropdown.defaultProps = { controlClassName: 'Dropdown-control', menuClassName: 'Dropdown-menu'};
export default Dropdown;
