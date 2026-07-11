import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Dropdown, { type Option } from '../../src/index'
import '../../style.css'
import './style.css'

const workspaceOptions = [
  {
    type: 'group' as const,
    name: 'Workspace',
    items: [
      { value: 'overview', label: 'Overview', data: { tone: 'blue' } },
      { value: 'roadmap', label: 'Roadmap', data: { tone: 'orange' } },
      { value: 'releases', label: 'Releases', data: { tone: 'mint' } },
    ],
  },
  {
    type: 'group' as const,
    name: 'Project',
    items: [
      { value: 'activity', label: 'Activity', data: { tone: 'violet' } },
      { value: 'settings', label: 'Settings', data: { tone: 'slate' } },
      { value: 'archive', label: 'Archive', disabled: true, data: { tone: 'slate' } },
    ],
  },
]

const featureCards = [
  {
    marker: '⌘',
    title: 'Keyboard complete',
    body: 'Arrow keys, Home, End, Enter, Escape, and Tab work the way people expect.',
  },
  {
    marker: 'Aa',
    title: 'Typed by default',
    body: 'TypeScript definitions ship with the package, including groups and custom renderers.',
  },
  {
    marker: '0',
    title: 'No runtime baggage',
    body: 'Just React. No positioning engine, style framework, or extra production dependency.',
  },
]

const installCommand = 'npm install react-dropdown'

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.22c-3.22.7-3.9-1.36-3.9-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.3-5.28-1.29-5.28-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.06.79 2.14v3.18c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="m4 10 4 4 8-9" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  )
}

function App() {
  const [selected, setSelected] = useState<Option | null>({
    value: 'overview',
    label: 'Overview',
    data: { tone: 'blue' },
  })
  const [copied, setCopied] = useState(false)

  const copyInstallCommand = async () => {
    await navigator.clipboard.writeText(installCommand)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  const selectedLabel = typeof selected?.label === 'string' ? selected.label : 'Nothing selected'
  const selectedTone = String(selected?.data?.tone ?? 'blue')

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="react-dropdown home">
          <span className="wordmark-mark" aria-hidden="true">
            ↓
          </span>
          <span>react-dropdown</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#features">Features</a>
          <a href="#example">Example</a>
          <a
            className="github-link"
            href="https://github.com/fraserxu/react-dropdown"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon />
            <span>GitHub</span>
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span>v2.0</span>
              React 18 + 19
            </p>
            <h1 id="hero-title">
              One control.
              <br />
              <em>Zero choreography.</em>
            </h1>
            <p className="lede">
              A lightweight, accessible dropdown for the space between a native select and a
              full-scale UI framework.
            </p>
            <div className="install-row">
              <button className="install-command" type="button" onClick={copyInstallCommand}>
                <span aria-hidden="true">$</span>
                <code>{installCommand}</code>
                <span className="copy-label" aria-live="polite">
                  {copied ? 'Copied' : 'Copy'}
                </span>
              </button>
              <a className="text-link" href="#example">
                See the code <ArrowIcon />
              </a>
            </div>
            <ul className="proof-list" aria-label="Package highlights">
              <li>
                <CheckIcon /> Accessible
              </li>
              <li>
                <CheckIcon /> TypeScript
              </li>
              <li>
                <CheckIcon /> Zero dependencies
              </li>
            </ul>
          </div>

          <div className="control-lab" aria-label="Interactive dropdown demo">
            <div className="lab-toolbar">
              <span className="lab-status">
                <i /> Live control
              </span>
              <span>Try the keyboard</span>
            </div>
            <div className="lab-stage">
              <div className="field-block">
                <div className="field-heading">
                  <label id="view-label">Project view</label>
                  <span>Required</span>
                </div>
                <Dropdown
                  aria-labelledby="view-label"
                  aria-required
                  options={workspaceOptions}
                  value={selected}
                  onChange={setSelected}
                  placeholder="Choose a view"
                  name="project-view"
                  renderOption={(option, state) => (
                    <span className="option-content">
                      <i className={`tone-dot tone-${String(option.data?.tone ?? 'slate')}`} />
                      <span>{option.label}</span>
                      {state.selected ? <span className="option-check">Selected</span> : null}
                    </span>
                  )}
                />
              </div>

              <div className="signal-line" aria-hidden="true">
                <span />
              </div>

              <div className="state-output">
                <div>
                  <span>Selected value</span>
                  <strong>{selectedLabel}</strong>
                </div>
                <code data-tone={selectedTone}>{`"${String(selected?.value ?? '')}"`}</code>
              </div>
            </div>
            <div className="key-strip" aria-label="Supported keyboard commands">
              <span>Navigate</span>
              <kbd>↑</kbd>
              <kbd>↓</kbd>
              <span>Select</span>
              <kbd>Enter</kbd>
              <span>Close</span>
              <kbd>Esc</kbd>
            </div>
          </div>
        </section>

        <section className="features-section" id="features" aria-labelledby="features-title">
          <div className="section-heading">
            <p className="section-kicker">Built for the common case</p>
            <h2 id="features-title">Small API. Complete behavior.</h2>
          </div>
          <div className="feature-grid">
            {featureCards.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <span className="feature-marker" aria-hidden="true">
                  {feature.marker}
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="code-section" id="example" aria-labelledby="example-title">
          <div className="code-copy">
            <p className="section-kicker">Readable on purpose</p>
            <h2 id="example-title">Drop it in. Style it yours.</h2>
            <p>
              Primitive values and option objects work together. Add groups, controlled state,
              custom rendering, or form integration only when you need them.
            </p>
            <a
              className="docs-link"
              href="https://github.com/fraserxu/react-dropdown#readme"
              target="_blank"
              rel="noreferrer"
            >
              Read the full API <ArrowIcon />
            </a>
          </div>

          <div className="code-window" aria-label="React usage example">
            <div className="code-toolbar">
              <div aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <span>ProjectView.tsx</span>
              <span>TSX</span>
            </div>
            <pre>
              <code>
                <span className="code-blue">import</span> Dropdown{' '}
                <span className="code-blue">from</span>{' '}
                <span className="code-green">'react-dropdown'</span>
                {'\n'}
                <span className="code-blue">import</span>{' '}
                <span className="code-green">'react-dropdown/style.css'</span>
                {'\n\n'}
                <span className="code-blue">const</span> options = [
                {'\n  '}
                <span className="code-green">'Overview'</span>,{' '}
                <span className="code-green">'Roadmap'</span>,{' '}
                <span className="code-green">'Releases'</span>
                {'\n'}]
                {'\n\n'}
                <span className="code-violet">&lt;Dropdown</span>
                {'\n  '}options={'{options}'}
                {'\n  '}onChange={'{setView}'}
                {'\n  '}placeholder=<span className="code-green">&quot;Choose a view&quot;</span>
                {'\n'}
                <span className="code-violet">/&gt;</span>
              </code>
            </pre>
          </div>
        </section>
      </main>

      <footer>
        <div>
          <span className="wordmark-mark" aria-hidden="true">
            ↓
          </span>
          <p>
            Open source, MIT licensed.
            <br />
            Built by Fraser Xu.
          </p>
        </div>
        <a href="https://www.npmjs.com/package/react-dropdown" target="_blank" rel="noreferrer">
          View on npm <ArrowIcon />
        </a>
      </footer>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
