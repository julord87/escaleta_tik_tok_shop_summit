import type { DbTask, Profile } from '../types/db'

interface Props {
  task: DbTask
  showTime?: boolean
  canCheck: boolean
  assigneeName: string | null
  onToggle: (task: DbTask, next: boolean) => void
}

export function TaskRow({ task, showTime = true, canCheck, assigneeName, onToggle }: Props) {
  const isAccent = task.variant === 'accent'
  const isQuiet = task.variant === 'quiet'

  return (
    <label
      className={`flex items-start gap-3 border-b border-border py-2.5 last:border-b-0 ${
        isAccent ? 'bg-surface-2 border-l-[3px] border-l-text pl-3' : ''
      } ${canCheck ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'}`}
      title={canCheck ? undefined : 'Solo el responsable asignado o un admin puede marcar esta tarea'}
    >
      <input
        type="checkbox"
        checked={task.checked}
        disabled={!canCheck}
        onChange={(e) => onToggle(task, e.target.checked)}
        className="mt-0.5 h-[15px] w-[15px] shrink-0 cursor-pointer rounded border-[2.5px] border-border-strong accent-text disabled:cursor-not-allowed"
      />
      {showTime && <span className={`w-12 shrink-0 font-mono text-[11px] tabular-nums ${isAccent ? 'font-bold text-text' : isQuiet ? 'text-text-faint' : 'text-text-dim'}`}>
        {task.time_label}
      </span>}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className={`text-[13px] leading-snug ${task.checked ? 'text-text-faint line-through' : isQuiet ? 'text-text-dim' : 'text-text'}`}>
          {task.what}
        </span>
        <span className="flex flex-wrap items-center gap-x-2 font-mono text-[10px] tracking-wide text-text-faint">
          {task.meta && <span>{task.meta}</span>}
          {(assigneeName || task.who) && (
            <span className="text-text-dim">
              <span className="text-text-faint">resp.</span> {assigneeName || task.who}
            </span>
          )}
        </span>
        {task.note && (
          <span className="mt-0.5 rounded-r bg-surface-2 border-l-2 border-border-strong px-2 py-0.5 text-[11.5px] italic text-text-dim">
            {task.note}
          </span>
        )}
      </span>
    </label>
  )
}

export function profileLabel(p?: Profile | null) {
  if (!p) return null
  return p.full_name || p.email || null
}
