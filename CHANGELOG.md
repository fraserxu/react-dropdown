# Changelog

## 2.0.0

### Added

- React 18 and React 19 support.
- Accessible select-only combobox and listbox semantics.
- Complete keyboard navigation and disabled options.
- Controlled and uncontrolled selected-value and popup state.
- Number and boolean values, including `0` and `false`.
- Custom option rendering and option class callbacks.
- Native form values through `name` and `form`.
- ESM, CommonJS, source maps, and generated TypeScript declarations.
- Interaction, controlled-state, form, grouping, and SSR tests.
- GitHub Actions checks on current Node LTS and current Node.
- A Vite-powered local example.

### Changed

- React 18 is now the minimum supported version.
- `onFocus` is tied to actual trigger focus.
- `onChange` returns the complete normalized option.
- The default stylesheet has visible focus, active, selected, disabled, and reduced-motion states.
- The internal markup now uses a button, listbox, groups, and options with appropriate ARIA state.

### Removed

- Browserify, Watchify, Babel, Travis CI, and the deprecated example server.
- The `classnames` runtime dependency. Version 2 has zero runtime dependencies.
