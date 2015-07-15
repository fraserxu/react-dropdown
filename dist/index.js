'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Dropdown = (function (_React$Component) {
  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    _get(Object.getPrototypeOf(Dropdown.prototype), 'constructor', this).call(this, props);
    this.state = {
      selected: props.value || { label: 'Select...', value: '' },
      isOpen: false
    };
    this.mounted = true;
  }

  _inherits(Dropdown, _React$Component);

  _createClass(Dropdown, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.value && newProps.value !== this.state.selected) {
        this.setState({ selected: newProps.value });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('click', this.handleDocumentClick.bind(this), false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mounted = false;
      document.removeEventListener('click', this.handleDocumentClick.bind(this), false);
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(event) {

      if (event.type == 'mousedown' && event.button !== 0) return;
      event.stopPropagation();
      event.preventDefault();

      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }, {
    key: 'setValue',
    value: function setValue(option) {
      var newState = {
        selected: option,
        isOpen: false
      };
      this.fireChangeEvent(newState);
      this.setState(newState);
    }
  }, {
    key: 'fireChangeEvent',
    value: function fireChangeEvent(newState) {
      if (newState.selected !== this.state.selected && this.props.onChange) {
        this.props.onChange(newState.selected);
      }
    }
  }, {
    key: 'renderOption',
    value: function renderOption(option) {
      var optionClass = (0, _classnames2['default'])({
        'Dropdown-option': true,
        'is-selected': option == this.state.selected
      });

      return _react2['default'].createElement(
        'div',
        { key: option.value, className: optionClass, onMouseDown: this.setValue.bind(this, option), onClick: this.setValue.bind(this, option) },
        option.label
      );
    }
  }, {
    key: 'buildMenu',
    value: function buildMenu() {
      var _this = this;

      var ops = this.props.options.map(function (option) {
        if (option.type == 'group') {
          var groupTitle = _react2['default'].createElement(
            'div',
            { className: 'title' },
            option.name
          );
          var _options = option.items.map(function (item) {
            return _this.renderOption(item);
          });

          return _react2['default'].createElement(
            'div',
            { className: 'group', key: option.name },
            groupTitle,
            _options
          );
        } else {
          return _this.renderOption(option);
        }
      });

      return ops.length ? ops : _react2['default'].createElement(
        'div',
        { className: 'Dropdown-noresults' },
        'No opitons found'
      );
    }
  }, {
    key: 'handleDocumentClick',
    value: function handleDocumentClick(event) {
      if (this.mounted) {
        if (!_react2['default'].findDOMNode(this).contains(event.target)) {
          this.setState({ isOpen: false });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var value = _react2['default'].createElement(
        'div',
        { className: 'placeholder' },
        this.state.selected.label
      );
      var menu = this.state.isOpen ? _react2['default'].createElement(
        'div',
        { className: 'Dropdown-menu' },
        this.buildMenu()
      ) : null;

      var dropdownClass = (0, _classnames2['default'])({
        'Dropdown': true,
        'is-open': this.state.isOpen
      });

      return _react2['default'].createElement(
        'div',
        { className: dropdownClass },
        _react2['default'].createElement(
          'div',
          { className: 'Dropdown-control', onMouseDown: this.handleMouseDown.bind(this), onTouchEnd: this.handleMouseDown.bind(this) },
          value,
          _react2['default'].createElement('span', { className: 'Dropdown-arrow' })
        ),
        menu
      );
    }
  }]);

  return Dropdown;
})(_react2['default'].Component);

exports['default'] = Dropdown;
module.exports = exports['default'];

