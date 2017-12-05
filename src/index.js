"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames");
const DEFAULT_PLACEHOLDER_STRING = 'Select...';
class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            selected: props.value || {
                label: props.placeholder || DEFAULT_PLACEHOLDER_STRING,
                value: ''
            }
        };
        this.mounted = true;
        this.handleMouseDown = this.handleMouseDown.bind(this);
    }
    handleMouseDown(event) {
        const { isOpen } = this.state;
        if (this.props.onFocus && typeof this.props.onFocus === 'function') {
            this.props.onFocus(isOpen);
        }
        if (event.type === 'mousedown' && event.button !== 0)
            return;
        event.stopPropagation();
        event.preventDefault();
        if (!this.props.disabled) {
            this.setState({
                isOpen: !this.state.isOpen
            });
        }
    }
    renderOption(option) {
        const { baseClassName } = this.props;
        const { selected } = this.state;
        const optionClassName = classNames(`${this.props.baseClassName}-option`, {
            'is-selected': option === selected
        });
        const value = option.value || option.label || option;
        const label = option.label || option.value || option;
        return (React.createElement("div", { key: value, className: optionClassName }, label));
    }
    buildMenu() {
        const { options, baseClassName } = this.props;
        const optionsElements = options.map(option => {
            if (option.type === 'group') {
                const groupTitleClassName = `${baseClassName}-title`;
                const groupTitleElement = React.createElement("div", { className: groupTitleClassName }, option.name);
                const subOptionsElements = option.items.map(item => this.renderOption(item));
                return (React.createElement("div", { key: option.name },
                    groupTitleElement,
                    subOptionsElements));
            }
            else {
                return this.renderOption(option);
            }
        });
        const noOptionClassName = `${baseClassName}-noresults`;
        const noOptionElement = React.createElement("div", { className: noOptionClassName }, "No options found");
        return optionsElements.length ? optionsElements : noOptionElement;
    }
    render() {
        const { baseClassName, className, disabled } = this.props;
        const { selected, isOpen } = this.state;
        const placeHolderValue = typeof selected === 'string'
            ? selected
            : selected.label;
        const disabledClassName = disabled ? 'Dropdown-disabled' : '';
        const dropdownRootClassName = classNames(`${baseClassName}-root`, {
            [className]: !!className,
            'is-open': isOpen
        });
        const dropdownControlClassName = classNames(`${baseClassName}-control`, disabledClassName);
        const placeHolderClassName = `${baseClassName}-placeholder`;
        const placeHolderArrowClassName = `${baseClassName}-arrow`;
        const menuClassName = `${baseClassName}-menu`;
        return React.createElement("div", { className: dropdownRootClassName },
            React.createElement("div", { className: dropdownControlClassName, onMouseDown: this.handleMouseDown, onTouchEnd: this.handleMouseDown },
                React.createElement("div", { className: placeHolderClassName },
                    placeHolderValue,
                    React.createElement("span", { className: placeHolderArrowClassName })),
                isOpen &&
                    React.createElement("div", { className: menuClassName }, this.buildMenu())));
    }
}
Dropdown.defaultProps = {
    baseClassName: 'Dropdown',
    options: []
};
exports.default = Dropdown;
