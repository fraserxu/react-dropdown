declare module "react-dropdown" {
  import * as React from "react";
  interface Option {
    label: string;
    value: string;
  }
  interface Group {
    type: "group";
    name: string;
    items: Option[];
  }
  interface ReactDropdownProps {
    options: (Group | Option)[];
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
