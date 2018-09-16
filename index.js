import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const DEFAULT_PLACEHOLDER_STRING = 'Select...';

class Dropdown extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: this.parseValue(props.value, props.options) || {
				label:
					typeof props.placeholder === 'undefined'
						? DEFAULT_PLACEHOLDER_STRING
						: props.placeholder,
				value: ''
			},
			isOpen: false
		};
		this.labelId = props.labelId;
		this.rootId = props.rootId;
		this.isRequired = props.isRequired;
		this.forwardRef = props.forwardRef;
		this.mounted = true;
		this.handleDocumentClick = this.handleDocumentClick.bind(this);
		this.fireChangeEvent = this.fireChangeEvent.bind(this);
	}

	componentDidMount() {
		document.addEventListener('click', this.handleDocumentClick, true);
		document.addEventListener('touchend', this.handleDocumentClick, true);
	}

	componentWillReceiveProps(newProps) {
		if (newProps.value) {
			const selected = this.parseValue(newProps.value, newProps.options);
			if (selected !== this.state.selected) {
				this.setState({ selected: selected });
			}
		} else {
			this.setState({
				selected: {
					label:
						typeof newProps.placeholder === 'undefined'
							? DEFAULT_PLACEHOLDER_STRING
							: newProps.placeholder,
					value: ''
				}
			});
		}
	}

	componentWillUnmount() {
		this.mounted = false;
		document.removeEventListener('click', this.handleDocumentClick, true);
		document.removeEventListener('touchend', this.handleDocumentClick, true);
	}

	setValue(value, label) {
		const newState = {
			selected: {
				value,
				label
			},
			isOpen: false
		};
		this.fireChangeEvent(newState);
		this.setState(newState);
	}

	parseValue(value, options) {
		let option;

		if (typeof value === 'string') {
			for (let i = 0, num = options.length; i < num; i++) {
				if (options[i].type === 'group') {
					const match = options[i].items.filter(item => item.value === value);
					if (match.length) {
						option = match[0];
					}
				} else if (
					typeof options[i].value !== 'undefined' &&
					options[i].value === value
				) {
					option = options[i];
				}
			}
		}

		return option || value;
	}

	handleMouseDown(event) {
		const anyOpenDropdowns =
			this.forwardRef.current.parentElement.getElementsByClassName(
				'Dropdown-root is-open'
			).length > 0;

		if (this.props.onFocus && typeof this.props.onFocus === 'function') {
			this.props.onFocus(this.state.isOpen);
		}
		if (anyOpenDropdowns || (event.type === 'mousedown' && event.button !== 0))
			return;
		event.stopPropagation();
		event.preventDefault();

		if (!this.props.disabled) {
			this.setState({
				isOpen: !this.state.isOpen
			});
		}
	}

	fireChangeEvent(newState) {
		if (newState.selected !== this.state.selected && this.props.onChange) {
			this.props.onChange(newState.selected);
		}
	}

	buildMenu() {
		const { options, baseClassName } = this.props;
		const ops = options.map(option => {
			if (option.type === 'group') {
				const groupTitle = (
					<div className={`${baseClassName}-title`}>{option.name}</div>
				);
				const _options = option.items.map(item => this.renderOption(item));

				return (
					<div className={`${baseClassName}-group`} key={option.name}>
						{groupTitle}
						{_options}
					</div>
				);
			}
			return this.renderOption(option);
		});

		return ops.length ? (
			ops
		) : (
			<div className={`${baseClassName}-noresults`}>No options found</div>
		);
	}

	handleDocumentClick(event) {
		const isTarget = this.forwardRef.current.contains(event.target);

		if (isTarget || this.state.isOpen) {
			event.stopPropagation();
		}

		if (
			this.mounted &&
			!isTarget &&
			(this.state.isOpen && (!this.isRequired || this.props.value !== undefined))
		) {
			this.setState({ isOpen: false });
		}
	}

	isValueSelected() {
		return (
			typeof this.state.selected === 'string' ||
			this.state.selected.value !== ''
		);
	}

	renderOption(option) {
		let value = option.value;
		if (typeof value === 'undefined') {
			value = option.label || option;
		}
		const label = option.label || option.value || option;
		const isSelected =
			value === this.state.selected.value || value === this.state.selected;
		const classes = {
			[`${this.props.baseClassName}-option`]: true,
			[option.className]: !!option.className,
			'is-selected': isSelected
		};

		const optionClass = classNames(classes);

		return (
			<div
				key={value}
				className={optionClass}
				onMouseDown={() => this.setValue(value, label)}
				onClick={() => this.setValue(value, label)}
				role="option"
				aria-selected={isSelected}
			>
				{label}
			</div>
		);
	}

	render() {
		const {
			baseClassName,
			controlClassName,
			placeholderClassName,
			menuClassName,
			arrowClassName,
			arrowClosed,
			arrowOpen,
			className
		} = this.props;

		const disabledClass = this.props.disabled ? 'Dropdown-disabled' : '';
		const placeHolderValue =
			typeof this.state.selected === 'string'
				? this.state.selected
				: this.state.selected.label;

		const dropdownClass = classNames({
			[`${baseClassName}-root`]: true,
			[className]: !!className,
			'is-open': this.state.isOpen
		});
		const controlClass = classNames({
			[`${baseClassName}-control`]: true,
			[controlClassName]: !!controlClassName,
			[disabledClass]: !!disabledClass
		});
		const placeholderClass = classNames({
			[`${baseClassName}-placeholder`]: true,
			[placeholderClassName]: !!placeholderClassName,
			'is-selected': this.isValueSelected()
		});
		const menuClass = classNames({
			[`${baseClassName}-menu`]: true,
			[menuClassName]: !!menuClassName
		});
		const arrowClass = classNames({
			[`${baseClassName}-arrow`]: true,
			[arrowClassName]: !!arrowClassName
		});

		const valueOpts = {
			className: placeholderClass,
			role: 'button',
			'aria-haspopup': 'listbox'
		};
		if (this.rootId) {
			valueOpts.id = this.rootId;

			if (this.labelId) {
				valueOpts['aria-labelledby'] = `${this.labelId} ${this.rootId}`;
			}
		}
		const value = <div {...valueOpts}>{placeHolderValue}</div>;

		const menuOpts = {
			className: menuClass,
			role: 'listbox',
			'aria-expanded': 'true',
			tabIndex: '-1'
		};
		if (this.labelId) {
			menuOpts['aria-labelledby'] = this.labelId;
		}
		const menu = this.state.isOpen ? (
			<div {...menuOpts}>{this.buildMenu()}</div>
		) : null;

		let arrowState;
		if (arrowOpen && arrowClosed) {
			arrowState = this.state.isOpen ? arrowOpen : arrowClosed;
		} else {
			arrowState = <span className={arrowClass} />;
		}

		return (
			<div className={dropdownClass}>
				<div
					className={controlClass}
					onMouseDown={event => this.handleMouseDown(event)}
					onTouchEnd={event => this.handleMouseDown(event)}
				>
					{value}
					<div className={`${baseClassName}-arrow-wrapper`}>{arrowState}</div>
				</div>
				{menu}
			</div>
		);
	}
}

Dropdown.defaultProps = { baseClassName: 'Dropdown' };

Dropdown.propTypes = {
	value: PropTypes.string,
	options: PropTypes.array,
	placeholder: PropTypes.string,
	labelId: PropTypes.string,
	rootId: PropTypes.string,
	isRequired: PropTypes.bool,
	disabled: PropTypes.bool,
	forwardRef: PropTypes.any,
	onFocus: PropTypes.func,
	onChange: PropTypes.func,
	baseClassName: PropTypes.string,
	controlClassName: PropTypes.string,
	placeholderClassName: PropTypes.string,
	menuClassName: PropTypes.string,
	arrowClassName: PropTypes.string,
	className: PropTypes.string,
	arrowOpen: PropTypes.any,
	arrowClosed: PropTypes.any
};

export default Dropdown;
