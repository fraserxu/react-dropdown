'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
      selected: _this.parseValue(props.value, props.options) || {
        label: typeof props.placeholder === 'undefined' ? DEFAULT_PLACEHOLDER_STRING : props.placeholder,
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
      if (newProps.value) {
        var selected = this.parseValue(newProps.value, newProps.options);
        if (selected !== this.state.selected) {
          this.setState({ selected: selected });
        }
      } else {
        this.setState({ selected: {
            label: typeof newProps.placeholder === 'undefined' ? DEFAULT_PLACEHOLDER_STRING : newProps.placeholder,
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
    key: 'parseValue',
    value: function parseValue(value, options) {
      var option = void 0;

      if (typeof value === 'string') {
        for (var i = 0, num = options.length; i < num; i++) {
          if (options[i].type === 'group') {
            var match = options[i].items.filter(function (item) {
              return item.value === value;
            });
            if (match.length) {
              option = match[0];
            }
          } else if (typeof options[i].value !== 'undefined' && options[i].value === value) {
            option = options[i];
          }
        }
      }

      return option || value;
    }
  }, {
    key: 'setValue',
    value: function setValue(value, label) {
      var newState = {
        selected: {
          value: value,
          label: label },
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
    key: 'handleSearch',
    value: function handleSearch(searchString) {
      console.debug('searchString', searchString);
      if (this.props.onSearch) {
        this.props.onSearch(searchString);
      }
    }
  }, {
    key: 'renderOption',
    value: function renderOption(option) {
      var _classes;

      var value = option.value;
      var key = option.key;
      if (typeof value === 'undefined') {
        value = option.label || option;
      }
      var label = option.label || option.value || option;
      var isSelected = value === this.state.selected.value || value === this.state.selected;

      var classes = (_classes = {}, _defineProperty(_classes, this.props.baseClassName + '-option', true), _defineProperty(_classes, option.className, !!option.className), _defineProperty(_classes, 'is-selected', isSelected), _classes);

      var optionClass = (0, _classnames2.default)(classes);

      return _react2.default.createElement(
        'div',
        {
          key: key,
          className: optionClass,
          onMouseDown: this.setValue.bind(this, value, label),
          onClick: this.setValue.bind(this, value, label),
          role: 'option',
          'aria-selected': isSelected ? 'true' : 'false' },
        label
      );
    }
  }, {
    key: 'buildMenu',
    value: function buildMenu(isSearchEnabled) {
      var _this2 = this;

      setTimeout(function () {
        if (isSearchEnabled) {
          _this2.searchInput.focus();
        }
      }, 100);
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
            { className: baseClassName + '-group', key: option.name, role: 'listbox', tabIndex: '-1' },
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
    key: 'isValueSelected',
    value: function isValueSelected() {
      return typeof this.state.selected === 'string' || this.state.selected.value !== '';
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames,
          _classNames2,
          _classNames3,
          _classNames4,
          _classNames5,
          _this3 = this;

      var _props2 = this.props,
          baseClassName = _props2.baseClassName,
          controlClassName = _props2.controlClassName,
          placeholderClassName = _props2.placeholderClassName,
          menuClassName = _props2.menuClassName,
          arrowClassName = _props2.arrowClassName,
          arrowClosed = _props2.arrowClosed,
          arrowOpen = _props2.arrowOpen,
          className = _props2.className,
          searchInputClasName = _props2.searchInputClasName,
          isSearchEnabled = _props2.isSearchEnabled;

      var disabledClass = this.props.disabled ? 'Dropdown-disabled' : '';
      var placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label;

      var dropdownClass = (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, baseClassName + '-root', true), _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, 'is-open', this.state.isOpen), _classNames));
      var controlClass = (0, _classnames2.default)((_classNames2 = {}, _defineProperty(_classNames2, baseClassName + '-control', true), _defineProperty(_classNames2, controlClassName, !!controlClassName), _defineProperty(_classNames2, disabledClass, !!disabledClass), _classNames2));
      var placeholderClass = (0, _classnames2.default)((_classNames3 = {}, _defineProperty(_classNames3, baseClassName + '-placeholder', true), _defineProperty(_classNames3, placeholderClassName, !!placeholderClassName), _defineProperty(_classNames3, 'is-selected', this.isValueSelected()), _classNames3));
      var menuClass = (0, _classnames2.default)((_classNames4 = {}, _defineProperty(_classNames4, baseClassName + '-menu', true), _defineProperty(_classNames4, menuClassName, !!menuClassName), _classNames4));
      var arrowClass = (0, _classnames2.default)((_classNames5 = {}, _defineProperty(_classNames5, baseClassName + '-arrow', true), _defineProperty(_classNames5, arrowClassName, !!arrowClassName), _classNames5));

      var value = _react2.default.createElement(
        'div',
        { className: placeholderClass },
        placeHolderValue
      );
      var menu = this.state.isOpen ? _react2.default.createElement(
        'div',
        { className: menuClass, 'aria-expanded': 'true' },
        this.buildMenu(isSearchEnabled)
      ) : null;

      return _react2.default.createElement(
        'div',
        { className: dropdownClass },
        _react2.default.createElement(
          'div',
          { className: controlClass, onMouseDown: this.handleMouseDown.bind(this), onTouchEnd: this.handleMouseDown.bind(this), 'aria-haspopup': 'listbox' },
          _react2.default.createElement(
            'div',
            null,
            !this.state.isOpen ? _extends({}, value) : this.state.isOpen && isSearchEnabled ? _react2.default.createElement('input', { className: searchInputClasName, ref: function ref(input) {
                _this3.searchInput = input;
              }, type: 'text', onChange: function onChange(e) {
                return _this3.handleSearch(e.target.value);
              } }) : _extends({}, value)
          ),
          _react2.default.createElement(
            'div',
            { className: baseClassName + '-arrow-wrapper' },
            arrowOpen && arrowClosed ? this.state.isOpen ? arrowOpen : arrowClosed : _react2.default.createElement('span', { className: arrowClass })
          )
        ),
        menu
      );
    }
  }]);

  return Dropdown;
}(_react.Component);

Dropdown.defaultProps = { baseClassName: 'Dropdown' };
exports.default = Dropdown;
