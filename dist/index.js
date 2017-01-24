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
    _this.dropdownButton = null;
    _this.dropdownMenu = null;
    _this.mounted = true;
    _this.handleDocumentClick = _this.handleDocumentClick.bind(_this);
    _this.handleKeyPressEvent = _this.handleKeyPressEvent.bind(_this);
    return _this;
  }

  _createClass(Dropdown, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.value && newProps.value !== this.state.selected) {
        this.setState({ selected: newProps.value });
      } else if (!newProps.value && newProps.placeholder) {
        this.setState({ selected: { label: newProps.placeholder, value: '' } });
      } else if (!newProps.value) {
        this.setState({ selected: { label: DEFAULT_PLACEHOLDER_STRING, value: '' } });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('click', this.handleDocumentClick, false);
      document.addEventListener('touchend', this.handleDocumentClick, false);
      document.addEventListener('keydown', this.handleKeyPressEvent, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mounted = false;
      document.removeEventListener('click', this.handleDocumentClick, false);
      document.removeEventListener('touchend', this.handleDocumentClick, false);
      document.removeEventListener('keydown', this.handleKeyPressEvent, false);
    }
  }, {
    key: 'handleDocumentClick',
    value: function handleDocumentClick(event) {
      if (this.mounted) {
        if (!_reactDom2.default.findDOMNode(this).contains(event.target)) {
          this.setState({ isOpen: false });
        }
      }
    }
  }, {
    key: 'handleKeyPressEvent',
    value: function handleKeyPressEvent(e) {
      if (e.keyCode === 27) {
        this.setState({ isOpen: false });
      }
    }
  }, {
    key: 'fireChangeEvent',
    value: function fireChangeEvent(newState) {
      if (newState.selected !== this.state.selected && this.props.onChange) {
        this.props.onChange(newState.selected);
      }
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(event) {

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
    key: 'handleDropdownFocus',
    value: function handleDropdownFocus() {
      this.setState({ isOpen: true });
    }
  }, {
    key: 'handleDropdownBlur',
    value: function handleDropdownBlur(e) {
      var stayOpen = false;
      if (e.relatedTarget === this.dropdownButton) {
        stayOpen = true;
      } else if (this.dropdownMenu) {
        var options = this.dropdownMenu.getElementsByClassName(this.props.baseClassName + '-option');
        for (var i = 0; i < options.length; i++) {
          if (e.relatedTarget === options[i]) {
            stayOpen = true;
          }
        }
      }
      this.setState({ isOpen: stayOpen });
    }
  }, {
    key: 'handleDropdownKeyDown',
    value: function handleDropdownKeyDown(e) {
      if (e.keyCode == 40) {
        e.preventDefault();
        var options = this.dropdownMenu.getElementsByClassName(this.props.baseClassName + '-option');
        options.length && options[0].focus();
      }
    }
  }, {
    key: 'handleOptionKeyDown',
    value: function handleOptionKeyDown(e, value, label) {
      if (e.keyCode == 32 || e.keyCode == 13) {
        e.preventDefault();
        this.setValue(value, label);
      } else if (e.keyCode == 38 || e.keyCode == 40) {
        e.preventDefault();
        var options = this.dropdownMenu.getElementsByClassName(this.props.baseClassName + '-option');
        for (var i = 0; i < options.length; i++) {
          if (options[i] === e.target) {
            e.keyCode == 38 && i > 0 && options[i - 1].focus();
            e.keyCode == 40 && i < options.length - 1 && options[i + 1].focus();
          }
        }
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
      this.dropdownButton.focus();
      this.setState(newState);
    }
  }, {
    key: 'renderOption',
    value: function renderOption(option) {
      var _classNames,
          _this2 = this;

      var optionClass = (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, this.props.baseClassName + '-option', true), _defineProperty(_classNames, 'is-selected', option === this.state.selected), _classNames));

      var value = option.value || option.label || option;
      var label = option.label || option.value || option;

      return _react2.default.createElement(
        'div',
        {
          role: 'menuitem',
          tabIndex: this.props.tabIndex || '0',
          key: value,
          className: optionClass,
          onMouseDown: function onMouseDown() {
            return _this2.setValue(value, label);
          },
          onClick: function onClick() {
            return _this2.setValue(value, label);
          },
          onKeyDown: function onKeyDown(e) {
            return _this2.handleOptionKeyDown(e, value, label);
          },
          onBlur: function onBlur(e) {
            return _this2.handleDropdownBlur(e);
          }
        },
        label
      );
    }
  }, {
    key: 'buildMenu',
    value: function buildMenu() {
      var _this3 = this;

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
            return _this3.renderOption(item);
          });

          return _react2.default.createElement(
            'div',
            { className: baseClassName + '-group', key: option.name },
            groupTitle,
            _options
          );
        } else {
          return _this3.renderOption(option);
        }
      });

      return ops.length ? ops : _react2.default.createElement(
        'div',
        { className: baseClassName + '-noresults' },
        'No options found'
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this,
          _classNames2;

      var baseClassName = this.props.baseClassName;

      var disabledClass = this.props.disabled ? 'Dropdown-disabled' : '';
      var placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label;
      var value = _react2.default.createElement(
        'div',
        { className: baseClassName + '-placeholder' },
        placeHolderValue
      );
      var menu = this.state.isOpen ? _react2.default.createElement(
        'div',
        {
          ref: function ref(el) {
            _this4.dropdownMenu = el;
          },
          className: baseClassName + '-menu'
        },
        this.buildMenu()
      ) : null;

      var dropdownClass = (0, _classnames2.default)((_classNames2 = {}, _defineProperty(_classNames2, baseClassName + '-root', true), _defineProperty(_classNames2, 'is-open', this.state.isOpen), _classNames2));

      return _react2.default.createElement(
        'div',
        { className: dropdownClass },
        _react2.default.createElement(
          'div',
          {
            tabIndex: this.props.tabIndex || '0',
            role: 'menu',
            ref: function ref(el) {
              _this4.dropdownButton = el;
            },
            onFocus: function onFocus() {
              return _this4.handleDropdownFocus();
            },
            onBlur: function onBlur(e) {
              return _this4.handleDropdownBlur(e);
            },
            className: baseClassName + '-control ' + disabledClass,
            onMouseDown: function onMouseDown(e) {
              return _this4.handleMouseDown(e);
            },
            onTouchEnd: function onTouchEnd(e) {
              return _this4.handleMouseDown(e);
            },
            onKeyDown: function onKeyDown(e) {
              return _this4.handleDropdownKeyDown(e);
            }
          },
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
