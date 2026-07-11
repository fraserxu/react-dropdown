import { type ReactNode } from 'react';
export type DropdownValue = string | number | boolean;
export interface Option {
    value: DropdownValue;
    label: ReactNode;
    className?: string;
    disabled?: boolean;
    data?: Record<string, string | number | boolean | undefined>;
}
export interface Group {
    type: 'group';
    name: ReactNode;
    items: DropdownItem[];
}
export type DropdownItem = Option | DropdownValue;
export type DropdownEntry = Group | DropdownItem;
export interface RenderOptionState {
    active: boolean;
    selected: boolean;
}
export interface ReactDropdownProps {
    options: DropdownEntry[];
    value?: Option | DropdownValue | null;
    defaultValue?: Option | DropdownValue | null;
    open?: boolean;
    defaultOpen?: boolean;
    placeholder?: ReactNode;
    disabled?: boolean;
    name?: string;
    form?: string;
    id?: string;
    tabIndex?: number;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-required'?: boolean;
    baseClassName?: string;
    className?: string;
    controlClassName?: string;
    placeholderClassName?: string;
    menuClassName?: string;
    optionClassName?: string | ((option: Option, state: RenderOptionState) => string | undefined);
    arrowClassName?: string;
    arrowClosed?: ReactNode;
    arrowOpen?: ReactNode;
    noOptionsContent?: ReactNode;
    renderOption?: (option: Option, state: RenderOptionState) => ReactNode;
    onChange?: (option: Option) => void;
    onFocus?: (isOpen: boolean) => void;
    onOpenChange?: (isOpen: boolean) => void;
}
declare const Dropdown: import("react").ForwardRefExoticComponent<ReactDropdownProps & import("react").RefAttributes<HTMLButtonElement>>;
export default Dropdown;
//# sourceMappingURL=index.d.ts.map