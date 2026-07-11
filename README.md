# react-dropdown

A lightweight, accessible dropdown component for React 18 and 19.

`react-dropdown` is for the common case where a native `<select>` is too difficult to style, but a large select framework would be excessive. It supports single selection, option groups, controlled and uncontrolled state, custom rendering, keyboard navigation, and TypeScript without runtime dependencies.

## Install

```sh
npm install react-dropdown
```

Import the component and its default styles:

```tsx
import Dropdown, { type Option } from 'react-dropdown'
import 'react-dropdown/style.css'

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  {
    type: 'group' as const,
    name: 'More',
    items: [
      { value: 'three', label: 'Three' },
      { value: 'four', label: 'Four', disabled: true },
    ],
  },
]

function Example() {
  const handleChange = (option: Option) => {
    console.log(option.value)
  }

  return (
    <Dropdown
      aria-label="Number"
      options={options}
      onChange={handleChange}
      placeholder="Select an option"
    />
  )
}
```

Primitive options are supported too:

```tsx
<Dropdown options={['one', 'two', 'three']} defaultValue="one" />
```

String, number, and boolean values are supported. Labels may be any `ReactNode`.

## Controlled state

Control the selected value, the open state, or both:

```tsx
const [value, setValue] = useState<Option | null>(null)
const [open, setOpen] = useState(false)

<Dropdown
  options={options}
  value={value}
  onChange={setValue}
  open={open}
  onOpenChange={setOpen}
/>
```

Use `null` to clear a controlled value. Use `defaultValue` or `defaultOpen` for uncontrolled initial state.

## Accessible labels

Give every dropdown an accessible name with a visible label:

```tsx
<label id="country-label">Country</label>
<Dropdown aria-labelledby="country-label" options={countries} />
```

Or use `aria-label` when there is no visible label:

```tsx
<Dropdown aria-label="Country" options={countries} />
```

The trigger implements a select-only combobox with a listbox popup. It supports:

- `Enter` or `Space` to open and select.
- `ArrowDown` and `ArrowUp` to open and move through options.
- `Home` and `End` to move to the first or last enabled option.
- `Escape` to close.
- `Tab` to close and continue normal page navigation.
- Disabled options, named groups, selected state, and active-descendant announcements.

## Forms

Pass `name` to include the selected value in native form submission:

```tsx
<Dropdown name="country" options={countries} defaultValue="au" />
```

The component renders a hidden input using the selected option value. Pass `form` to associate it with a form by ID.

## Custom rendering

```tsx
<Dropdown
  options={options}
  renderOption={(option, { active, selected }) => (
    <span>
      {selected ? '✓ ' : ''}
      {option.label}
      {active ? ' ←' : ''}
    </span>
  )}
  optionClassName={(_option, state) => (state.active ? 'my-active-option' : undefined)}
/>
```

Options may also define `className` and `data`:

```tsx
const options = [
  {
    value: 'one',
    label: 'One',
    className: 'important-option',
    data: { analytics: 'option-one' },
  },
]
```

## API

| Prop | Type | Default | Purpose |
| --- | --- | --- | --- |
| `options` | `DropdownEntry[]` | required | Primitive options, option objects, or groups. |
| `value` | `Option \| string \| number \| boolean \| null` | — | Controlled selected value. |
| `defaultValue` | same as `value` | `null` | Initial uncontrolled value. |
| `open` | `boolean` | — | Controlled popup state. |
| `defaultOpen` | `boolean` | `false` | Initial uncontrolled popup state. |
| `onChange` | `(option: Option) => void` | — | Called after a user selects an option. |
| `onOpenChange` | `(open: boolean) => void` | — | Called when the popup requests an open-state change. |
| `onFocus` | `(open: boolean) => void` | — | Called when the trigger receives focus. |
| `placeholder` | `ReactNode` | `"Select..."` | Content shown without a selection. |
| `disabled` | `boolean` | `false` | Disables the trigger. |
| `name` | `string` | — | Adds a hidden form input. |
| `form` | `string` | — | Associates the hidden input with a form ID. |
| `id` | `string` | generated | Sets the trigger ID and derived popup IDs. |
| `tabIndex` | `number` | browser default | Overrides the trigger's tab order. |
| `aria-label` | `string` | — | Gives the control an accessible name. |
| `aria-labelledby` | `string` | — | References a visible label. |
| `renderOption` | `(option, state) => ReactNode` | option label | Custom option contents. |
| `noOptionsContent` | `ReactNode` | `"No options found"` | Empty-state contents. |
| `arrowClosed` / `arrowOpen` | `ReactNode` | CSS arrow | Custom trigger arrows. Provide both. |

The styling props are `baseClassName`, `className`, `controlClassName`, `placeholderClassName`, `menuClassName`, `optionClassName`, and `arrowClassName`.

The forwarded ref points to the trigger `HTMLButtonElement`.

## Styling

The default stylesheet retains the familiar class names:

- `.Dropdown-root`
- `.Dropdown-control`
- `.Dropdown-placeholder`
- `.Dropdown-arrow-wrapper` and `.Dropdown-arrow`
- `.Dropdown-menu`
- `.Dropdown-group` and `.Dropdown-title`
- `.Dropdown-option`
- `.Dropdown-noresults`

State classes include `.is-open`, `.is-selected`, `.is-active`, and `.is-disabled`.

Set `baseClassName` to replace the `Dropdown` prefix when supplying all of your own styles.

## Migrating from 1.x

Version 2 is a deliberate accessibility and packaging reset:

- React 18 or 19 is required.
- The package now ships ESM and CommonJS with an `exports` map.
- The trigger is a focusable button with `role="combobox"`; CSS that assumes `.Dropdown-control` is a `<div>` may need adjustment.
- `onFocus` now runs when the trigger actually receives focus.
- `onChange` returns the complete normalized option, including `className`, `disabled`, and `data` when present.
- `value={null}` clears a controlled selection. `0` and `false` are valid values.
- The menu uses semantic `<ul>` and `<li>` elements. Prefer class selectors over element selectors in custom CSS.
- `optionClassName`, `renderOption`, `open`, and `onOpenChange` replace common 1.x workarounds.
- The old global `.Dropdown-disabled` class is now applied directly to the disabled control.

## Development

```sh
npm install
npm run dev       # local example
npm test          # interaction tests
npm run typecheck
npm run build
npm run check     # all release checks
```

## License

MIT
