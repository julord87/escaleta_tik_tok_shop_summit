import { useEffect, useMemo, useRef, useState } from 'react'
import type { DayWithLanes } from '../lib/useProjectData'

interface Props {
  days: DayWithLanes[]
  selectedId: string | null
  onSelect: (id: string) => void
}

const WEEKDAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
const MONTHS_SHORT = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']
const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

function parseYMD(s: string) {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function DayCalendarPicker({ days, selectedId, onSelect }: Props) {
  const datedDays = days.filter((d) => d.date)
  const undatedDays = days.filter((d) => !d.date)
  const selectedDay = days.find((d) => d.id === selectedId) ?? null

  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  const initialMonth = useMemo(() => {
    const base = selectedDay?.date ? parseYMD(selectedDay.date) : datedDays[0]?.date ? parseYMD(datedDays[0].date!) : new Date()
    return new Date(base.getFullYear(), base.getMonth(), 1)
  }, [selectedDay?.date, datedDays])

  const [cursor, setCursor] = useState(initialMonth)

  useEffect(() => {
    if (open) setCursor(initialMonth)
  }, [open, initialMonth])

  useEffect(() => {
    if (!open) return
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const dayByDate = new Map<string, DayWithLanes>()
  for (const d of datedDays) dayByDate.set(d.date!, d)

  const firstOfMonth = new Date(cursor.getFullYear(), cursor.getMonth(), 1)
  const startWeekday = (firstOfMonth.getDay() + 6) % 7 // Monday = 0
  const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate()

  const cells: (number | null)[] = [...Array(startWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]
  while (cells.length % 7 !== 0) cells.push(null)

  function iso(day: number) {
    const mm = String(cursor.getMonth() + 1).padStart(2, '0')
    const dd = String(day).padStart(2, '0')
    return `${cursor.getFullYear()}-${mm}-${dd}`
  }

  const triggerLabel = selectedDay
    ? selectedDay.date
      ? `${selectedDay.num || 'DIA'} · ${parseYMD(selectedDay.date).getDate()} ${MONTHS_SHORT[parseYMD(selectedDay.date).getMonth()]}`
      : selectedDay.num || selectedDay.title || 'Dia'
    : 'Elegir dia'

  return (
    <div ref={wrapRef} className="relative inline-block border-b border-border pb-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-full border-[2.5px] border-border-strong px-3 py-1.5 font-mono text-[11.5px] text-text-dim"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        {triggerLabel}
        <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>⌄</span>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-1.5 w-[240px] rounded-xl border border-border bg-surface p-3 shadow-lg">
          <div className="mb-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
              className="rounded px-1.5 py-0.5 font-mono text-xs text-text-dim hover:bg-surface-2"
            >
              ←
            </button>
            <span className="font-mono text-[10.5px] uppercase tracking-wide text-text-dim">
              {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
            </span>
            <button
              type="button"
              onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
              className="rounded px-1.5 py-0.5 font-mono text-xs text-text-dim hover:bg-surface-2"
            >
              →
            </button>
          </div>

          <div className="grid grid-cols-7 gap-0.5 text-center">
            {WEEKDAYS.map((w) => (
              <div key={w} className="font-mono text-[9px] text-text-faint">{w}</div>
            ))}
            {cells.map((day, i) => {
              if (day === null) return <div key={i} />
              const dateStr = iso(day)
              const match = dayByDate.get(dateStr)
              const isSelected = match?.id === selectedId
              return (
                <button
                  key={i}
                  type="button"
                  disabled={!match}
                  onClick={() => { if (match) { onSelect(match.id); setOpen(false) } }}
                  title={match?.title ?? undefined}
                  className={`relative flex aspect-square items-center justify-center rounded-md font-mono text-[10.5px] ${
                    isSelected
                      ? 'bg-text font-semibold text-white'
                      : match
                        ? 'font-semibold text-text hover:bg-surface-2'
                        : 'text-text-faint/40 cursor-default'
                  }`}
                >
                  {day}
                  {match && !isSelected && (
                    <span className="absolute bottom-[3px] h-[3px] w-[3px] rounded-full bg-border-strong" />
                  )}
                </button>
              )
            })}
          </div>

          {undatedDays.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1 border-t border-border pt-2.5">
              {undatedDays.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => { onSelect(d.id); setOpen(false) }}
                  className={`rounded-full border-2 px-2 py-0.5 font-mono text-[10px] ${
                    d.id === selectedId ? 'border-text bg-text text-white' : 'border-border-strong text-text-dim'
                  }`}
                >
                  {d.num || d.title || 'Sin fecha'}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
