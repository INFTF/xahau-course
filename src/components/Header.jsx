import React from 'react'
import ProgressBar from './ProgressBar'
import LanguageSelect from './LanguageSelect'

function GitHubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function IconButton({ href, onClick, title, children }) {
  const cls = [
    'w-8 h-8 rounded-lg flex items-center justify-center transition-all',
    'border text-sm',
  ].join(' ')
  const style = {
    background: 'var(--color-button-bg)',
    borderColor: 'var(--color-border)',
    color: 'var(--color-text-secondary)',
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} style={style} title={title}>
        {children}
      </a>
    )
  }
  return (
    <button onClick={onClick} className={cls} style={style} title={title}>
      {children}
    </button>
  )
}

export default function Header({ lang, setLang, labels, completedCount, totalLessons, theme, onToggleTheme }) {
  const pct = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100)

  return (
    <header
      className="border-b px-4 sm:px-6 py-4"
      style={{
        background: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Top row */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1
              className="text-lg sm:text-xl font-black tracking-tight leading-none"
              style={{ color: 'var(--color-text-heading)' }}
            >
              <span style={{ color: 'var(--color-accent)' }}>⬡ </span>
              {labels.title}
            </h1>
            <p className="text-xs mt-1 hidden sm:block" style={{ color: 'var(--color-text-muted)' }}>
              {labels.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <IconButton href="https://github.com/INFTF/xahau-course" title="View on GitHub">
              <GitHubIcon />
            </IconButton>
            <IconButton onClick={onToggleTheme} title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
              {theme === 'dark' ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </IconButton>
            <LanguageSelect lang={lang} setLang={setLang} label={labels.language} />
          </div>
        </div>

        {/* Progress row */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              {labels.progress}: <span style={{ color: 'var(--color-text-secondary)' }}>{completedCount}/{totalLessons}</span>
            </span>
            <span className="text-xs font-bold tabular-nums" style={{ color: pct > 0 ? 'var(--color-accent)' : 'var(--color-text-dim)' }}>
              {pct}%
            </span>
          </div>
          <ProgressBar completed={completedCount} total={totalLessons} />
        </div>
      </div>
    </header>
  )
}
