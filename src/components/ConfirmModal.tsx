import { useEffect, useState } from 'react'

interface Props {
  open: boolean
  taskLabel: string
  mode: 'check' | 'uncheck'
  initialNote: string
  onConfirm: (note: string) => void
  onCancel: () => void
}

export function ConfirmModal({ open, taskLabel, mode, initialNote, onConfirm, onCancel }: Props) {
  const [note, setNote] = useState(initialNote)

  useEffect(() => {
    if (open) setNote(initialNote)
  }, [open, initialNote])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onCancel()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-text/50 p-5"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel()
      }}
    >
      <div className="w-full max-w-[420px] rounded-2xl bg-surface p-5 shadow-xl">
        <div className="mb-1.5 font-mono text-[10px] uppercase tracking-wide text-text-faint">
          {mode === 'check' ? 'Confirmar tarea' : 'Desmarcar tarea'}
        </div>
        <div className="mb-3.5 text-sm font-semibold leading-snug text-text">{taskLabel}</div>

        {mode === 'check' && (
          <div className="mb-4">
            <label className="mb-1 block font-mono text-[10.5px] uppercase tracking-wide text-text-faint">
              Comentario (opcional)
            </label>
            <textarea
              autoFocus
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ej: probado con AV, senal estable"
              className="w-full resize-y rounded-lg border border-border bg-surface-2 px-2.5 py-2 text-[13px] text-text focus:outline-none focus:ring-2 focus:ring-text"
            />
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border-2 border-border-strong bg-surface px-3.5 py-2 font-mono text-[11.5px] text-text"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => onConfirm(note.trim())}
            className="rounded-lg border-2 border-text bg-text px-3.5 py-2 font-mono text-[11.5px] text-white"
          >
            {mode === 'check' ? 'Marcar como hecha' : 'Desmarcar'}
          </button>
        </div>
      </div>
    </div>
  )
}
