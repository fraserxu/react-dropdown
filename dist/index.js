'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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
		_this.labelId = props.labelId;
		_this.rootId = props.rootId;
		_this.isRequired = props.isRequired;
		_this.forwardRef = props.forwardRef;
		_this.mounted = true;
		_this.handleDocumentClick = _this.handleDocumentClick.bind(_this);
		_this.fireChangeEvent = _this.fireChangeEvent.bind(_this);
		return _this;
	}

	_createClass(Dropdown, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			document.addEventListener('click', this.handleDocumentClick, true);
			document.addEventListener('touchend', this.handleDocumentClick, true);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(newProps) {
			if (newProps.value) {
				var selected = this.parseValue(newProps.value, newProps.options);
				if (selected !== this.state.selected) {
					this.setState({ selected: selected });
				}
			} else {
				this.setState({
					selected: {
						label: typeof newProps.placeholder === 'undefined' ? DEFAULT_PLACEHOLDER_STRING : newProps.placeholder,
						value: ''
					}
				});
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.mounted = false;
			document.removeEventListener('click', this.handleDocumentClick, true);
			document.removeEventListener('touchend', this.handleDocumentClick, true);
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
		key: 'handleMouseDown',
		value: function handleMouseDown(event) {
			var anyOpenDropdowns = this.forwardRef.current.parentElement.getElementsByClassName('Dropdown-root is-open').length > 0;

			if (this.props.onFocus && typeof this.props.onFocus === 'function') {
				this.props.onFocus(this.state.isOpen);
			}
			if (anyOpenDropdowns || event.type === 'mousedown' && event.button !== 0) return;
			event.stopPropagation();
			event.preventDefault();

			if (!this.props.disabled) {
				this.setState({
					isOpen: !this.state.isOpen
				});
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
				}
				return _this2.renderOption(option);
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
			var isTarget = this.forwardRef.current.contains(event.target);

			if (isTarget || this.state.isOpen) {
				event.stopPropagation();
			}

			if (this.mounted && !isTarget && this.state.isOpen && (!this.isRequired || this.props.value !== undefined)) {
				this.setState({ isOpen: false });
			}
		}
	}, {
		key: 'isValueSelected',
		value: function isValueSelected() {
			return typeof this.state.selected === 'string' || this.state.selected.value !== '';
		}
	}, {
		key: 'renderOption',
		value: function renderOption(option) {
			var _classes,
			    _this3 = this;

			var value = option.value;
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
					key: value,
					className: optionClass,
					onMouseDown: function onMouseDown() {
						return _this3.setValue(value, label);
					},
					onClick: function onClick() {
						return _this3.setValue(value, label);
					},
					role: 'option',
					'aria-selected': isSelected
				},
				label
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var _classNames,
			    _classNames2,
			    _classNames3,
			    _classNames4,
			    _classNames5,
			    _this4 = this;

			var _props2 = this.props,
			    baseClassName = _props2.baseClassName,
			    controlClassName = _props2.controlClassName,
			    placeholderClassName = _props2.placeholderClassName,
			    menuClassName = _props2.menuClassName,
			    arrowClassName = _props2.arrowClassName,
			    arrowClosed = _props2.arrowClosed,
			    arrowOpen = _props2.arrowOpen,
			    className = _props2.className;


			var disabledClass = this.props.disabled ? 'Dropdown-disabled' : '';
			var placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label;

			var dropdownClass = (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, baseClassName + '-root', true), _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, 'is-open', this.state.isOpen), _classNames));
			var controlClass = (0, _classnames2.default)((_classNames2 = {}, _defineProperty(_classNames2, baseClassName + '-control', true), _defineProperty(_classNames2, controlClassName, !!controlClassName), _defineProperty(_classNames2, disabledClass, !!disabledClass), _classNames2));
			var placeholderClass = (0, _classnames2.default)((_classNames3 = {}, _defineProperty(_classNames3, baseClassName + '-placeholder', true), _defineProperty(_classNames3, placeholderClassName, !!placeholderClassName), _defineProperty(_classNames3, 'is-selected', this.isValueSelected()), _classNames3));
			var menuClass = (0, _classnames2.default)((_classNames4 = {}, _defineProperty(_classNames4, baseClassName + '-menu', true), _defineProperty(_classNames4, menuClassName, !!menuClassName), _classNames4));
			var arrowClass = (0, _classnames2.default)((_classNames5 = {}, _defineProperty(_classNames5, baseClassName + '-arrow', true), _defineProperty(_classNames5, arrowClassName, !!arrowClassName), _classNames5));

			var valueOpts = {
				className: placeholderClass,
				role: 'button',
				'aria-haspopup': 'listbox'
			};
			if (this.rootId) {
				valueOpts.id = this.rootId;

				if (this.labelId) {
					valueOpts['aria-labelledby'] = this.labelId + ' ' + this.rootId;
				}
			}
			var value = _react2.default.createElement(
				'div',
				valueOpts,
				placeHolderValue
			);

			var menuOpts = {
				className: menuClass,
				role: 'listbox',
				'aria-expanded': 'true',
				tabIndex: '-1'
			};
			if (this.labelId) {
				menuOpts['aria-labelledby'] = this.labelId;
			}
			var menu = this.state.isOpen ? _react2.default.createElement(
				'div',
				menuOpts,
				this.buildMenu()
			) : null;

			var arrowState = void 0;
			if (arrowOpen && arrowClosed) {
				arrowState = this.state.isOpen ? arrowOpen : arrowClosed;
			} else {
				arrowState = _react2.default.createElement('span', { className: arrowClass });
			}

			return _react2.default.createElement(
				'div',
				{ className: dropdownClass },
				_react2.default.createElement(
					'div',
					{
						className: controlClass,
						onMouseDown: function onMouseDown(event) {
							return _this4.handleMouseDown(event);
						},
						onTouchEnd: function onTouchEnd(event) {
							return _this4.handleMouseDown(event);
						}
					},
					value,
					_react2.default.createElement(
						'div',
						{ className: baseClassName + '-arrow-wrapper' },
						arrowState
					)
				),
				menu
			);
		}
	}]);

	return Dropdown;
}(_react.Component);

Dropdown.defaultProps = { baseClassName: 'Dropdown' };

Dropdown.propTypes = {
	value: _propTypes2.default.string,
	options: _propTypes2.default.array,
	placeholder: _propTypes2.default.string,
	labelId: _propTypes2.default.string,
	rootId: _propTypes2.default.string,
	isRequired: _propTypes2.default.bool,
	disabled: _propTypes2.default.bool,
	forwardRef: _propTypes2.default.any,
	onFocus: _propTypes2.default.func,
	onChange: _propTypes2.default.func,
	baseClassName: _propTypes2.default.string,
	controlClassName: _propTypes2.default.string,
	placeholderClassName: _propTypes2.default.string,
	menuClassName: _propTypes2.default.string,
	arrowClassName: _propTypes2.default.string,
	className: _propTypes2.default.string,
	arrowOpen: _propTypes2.default.any,
	arrowClosed: _propTypes2.default.any
};

exports.default = Dropdown;
