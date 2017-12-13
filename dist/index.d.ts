/// <reference types="react" />
import * as React from 'react';
export interface Option {
    label: string;
    value: string;
    type?: string;
    name?: string;
    items?: Array<Option>;
}
export interface DropdownProps {
    className?: string;
    baseClassName?: string;
    disabled?: boolean;
    value?: string | Option;
    placeholder?: string;
    options?: Array<Option | string>;
    onFocus?: (isOpen: boolean) => void;
    onChange?: (data: string | Option) => void;
}
export interface DropdownState {
    isOpen: boolean;
    selected: string | Option;
}
declare class Dropdown extends React.Component<DropdownProps, DropdownState> {
    private mounted;
    private container;
    static defaultProps: DropdownProps;
    constructor(props: DropdownProps);
    componentWillReceiveProps(newProps: DropdownProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    getContainer(ref: HTMLDivElement): void;
    handleMouseDown(event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>): void;
    setValue(value: string, label: string): void;
    fireChangeEvent(newState: DropdownState): void;
    renderOption(option: Option | string): JSX.Element;
    buildMenu(): JSX.Element | JSX.Element[];
    handleDocumentClick(event: React.MouseEvent<HTMLElement>): void;
    render(): JSX.Element;
}
export default Dropdown;
