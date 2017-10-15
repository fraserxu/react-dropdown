'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_PLACEHOLDER_STRING = 'Select...';

var Dropdown = function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

    _this.state = {
      selected: props.value || {
        label: props.placeholder || DEFAULT_PLACEHOLDER_STRING,
        value: ''
      },
      isOpen: false
    };
    _this.mounted = true;
    _this.handleDocumentClick = _this.handleDocumentClick.bind(_this);
    _this.fireChangeEvent = _this.fireChangeEvent.bind(_this);
    return _this;
  }

  _createClass(Dropdown, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.value && newProps.value !== this.state.selected) {
        this.setState({ selected: newProps.value });
      } else if (!newProps.value) {
        this.setState({ selected: {
            label: newProps.placeholder || DEFAULT_PLACEHOLDER_STRING,
            value: ''
          } });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('click', this.handleDocumentClick, false);
      document.addEventListener('touchend', this.handleDocumentClick, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mounted = false;
      document.removeEventListener('click', this.handleDocumentClick, false);
      document.removeEventListener('touchend', this.handleDocumentClick, false);
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(event) {
      if (this.props.onFocus && typeof this.props.onFocus === 'function') {
        this.props.onFocus(this.state.isOpen);
      }
      if (event.type === 'mousedown' && event.button !== 0) return;
      event.stopPropagation();
      event.preventDefault();

      if (!this.props.disabled) {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
    }
  }, {
    key: 'setValue',
    value: function setValue(value, label) {
      var newState = {
        selected: {
          value: value,
          label: label
        },
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
      var _classNames;

      var optionClass = (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, this.props.baseClassName + '-option', true), _defineProperty(_classNames, 'is-selected', option === this.state.selected), _classNames));

      var value = option.value || option.label || option;
      var label = option.label || option.value || option;

      return _react2.default.createElement(
        'div',
        {
          key: value,
          className: optionClass,
          onMouseDown: this.setValue.bind(this, value, label),
          onClick: this.setValue.bind(this, value, label) },
        label
      );
    }
  }, {
    key: 'buildMenu',
    value: function buildMenu() {
      var _this2 = this;

      var _props = this.props,
          options = _props.options,
          baseClassName = _props.baseClassName;

      var ops = options.map(function (option) {
        if (option.type === 'group') {
          var groupTitle = _react2.default.createElement(
            'div',
            { className: baseClassName + '-title' },
            option.name
          );
          var _options = option.items.map(function (item) {
            return _this2.renderOption(item);
          });

          return _react2.default.createElement(
            'div',
            { className: baseClassName + '-group', key: option.name },
            groupTitle,
            _options
          );
        } else {
          return _this2.renderOption(option);
        }
      });

      return ops.length ? ops : _react2.default.createElement(
        'div',
        { className: baseClassName + '-noresults' },
        'No options found'
      );
    }
  }, {
    key: 'handleDocumentClick',
    value: function handleDocumentClick(event) {
      if (this.mounted) {
        if (!_reactDom2.default.findDOMNode(this).contains(event.target)) {
          if (this.state.isOpen) {
            this.setState({ isOpen: false });
          }
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames2;

      var _props2 = this.props,
          baseClassName = _props2.baseClassName,
          className = _props2.className;


      var disabledClass = this.props.disabled ? 'Dropdown-disabled' : '';
      var placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label;
      var value = _react2.default.createElement(
        'div',
        { className: baseClassName + '-placeholder' },
        placeHolderValue
      );
      var menu = this.state.isOpen ? _react2.default.createElement(
        'div',
        { className: baseClassName + '-menu' },
        this.buildMenu()
      ) : null;

      var dropdownClass = (0, _classnames2.default)((_classNames2 = {}, _defineProperty(_classNames2, className, true), _defineProperty(_classNames2, baseClassName + '-root', true), _defineProperty(_classNames2, 'is-open', this.state.isOpen), _classNames2));

      return _react2.default.createElement(
        'div',
        { className: dropdownClass },
        _react2.default.createElement(
          'div',
          { className: baseClassName + '-control ' + disabledClass, onMouseDown: this.handleMouseDown.bind(this), onTouchEnd: this.handleMouseDown.bind(this) },
          value,
          _react2.default.createElement('span', { className: baseClassName + '-arrow' })
        ),
        menu
      );
    }
  }]);

  return Dropdown;
}(_react.Component);

Dropdown.defaultProps = { baseClassName: 'Dropdown' };
exports.default = Dropdown;
