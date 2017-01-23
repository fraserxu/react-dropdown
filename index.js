import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

const DEFAULT_PLACEHOLDER_STRING = 'Select...';

class Dropdown extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selected: props.value || {
        label: props.placeholder || DEFAULT_PLACEHOLDER_STRING,
        value: ''
      },
      isOpen: false
    };
    this.dropdownButton = null;
    this.dropdownMenu = null;
    this.mounted = true;
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleKeyPressEvent = this.handleKeyPressEvent.bind(this);
  }

  componentWillReceiveProps (newProps) {
    if (newProps.value && newProps.value !== this.state.selected) {
      this.setState({selected: newProps.value});
    } else if (!newProps.value && newProps.placeholder) {
      this.setState({selected: { label: newProps.placeholder, value: '' }});
    } else {
      this.setState({selected: { label: DEFAULT_PLACEHOLDER_STRING, value: '' }});
    }
  }

  componentDidMount () {
    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, false);
    document.addEventListener('keydown', this.handleKeyPressEvent, false);
  }

  componentWillUnmount () {
    this.mounted = false;
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, false);
    document.removeEventListener('keydown', this.handleKeyPressEvent, false);
  }

  handleDocumentClick (event) {
    if (this.mounted) {
      if (!ReactDOM.findDOMNode(this).contains(event.target)) {
        this.setState({ isOpen: false });
      }
    }
  }

  handleKeyPressEvent(e){
    if(e.keyCode === 27){
      this.setState({ isOpen: false });
    }
  }

  fireChangeEvent (newState) {
    if (newState.selected !== this.state.selected && this.props.onChange) {
      this.props.onChange(newState.selected);
    }
  }

  handleMouseDown (event) {

    if (event.type === 'mousedown' && event.button !== 0) return;
    event.stopPropagation();
    event.preventDefault();

    if (!this.props.disabled) {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }

  handleDropdownFocus(){
    this.setState({ isOpen: true });
  }

  handleDropdownBlur(e){
    let stayOpen = false;
    if(e.relatedTarget === this.dropdownButton){
      stayOpen = true;
    } else if(this.dropdownMenu){
      const options = this.dropdownMenu.getElementsByClassName(`${this.props.baseClassName}-option`);
      for(var i=0; i<options.length; i++){
        if(e.relatedTarget === options[i]){
          stayOpen = true;
        }
      }
    }
    this.setState({ isOpen: stayOpen });
  }

  handleDropdownKeyDown(e){
    if(e.keyCode == 40){
      e.preventDefault();
      const options = this.dropdownMenu.getElementsByClassName(`${this.props.baseClassName}-option`);
      options.length && options[0].focus();
    }
  }

  handleOptionKeyDown(e, value, label){
    if(e.keyCode == 32 || e.keyCode == 13){
      e.preventDefault();
      this.setValue(value, label);
    } else if(e.keyCode == 38 || e.keyCode == 40){
      e.preventDefault();
      const options = this.dropdownMenu.getElementsByClassName(`${this.props.baseClassName}-option`);
      for(var i=0; i<options.length; i++){
        if(options[i] === e.target){
          e.keyCode == 38 && i > 0 && options[i-1].focus();
          e.keyCode == 40 && i < options.length - 1 && options[i+1].focus();
        }
      }
    }
  }

  setValue (value, label) {
    let newState = {
      selected: {
        value,
        label
      },
      isOpen: false
    };
    this.fireChangeEvent(newState);
    this.dropdownButton.focus();
    this.setState(newState);
  }

  renderOption (option) {
    let optionClass = classNames({
      [`${this.props.baseClassName}-option`]: true,
      'is-selected': option === this.state.selected,
    });

    let value = option.value || option.label || option;
    let label = option.label || option.value || option;

    return (
      <div
        role="menuitem"
        tabIndex={this.props.tabIndex || '0'}
        key={value}
        className={optionClass}
        onMouseDown={() => this.setValue(value, label)}
        onClick={() => this.setValue(value, label)}
        onKeyDown={e => this.handleOptionKeyDown(e, value, label)}
        onBlur={e => this.handleDropdownBlur(e)}
      >
        {label}
      </div>
    );
  }

  buildMenu () {
    let { options, baseClassName } = this.props;
    let ops = options.map((option) => {
      if (option.type === 'group') {
        let groupTitle = (<div className={`${baseClassName}-title`}>{option.name}</div>);
        let _options = option.items.map((item) => this.renderOption(item));

        return (
          <div className={`${baseClassName}-group`} key={option.name}>
            {groupTitle}
            {_options}
          </div>
        );
      } else {
        return this.renderOption(option);
      }
    });

    return ops.length ? ops : <div className={`${baseClassName}-noresults`}>No options found</div>;
  }

  render () {
    const { baseClassName } = this.props;
    const disabledClass = this.props.disabled ? 'Dropdown-disabled' : '';
    const placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label;
    let value = (<div className={`${baseClassName}-placeholder`}>{placeHolderValue}</div>);
    let menu = this.state.isOpen ? (
        <div
          ref={(el) => { this.dropdownMenu = el; }}
          className={`${baseClassName}-menu`}
        >
          {this.buildMenu()}
        </div>
      ) : null;

    let dropdownClass = classNames({
      [`${baseClassName}-root`]: true,
      'is-open': this.state.isOpen
    });

    return (
      <div className={dropdownClass}>
        <div
          tabIndex={this.props.tabIndex || '0'}
          role="menu"
          ref={(el) => { this.dropdownButton = el; }}
          onFocus={() => this.handleDropdownFocus()}
          onBlur={e => this.handleDropdownBlur(e)}
          className={`${baseClassName}-control ${disabledClass}`}
          onMouseDown={e => this.handleMouseDown(e)}
          onTouchEnd={e => this.handleMouseDown(e)}
          onKeyDown={e => this.handleDropdownKeyDown(e)}
        >
          {value}
          <span className={`${baseClassName}-arrow`} />
        </div>
        {menu}
      </div>
    );
  }

}

Dropdown.defaultProps = { baseClassName: 'Dropdown' };
export default Dropdown;
