import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { chronologicalTasks } from '../lib/schedule'
import type { ContactRow, CrewPanelRow, Day, DbTask, Lane, OpenItem, Project } from '../types/db'
import type { DayWithLanes, LaneWithTasks } from '../lib/useProjectData'

export function PublicProjectPage() {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [days, setDays] = useState<DayWithLanes[]>([])
  const [openItems, setOpenItems] = useState<OpenItem[]>([])
  const [crew, setCrew] = useState<CrewPanelRow[]>([])
  const [contacts, setContacts] = useState<ContactRow[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null)

  const reload = useCallback(async () => {
    if (!id) return
    setLoading(true)
    const [proj, daysRes, lanesRes, tasksRes, openRes, crewRes, contactsRes] = await Promise.all([
      supabase.from('projects').select('*').eq('id', id).eq('public_share_enabled', true).maybeSingle(),
      supabase.from('days').select('*').eq('project_id', id).order('sort_order'),
      supabase.from('lanes').select('*, days!inner(project_id)').eq('days.project_id', id).order('sort_order'),
      supabase.from('tasks').select('*, lanes!inner(day_id, days!inner(project_id))').eq('lanes.days.project_id', id).order('sort_order'),
      supabase.from('open_items').select('*').eq('project_id', id).order('sort_order'),
      supabase.from('crew_panels').select('*').eq('project_id', id).order('sort_order'),
      supabase.from('contacts').select('*').eq('project_id', id).order('sort_order'),
    ])
    setProject(proj.data ?? null)
    const lanesByDay = new Map<string, LaneWithTasks[]>()
    for (const lane of (lanesRes.data as (Lane & Record<string, unknown>)[]) ?? []) {
      const item: LaneWithTasks = { id: lane.id, day_id: lane.day_id, room: lane.room, floor: lane.floor, sort_order: lane.sort_order, tasks: [] }
      if (!lanesByDay.has(lane.day_id)) lanesByDay.set(lane.day_id, [])
      lanesByDay.get(lane.day_id)!.push(item)
    }
    const laneById = new Map<string, LaneWithTasks>()
    for (const laneList of lanesByDay.values()) for (const lane of laneList) laneById.set(lane.id, lane)
    for (const task of (tasksRes.data as DbTask[]) ?? []) {
      if (!task.deleted_at) laneById.get(task.lane_id)?.tasks.push(task)
    }
    setDays(((daysRes.data as Day[]) ?? []).map((day) => ({ ...day, lanes: lanesByDay.get(day.id) ?? [] })))
    setOpenItems((openRes.data as OpenItem[]) ?? [])
    setCrew((crewRes.data as CrewPanelRow[]) ?? [])
    setContacts((contactsRes.data as ContactRow[]) ?? [])
    setLoading(false)
  }, [id])

  useEffect(() => { reload() }, [reload])
  const selectedDay = useMemo(() => days.find((day) => day.id === selectedDayId) ?? days[0] ?? null, [days, selectedDayId])
  const orderedTasks = useMemo(() => chronologicalTasks(selectedDay), [selectedDay])

  if (loading) return <div className="mx-auto max-w-[1040px] px-5 py-16 text-[13px] text-text-dim">Cargando escaleta…</div>
  if (!project) return <div className="mx-auto max-w-[1040px] px-5 py-16 text-[13px] text-text-dim">Este enlace no está disponible.</div>

  return (
    <div className="mx-auto max-w-[1240px] px-5 pb-16">
      <header className="border-b-2 border-text pt-7">
        <div className="flex flex-wrap items-start justify-between gap-5 pb-5">
          <div>
            <img src="/smartworks-logo.png" alt="Smartworks" className="mb-4 h-3.5 w-auto opacity-80" />
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-text-faint">Escaleta técnica · solo lectura</p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">{project.name}</h1>
          </div>
          <div className="border-l-2 border-text pl-4 font-mono text-[11px] leading-relaxed text-text-dim sm:text-right">
            <div className="font-semibold uppercase tracking-wide text-text">{project.event}</div>
            <div>{project.venue}</div><div>{project.dates}</div>
          </div>
        </div>
        <div className="grid border-t border-border sm:grid-cols-3">
          {[["LECTURA", "Orden cronológico"], ["ACCESO", "Enlace de consulta"], ["ESTADO", "Actualizado en tiempo real"]].map(([label, value]) => <div key={label} className="border-b border-border px-3 py-2.5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"><span className="block font-mono text-[9px] uppercase tracking-[0.12em] text-text-faint">{label}</span><span className="text-[12px] font-semibold text-text">{value}</span></div>)}
        </div>
      </header>
      <section className="pt-7">
        <div className="flex flex-wrap gap-2 border-b border-border pb-4">
          {days.map((day) => <button key={day.id} type="button" onClick={() => setSelectedDayId(day.id)} className={`border-2 px-3 py-2 text-left ${selectedDay?.id === day.id ? 'border-text bg-text text-white' : 'border-border-strong text-text-dim'}`}><span className="block font-mono text-[9px] uppercase tracking-wide opacity-70">{day.num || 'DÍA'}</span><span className="block text-[12px] font-bold">{day.title || day.date}</span></button>)}
        </div>
        {selectedDay && <div className="mt-6">
          <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-faint">Programa</p><h2 className="text-2xl font-extrabold tracking-tight text-text">{selectedDay.title}</h2></div><span className="font-mono text-[11px] text-text-faint">{selectedDay.date}</span></div>
          {selectedDay.description && <p className="mt-2 max-w-[70ch] text-[13px] text-text-dim">{selectedDay.description}</p>}
          <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1fr)_290px]">
            <div className="border-t-2 border-text">
              {orderedTasks.length === 0 ? <p className="py-5 text-[13px] text-text-dim">Todavía no hay actividades cargadas para este día.</p> : orderedTasks.map(({ lane, task }) => <article key={task.id} className={`grid gap-x-3 border-b border-border py-3 sm:grid-cols-[74px_126px_minmax(0,1fr)] ${task.variant === 'accent' ? 'border-l-[3px] border-text pl-3' : ''}`}><time className="font-mono text-[11px] font-bold tabular-nums text-text">{task.time_label || '—'}</time><div className="border-l-2 border-border-strong pl-2 font-mono text-[9px] font-bold uppercase leading-relaxed tracking-[0.1em] text-text">{lane.room}<br /><span className="font-normal text-text-faint">{lane.floor}</span></div><div><h3 className={`text-[13px] leading-snug ${task.checked ? 'text-text-faint line-through' : task.variant === 'accent' ? 'font-bold text-text' : 'font-semibold text-text'}`}>{task.what}</h3>{(task.meta || task.who) && <p className="mt-0.5 font-mono text-[10px] text-text-faint">{[task.meta, task.who].filter(Boolean).join(' · ')}</p>}{task.note && <p className="mt-1 border-l-2 border-border-strong pl-2 text-[11.5px] italic text-text-dim">{task.note}</p>}</div></article>)}
            </div>
            <aside className="space-y-7 lg:sticky lg:top-5 lg:self-start">
              <Panel title="Pendientes" count={openItems.filter((item) => !item.checked).length}>{openItems.filter((item) => !item.checked).map((item) => <div key={item.id} className="border-b border-border py-2.5 last:border-b-0"><p className="text-[12px] leading-snug text-text">{item.label}</p>{item.who && <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wide text-text-faint">{item.who}</p>}</div>)}</Panel>
              <Panel title="Crew">{crew.map((panel) => <div key={panel.id} className="border-b border-border py-2.5 last:border-b-0"><p className="text-[11px] font-bold text-text">{panel.room}</p><p className="font-mono text-[9px] text-text-faint">{panel.crew_text}</p>{panel.items.map((item) => <p key={item} className="mt-1 text-[11px] leading-snug text-text-dim">{item}</p>)}</div>)}</Panel>
              <Panel title="Contactos">{contacts.map((contact) => <div key={contact.id} className="border-b border-border py-2.5 last:border-b-0"><p className="font-mono text-[9px] uppercase tracking-wide text-text-faint">{contact.role}</p><p className="text-[12px] font-bold text-text">{contact.name}</p>{contact.lines.map((line) => <p key={line} className="font-mono text-[10px] text-text-dim">{line}</p>)}</div>)}</Panel>
            </aside>
          </div>
        </div>}
      </section>
    </div>
  )
}

function Panel({ title, count, children }: { title: string; count?: number; children: React.ReactNode }) {
  return <section><div className="flex items-baseline justify-between border-b-2 border-text pb-1.5"><h2 className="text-[13px] font-extrabold uppercase tracking-wide text-text">{title}</h2>{typeof count === 'number' && <span className="font-mono text-[10px] text-text-faint">{count}</span>}</div>{children}</section>
}
