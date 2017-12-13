"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classNames = require("classnames");
var DEFAULT_PLACEHOLDER_STRING = 'Select...';
var Dropdown = (function (_super) {
    __extends(Dropdown, _super);
    function Dropdown(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isOpen: false,
            selected: props.value || {
                label: props.placeholder || DEFAULT_PLACEHOLDER_STRING,
                value: ''
            }
        };
        _this.mounted = true;
        _this.getContainer = _this.getContainer.bind(_this);
        _this.handleMouseDown = _this.handleMouseDown.bind(_this);
        return _this;
    }
    Dropdown.prototype.componentWillReceiveProps = function (newProps) {
        if (newProps.value && newProps.value !== this.state.selected) {
            this.setState({ selected: newProps.value });
        }
        else if (!newProps.value) {
            this.setState({
                selected: {
                    label: newProps.placeholder || DEFAULT_PLACEHOLDER_STRING,
                    value: ''
                }
            });
        }
    };
    Dropdown.prototype.componentDidMount = function () {
        document.addEventListener('click', this.handleDocumentClick.bind(this), false);
        document.addEventListener('touchend', this.handleDocumentClick.bind(this), false);
    };
    Dropdown.prototype.componentWillUnmount = function () {
        this.mounted = false;
        document.removeEventListener('click', this.handleDocumentClick.bind(this), false);
        document.removeEventListener('touchend', this.handleDocumentClick.bind(this), false);
    };
    Dropdown.prototype.getContainer = function (ref) {
        this.container = ref;
    };
    Dropdown.prototype.handleMouseDown = function (event) {
        var isOpen = this.state.isOpen;
        if (this.props.onFocus && typeof this.props.onFocus === 'function') {
            this.props.onFocus(isOpen);
        }
        event.stopPropagation();
        event.preventDefault();
        if (!this.props.disabled) {
            this.setState({
                isOpen: !isOpen
            });
        }
    };
    Dropdown.prototype.setValue = function (value, label) {
        var newState = {
            selected: {
                value: value,
                label: label
            },
            isOpen: false
        };
        this.fireChangeEvent(newState);
        this.setState(newState);
    };
    Dropdown.prototype.fireChangeEvent = function (newState) {
        if (newState.selected !== this.state.selected && this.props.onChange) {
            this.props.onChange(newState.selected);
        }
    };
    Dropdown.prototype.renderOption = function (option) {
        var baseClassName = this.props.baseClassName;
        var selected = this.state.selected;
        var optionClassName = classNames(baseClassName + "-option", {
            'is-selected': option === selected
        });
        var value, label;
        if (typeof option === 'string') {
            value = option;
            label = option;
        }
        else {
            value = option.value || option.label;
            value = option.label || option.value;
        }
        return (React.createElement("div", { key: value, className: optionClassName, onMouseDown: this.setValue.bind(this, value, label), onClick: this.setValue.bind(this, value, label) }, label));
    };
    Dropdown.prototype.buildMenu = function () {
        var _this = this;
        var _a = this.props, options = _a.options, baseClassName = _a.baseClassName;
        var optionsElements = options.map(function (option) {
            if (typeof option === 'object' && option.type === 'group') {
                var groupTitleClassName = baseClassName + "-title";
                var groupClassName = baseClassName + "-group";
                var groupTitleElement = (React.createElement("div", { className: groupTitleClassName }, option.name));
                var subOptionsElements = option.items.map(function (item) {
                    return _this.renderOption(item);
                });
                return (React.createElement("div", { key: option.name, className: groupClassName },
                    groupTitleElement,
                    subOptionsElements));
            }
            else {
                return _this.renderOption(option);
            }
        });
        var noOptionClassName = baseClassName + "-noresults";
        var noOptionElement = (React.createElement("div", { className: noOptionClassName }, "No options found"));
        return optionsElements.length ? optionsElements : noOptionElement;
    };
    Dropdown.prototype.handleDocumentClick = function (event) {
        if (this.mounted) {
            if (!this.container.contains(event.target)) {
                if (this.state.isOpen) {
                    this.setState({
                        isOpen: false
                    });
                }
            }
        }
    };
    Dropdown.prototype.render = function () {
        var _a = this.props, baseClassName = _a.baseClassName, className = _a.className, disabled = _a.disabled;
        var _b = this.state, selected = _b.selected, isOpen = _b.isOpen;
        var placeHolderValue = typeof selected === 'string' ? selected : selected.label;
        var disabledClassName = disabled ? 'Dropdown-disabled' : '';
        var dropdownRootClassName = classNames(baseClassName + "-root", (_c = {},
            _c[className] = !!className,
            _c['is-open'] = isOpen,
            _c));
        var dropdownControlClassName = classNames(baseClassName + "-control", disabledClassName);
        var placeHolderClassName = baseClassName + "-placeholder";
        var placeHolderArrowClassName = baseClassName + "-arrow";
        var menuClassName = baseClassName + "-menu";
        return (React.createElement("div", { className: dropdownRootClassName, ref: this.getContainer },
            React.createElement("div", { className: dropdownControlClassName, onMouseDown: this.handleMouseDown, onTouchEnd: this.handleMouseDown },
                React.createElement("div", { className: placeHolderClassName },
                    placeHolderValue,
                    React.createElement("span", { className: placeHolderArrowClassName }))),
            isOpen && React.createElement("div", { className: menuClassName }, this.buildMenu())));
        var _c;
    };
    Dropdown.defaultProps = {
        baseClassName: 'Dropdown',
        options: []
    };
    return Dropdown;
}(React.Component));
exports.default = Dropdown;
//# sourceMappingURL=index.js.map