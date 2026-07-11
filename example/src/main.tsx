import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Dropdown, { type Option } from '../../src/index'
import '../../style.css'
import './style.css'

const options = [
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  {
    type: 'group' as const,
    name: 'Operations',
    items: [
      { value: 'finance', label: 'Finance' },
      { value: 'legal', label: 'Legal', disabled: true },
    ],
  },
]

function App() {
  const [selected, setSelected] = useState<Option | null>(null)

  return (
    <main>
      <p className="eyebrow">react-dropdown 2.0</p>
      <h1>A small dropdown that behaves like a real control.</h1>
      <p className="intro">Try it with a pointer, Tab, arrow keys, Enter, and Escape.</p>
      <label id="team-label">Team</label>
      <Dropdown
        aria-labelledby="team-label"
        options={options}
        value={selected}
        onChange={setSelected}
        placeholder="Choose a team"
        name="team"
      />
      <output>{selected ? `Selected: ${selected.label}` : 'Nothing selected'}</output>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
