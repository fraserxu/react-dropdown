"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = _interopRequire(require("react"));

var ReactDOM = _interopRequire(require("react-dom"));

var classNames = _interopRequire(require("classnames"));

var Dropdown = (function (_React$Component) {
  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    _get(Object.getPrototypeOf(Dropdown.prototype), "constructor", this).call(this, props);
    this.state = {
      selected: props.value || { label: props.placeholder || "Select...", value: "" },
      isOpen: false
    };
    this.mounted = true;
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  _inherits(Dropdown, _React$Component);

  _createClass(Dropdown, {
    componentWillReceiveProps: {
      value: function componentWillReceiveProps(newProps) {
        if (newProps.value && newProps.value !== this.state.selected) {
          this.setState({ selected: newProps.value });
        }
      }
    },
    componentDidMount: {
      value: function componentDidMount() {
        document.addEventListener("click", this.handleDocumentClick, false);
      }
    },
    componentWillUnmount: {
      value: function componentWillUnmount() {
        this.mounted = false;
        document.removeEventListener("click", this.handleDocumentClick, false);
      }
    },
    handleMouseDown: {
      value: function handleMouseDown(event) {

        if (event.type == "mousedown" && event.button !== 0) {
          return;
        }event.stopPropagation();
        event.preventDefault();

        this.setState({
          isOpen: !this.state.isOpen
        });
      }
    },
    setValue: {
      value: function setValue(option) {
        var newState = {
          selected: option,
          isOpen: false
        };
        this.fireChangeEvent(newState);
        this.setState(newState);
      }
    },
    fireChangeEvent: {
      value: function fireChangeEvent(newState) {
        if (newState.selected !== this.state.selected && this.props.onChange) {
          this.props.onChange(newState.selected);
        }
      }
    },
    renderOption: {
      value: function renderOption(option) {
        var optionClass = classNames({
          "Dropdown-option": true,
          "is-selected": option == this.state.selected
        });

        return React.createElement(
          "div",
          { key: option.value, className: optionClass, onMouseDown: this.setValue.bind(this, option), onClick: this.setValue.bind(this, option) },
          option.label
        );
      }
    },
    buildMenu: {
      value: function buildMenu() {
        var _this = this;

        var ops = this.props.options.map(function (option) {
          if (option.type == "group") {
            var groupTitle = React.createElement(
              "div",
              { className: "title" },
              option.name
            );
            var _options = option.items.map(function (item) {
              return _this.renderOption(item);
            });

            return React.createElement(
              "div",
              { className: "group", key: option.name },
              groupTitle,
              _options
            );
          } else {
            return _this.renderOption(option);
          }
        });

        return ops.length ? ops : React.createElement(
          "div",
          { className: "Dropdown-noresults" },
          "No options found"
        );
      }
    },
    handleDocumentClick: {
      value: function handleDocumentClick(event) {
        if (this.mounted) {
          if (!ReactDOM.findDOMNode(this).contains(event.target)) {
            this.setState({ isOpen: false });
          }
        }
      }
    },
    render: {
      value: function render() {
        var _props = this.props;
        var controlClassName = _props.controlClassName;
        var menuClassName = _props.menuClassName;

        var value = React.createElement(
          "div",
          { className: "placeholder" },
          this.state.selected.label
        );
        var menu = this.state.isOpen ? React.createElement(
          "div",
          { className: menuClassName },
          this.buildMenu()
        ) : null;

        var dropdownClass = classNames({
          Dropdown: true,
          "is-open": this.state.isOpen
        });

        return React.createElement(
          "div",
          { className: dropdownClass },
          React.createElement(
            "div",
            { className: controlClassName, onMouseDown: this.handleMouseDown.bind(this), onTouchEnd: this.handleMouseDown.bind(this) },
            value,
            React.createElement("span", { className: "Dropdown-arrow" })
          ),
          menu
        );
      }
    }
  });

  return Dropdown;
})(React.Component);

Dropdown.defaultProps = { controlClassName: "Dropdown-control", menuClassName: "Dropdown-menu" };
module.exports = Dropdown;

