import { useState } from 'react'

interface Props {
  enabled: boolean
  onSetEnabled: (enabled: boolean) => Promise<{ error: string | null }>
}

export function PublicShareButton({ enabled, onSetEnabled }: Props) {
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const url = `${window.location.origin}/p/${location.pathname.split('/').pop()}`

  async function copyLink() {
    await navigator.clipboard.writeText(url)
    setMessage('Enlace copiado')
  }

  async function createLink() {
    setBusy(true)
    const { error } = await onSetEnabled(true)
    setBusy(false)
    if (error) {
      setMessage(error)
      return
    }
    await copyLink()
  }

  async function revokeLink() {
    setBusy(true)
    const { error } = await onSetEnabled(false)
    setBusy(false)
    setMessage(error ?? 'Enlace público revocado')
  }

  if (!enabled) {
    return (
      <div className="flex items-center gap-1">
        <button type="button" disabled={busy} onClick={createLink} title="Crear y copiar enlace público" aria-label="Crear y copiar enlace público" className="inline-flex h-9 w-9 items-center justify-center rounded-full border-[2.5px] border-border-strong text-text-dim transition-colors duration-150 hover:bg-surface-2 hover:text-text disabled:opacity-50">
          <LinkIcon />
        </button>
        {message && <span className="font-mono text-[10.5px] text-text-faint">{message}</span>}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1">
      <button type="button" disabled={busy} onClick={copyLink} title="Copiar enlace público" aria-label="Copiar enlace público" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-text text-white transition-colors duration-150 hover:bg-text-dim disabled:opacity-50"><LinkIcon /></button>
      <button type="button" disabled={busy} onClick={revokeLink} title="Revocar enlace público" aria-label="Revocar enlace público" className="inline-flex h-9 w-9 items-center justify-center rounded-full text-text-faint transition-colors duration-150 hover:bg-surface-2 hover:text-red-500 disabled:opacity-50"><UnlinkIcon /></button>
      {message && <span className="font-mono text-[10.5px] text-text-faint">{message}</span>}
    </div>
  )
}

function LinkIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.07.07l2-2a5 5 0 0 0-7.07-7.07l-1.15 1.15" /><path d="M14 11a5 5 0 0 0-7.07-.07l-2 2A5 5 0 0 0 12 20l1.15-1.15" /></svg>
}

function UnlinkIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.07.07l2-2a5 5 0 0 0-7.07-7.07l-1.15 1.15" /><path d="m3 3 18 18" /></svg>
}
