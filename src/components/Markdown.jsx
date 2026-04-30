import React from 'react'

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i}>{part.slice(1, -1)}</code>
    }
    const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/)
    if (linkMatch) {
      return (
        <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer">
          {linkMatch[1]}
        </a>
      )
    }
    return part
  })
}

export default function Markdown({ text }) {
  if (!text) return null
  const lines = text.split('\n')
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Fenced code block
    if (line.trimStart().startsWith('```')) {
      const codeLines = []
      i++
      while (i < lines.length && !lines[i].trimStart().startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      i++
      elements.push(
        <pre
          key={`pre-${i}`}
          style={{
            background: 'var(--color-code-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: '10px',
            padding: '14px 16px',
            margin: '1rem 0',
            overflowX: 'auto',
            fontSize: '13.5px',
            lineHeight: '1.65',
            color: 'var(--color-code-text)',
          }}
        >
          <code style={{ fontFamily: "'Fira Code', 'JetBrains Mono', Consolas, monospace" }}>
            {codeLines.join('\n')}
          </code>
        </pre>
      )
      continue
    }

    // Table
    if (line.trimStart().startsWith('|')) {
      const tableLines = []
      while (i < lines.length && lines[i].trimStart().startsWith('|')) {
        tableLines.push(lines[i])
        i++
      }
      const rows = tableLines
        .filter(row => !/^\|\s*-+/.test(row))
        .map(row => row.split('|').slice(1, -1).map(cell => cell.trim()))

      if (rows.length > 0) {
        const [headerRow, ...bodyRows] = rows
        elements.push(
          <div key={`tbl-${i}`} className="overflow-x-auto my-4">
            <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {headerRow.map((cell, ci) => (
                    <th
                      key={ci}
                      style={{
                        textAlign: 'left',
                        padding: '8px 12px',
                        fontSize: '11px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        background: 'var(--color-surface-raised)',
                        borderBottom: '2px solid var(--color-border)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {renderInline(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        style={{
                          padding: '8px 12px',
                          borderBottom: '1px solid var(--color-border-subtle)',
                          color: 'var(--color-text)',
                        }}
                      >
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
      continue
    }

    if (line.startsWith('## ')) {
      elements.push(<h2 key={i}>{renderInline(line.slice(3))}</h2>)
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i}>{renderInline(line.slice(4))}</h3>)
    } else if (line.startsWith('- ')) {
      elements.push(
        <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '6px', marginLeft: '4px' }}>
          <span style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '0.15em', fontSize: '0.7em', lineHeight: '1.75' }}>◆</span>
          <span>{renderInline(line.slice(2))}</span>
        </div>
      )
    } else if (/^\d+\.\s/.test(line)) {
      const match = line.match(/^(\d+)\.\s(.*)/)
      elements.push(
        <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '6px', marginLeft: '4px' }}>
          <span style={{ color: 'var(--color-accent)', fontWeight: 600, flexShrink: 0, fontSize: '0.9em', minWidth: '1.25rem' }}>
            {match[1]}.
          </span>
          <span>{renderInline(match[2])}</span>
        </div>
      )
    } else if (line.trim() === '') {
      elements.push(<div key={i} style={{ height: '0.5rem' }} />)
    } else {
      elements.push(<p key={i}>{renderInline(line)}</p>)
    }

    i++
  }

  return <div>{elements}</div>
}
