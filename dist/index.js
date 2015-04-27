"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = _interopRequire(require("react"));

var classNames = _interopRequire(require("classnames"));

var Dropdown = (function (_React$Component) {
  function Dropdown() {
    _classCallCheck(this, Dropdown);

    this.state = {
      selected: undefined,
      isOpen: false
    };
  }

  _inherits(Dropdown, _React$Component);

  _createClass(Dropdown, {
    componentWillMount: {
      value: function componentWillMount() {
        this.setState({
          selected: this.props.value || { label: "Select...", value: "" }
        });
      }
    },
    componentWillReceiveProps: {
      value: function componentWillReceiveProps(newProps) {
        if (newProps.value && newProps.value !== this.state.selected) {
          this.setState({ selected: newProps.value });
        }
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
          "No opitons found"
        );
      }
    },
    render: {
      value: function render() {
        var value = React.createElement(
          "div",
          { className: "placeholder" },
          this.state.selected.label
        );
        var menu = this.state.isOpen ? React.createElement(
          "div",
          { className: "Dropdown-menu" },
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
            { className: "Dropdown-control", onMouseDown: this.handleMouseDown.bind(this), onTouchEnd: this.handleMouseDown.bind(this) },
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

module.exports = Dropdown;

