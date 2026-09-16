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
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" disabled={busy} onClick={createLink} className="rounded-full border-[2.5px] border-border-strong px-3 py-1.5 font-mono text-[11.5px] text-text-dim disabled:opacity-50">
          {busy ? 'Creando…' : 'Crear enlace público'}
        </button>
        {message && <span className="font-mono text-[10.5px] text-text-faint">{message}</span>}
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" disabled={busy} onClick={copyLink} className="rounded-full bg-text px-3 py-1.5 font-mono text-[11.5px] text-white disabled:opacity-50">Copiar enlace público</button>
      <button type="button" disabled={busy} onClick={revokeLink} className="font-mono text-[10.5px] text-text-faint underline disabled:opacity-50">Revocar</button>
      {message && <span className="font-mono text-[10.5px] text-text-faint">{message}</span>}
    </div>
  )
}
