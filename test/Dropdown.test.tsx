import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderToString } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import Dropdown, { type Option } from '../src/index'

const options: Option[] = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three', disabled: true },
]

describe('Dropdown', () => {
  it('renders a labelled combobox and opens its listbox', async () => {
    const user = userEvent.setup()
    render(<Dropdown aria-label="Number" options={options} placeholder="Choose one" />)

    const control = screen.getByRole('combobox', { name: 'Number' })
    expect(control.textContent).toContain('Choose one')
    expect(control.getAttribute('aria-expanded')).toBe('false')

    await user.click(control)

    expect(control.getAttribute('aria-expanded')).toBe('true')
    expect(screen.getByRole('listbox')).not.toBeNull()
    expect(screen.getAllByRole('option')).toHaveLength(3)
  })

  it('supports uncontrolled selection and returns the complete option', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Dropdown options={options} defaultValue="one" onChange={onChange} />)

    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: 'Two' }))

    expect(onChange).toHaveBeenCalledWith(options[1])
    expect(screen.getByRole('combobox').textContent).toContain('Two')
    expect(screen.queryByRole('listbox')).toBeNull()
  })

  it('responds to controlled value and placeholder changes', () => {
    const { rerender } = render(<Dropdown options={options} value={null} placeholder="First" />)
    expect(screen.getByRole('combobox').textContent).toContain('First')

    rerender(<Dropdown options={options} value="two" placeholder="Second" />)
    expect(screen.getByRole('combobox').textContent).toContain('Two')

    rerender(<Dropdown options={options} value={null} placeholder="Second" />)
    expect(screen.getByRole('combobox').textContent).toContain('Second')
  })

  it('handles zero and boolean option values', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <Dropdown
        options={[
          { value: 0, label: 'Zero' },
          { value: false, label: 'No' },
        ]}
        defaultValue={0}
        onChange={onChange}
      />,
    )

    expect(screen.getByRole('combobox').textContent).toContain('Zero')
    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: 'No' }))
    expect(onChange.mock.calls[0]?.[0].value).toBe(false)
    expect(screen.getByRole('combobox').textContent).toContain('No')
  })

  it('supports arrow navigation, skips disabled options, and selects with Enter', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Dropdown options={options} onChange={onChange} />)

    const control = screen.getByRole('combobox')
    control.focus()
    await user.keyboard('{ArrowDown}')
    expect(control.getAttribute('aria-expanded')).toBe('true')
    expect(control.getAttribute('aria-activedescendant')).toContain('option-0')

    await user.keyboard('{ArrowDown}')
    expect(control.getAttribute('aria-activedescendant')).toContain('option-1')

    await user.keyboard('{ArrowDown}')
    expect(control.getAttribute('aria-activedescendant')).toContain('option-0')

    await user.keyboard('{ArrowUp}{Enter}')
    expect(onChange).toHaveBeenCalledWith(options[1])
    expect(control.getAttribute('aria-expanded')).toBe('false')
  })

  it('supports Home, End, Escape, and Tab without trapping focus', async () => {
    const user = userEvent.setup()
    render(
      <div>
        <Dropdown options={options} />
        <button type="button">After</button>
      </div>,
    )

    const control = screen.getByRole('combobox')
    control.focus()
    await user.keyboard('{ArrowDown}{End}')
    expect(control.getAttribute('aria-activedescendant')).toContain('option-1')
    await user.keyboard('{Home}')
    expect(control.getAttribute('aria-activedescendant')).toContain('option-0')
    await user.keyboard('{Escape}')
    expect(control.getAttribute('aria-expanded')).toBe('false')

    await user.keyboard('{ArrowDown}{Tab}')
    expect(screen.getByRole('button', { name: 'After' })).toBe(document.activeElement)
    expect(control.getAttribute('aria-expanded')).toBe('false')
  })

  it('exposes grouped options with accessible group names', async () => {
    const user = userEvent.setup()
    render(
      <Dropdown
        options={[
          { type: 'group', name: 'Letters', items: ['A', 'B'] },
          { type: 'group', name: 'Numbers', items: [1, 2] },
        ]}
      />,
    )

    await user.click(screen.getByRole('combobox'))
    expect(screen.getByRole('group', { name: 'Letters' })).not.toBeNull()
    expect(screen.getByRole('group', { name: 'Numbers' })).not.toBeNull()
  })

  it('supports controlled open state and reports requested changes', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    const { rerender } = render(
      <Dropdown options={options} open={false} onOpenChange={onOpenChange} />,
    )

    await user.click(screen.getByRole('combobox'))
    expect(onOpenChange).toHaveBeenCalledWith(true)
    expect(screen.queryByRole('listbox')).toBeNull()

    rerender(<Dropdown options={options} open onOpenChange={onOpenChange} />)
    expect(screen.getByRole('listbox')).not.toBeNull()
  })

  it('closes when a pointer interaction happens outside', async () => {
    const user = userEvent.setup()
    render(
      <div>
        <Dropdown options={options} />
        <button type="button">Outside</button>
      </div>,
    )

    await user.click(screen.getByRole('combobox'))
    fireEvent.pointerDown(screen.getByRole('button', { name: 'Outside' }))
    expect(screen.queryByRole('listbox')).toBeNull()
  })

  it('supports option data, custom rendering, classes, and form values', async () => {
    const user = userEvent.setup()
    render(
      <Dropdown
        options={[{ value: 'one', label: 'One', data: { testid: 'first' } }]}
        defaultValue="one"
        name="choice"
        optionClassName={(_option, state) => (state.selected ? 'chosen' : undefined)}
        renderOption={(option) => <strong>{option.label}</strong>}
      />,
    )

    expect((document.querySelector('input[name="choice"]') as HTMLInputElement).value).toBe('one')
    await user.click(screen.getByRole('combobox'))
    const option = screen.getByRole('option', { name: 'One' })
    expect(option.getAttribute('data-testid')).toBe('first')
    expect(option.className).toContain('chosen')
    expect(option.querySelector('strong')).not.toBeNull()
  })

  it('does not open or select when disabled', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Dropdown disabled options={options} onChange={onChange} />)

    await user.click(screen.getByRole('combobox'))
    expect(screen.queryByRole('listbox')).toBeNull()
    expect(onChange).not.toHaveBeenCalled()
  })

  it('renders on the server without accessing the document', () => {
    expect(() => renderToString(<Dropdown options={options} />)).not.toThrow()
  })
})
