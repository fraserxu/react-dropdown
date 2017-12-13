declare module "react-dropdown" {
  import * as React from "react";
  export interface Option {
    label: string;
    value: string;
  }
  export interface Group {
    type: "group";
    name: string;
    items: Option[];
  }
  interface ReactDropdownProps {
    options: (Group | Option | string)[];
    baseClassName?: string;
    className?: string;
    disabled?: boolean;
    onChange?: (arg: Option) => void;
    onFocus?: (arg: boolean) => void;
    value?: Option;
    placeholder?: String;
  }

  class ReactDropdown extends React.Component<ReactDropdownProps> {
  }

  export default ReactDropdown;
}
