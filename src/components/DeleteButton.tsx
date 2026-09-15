import { useEffect, useState } from 'react'

interface Props {
  itemLabel: string
  confirmText?: string
  onConfirm: () => void
  className?: string
}

/** Small ghost icon-button that opens a confirmation modal before calling onConfirm. */
export function DeleteButton({ itemLabel, confirmText, onConfirm, className }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(true) }}
        title="Eliminar"
        aria-label="Eliminar"
        className={`inline-flex shrink-0 items-center justify-center rounded-md p-1 text-text-faint transition-colors hover:bg-surface-2 hover:text-red-500 ${className ?? ''}`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-text/50 p-5"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div className="w-full max-w-[380px] rounded-2xl bg-surface p-5 shadow-xl">
            <div className="mb-1.5 font-mono text-[10px] uppercase tracking-wide text-text-faint">
              {confirmText ?? 'Eliminar'}
            </div>
            <div className="mb-4 text-sm font-semibold leading-snug text-text">{itemLabel}</div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border-2 border-border-strong bg-surface px-3.5 py-2 font-mono text-[11.5px] text-text"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => { setOpen(false); onConfirm() }}
                className="rounded-lg border-2 border-red-500 bg-red-500 px-3.5 py-2 font-mono text-[11.5px] text-white"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
