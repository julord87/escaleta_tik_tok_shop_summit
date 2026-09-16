import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DayCalendarPicker } from '../components/DayCalendarPicker'
import { supabase } from '../lib/supabase'
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

  if (loading) return <div className="mx-auto max-w-[1040px] px-5 py-16 text-[13px] text-text-dim">Cargando escaleta…</div>
  if (!project) return <div className="mx-auto max-w-[1040px] px-5 py-16 text-[13px] text-text-dim">Este enlace no está disponible.</div>

  return (
    <div className="mx-auto max-w-[1040px] px-5 pb-16">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border py-6">
        <div>
          <img src="/smartworks-logo.png" alt="Smartworks" className="mb-1.5 h-3.5 w-auto opacity-80" />
          <p className="font-mono text-[11px] uppercase tracking-wide text-text-faint">Escaleta técnica · solo lectura</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-text sm:text-3xl">{project.name}</h1>
        </div>
        <div className="text-right font-mono text-xs leading-relaxed text-text-dim"><div className="font-semibold text-text">{project.event}</div><div>{project.venue}</div><div>{project.dates}</div></div>
      </header>
      <section className="mt-8">
        <DayCalendarPicker days={days} selectedId={selectedDay?.id ?? null} onSelect={setSelectedDayId} />
        {selectedDay && <div className="mt-4">
          <div className="flex flex-wrap items-center gap-3"><span className="rounded bg-text px-2.5 py-1 font-mono text-[11px] font-semibold text-white">{selectedDay.num || 'DÍA'}</span><h2 className="text-xl font-bold tracking-tight text-text">{selectedDay.title}</h2><span className="ml-auto font-mono text-[11.5px] text-text-faint">{selectedDay.date}</span></div>
          {selectedDay.description && <p className="mt-1.5 max-w-[64ch] text-[13.5px] text-text-dim">{selectedDay.description}</p>}
          <div className="mt-4 flex flex-col divide-y divide-border border-t border-border">
            {selectedDay.lanes.map((lane) => <div key={lane.id} className="flex flex-col gap-2 py-4 sm:flex-row sm:gap-6"><div className="sm:w-40"><span className="text-[13.5px] font-semibold text-text">{lane.room}</span><span className="block font-mono text-[10px] uppercase tracking-wide text-text-faint">{lane.floor}</span></div><div className="flex flex-1 flex-col">{lane.tasks.map((task) => <div key={task.id} className={`flex gap-3 border-b border-border py-2.5 last:border-b-0 ${task.variant === 'accent' ? 'border-l-[3px] border-l-text bg-surface-2 pl-3' : ''}`}><span className="w-16 shrink-0 font-mono text-[11px] text-text-dim">{task.time_label}</span><div><p className="text-[13px] leading-snug text-text">{task.what}</p><p className="font-mono text-[10px] tracking-wide text-text-faint">{[task.meta, task.who].filter(Boolean).join(' · ')}</p>{task.note && <p className="mt-1 text-[11.5px] italic text-text-dim">{task.note}</p>}</div></div>)}</div></div>)}
          </div>
        </div>}
      </section>
      <section className="mt-12"><h2 className="text-xl font-bold tracking-tight text-text">Pendientes</h2><div className="mt-3 divide-y divide-border border-t border-border">{openItems.filter((item) => !item.checked).map((item) => <div key={item.id} className="py-3"><p className="text-[13px] text-text-dim">{item.label}</p><p className="font-mono text-[10px] text-text-faint">{item.who}</p></div>)}</div></section>
      <section className="mt-12 grid grid-cols-1 gap-8 border-t border-border pt-8 sm:grid-cols-2"><div><h2 className="text-xl font-bold tracking-tight text-text">Crew</h2>{crew.map((panel) => <div key={panel.id} className="mt-4"><h3 className="text-sm font-bold">{panel.room}</h3><p className="font-mono text-[10px] text-text-faint">{panel.crew_text}</p>{panel.items.map((item) => <p key={item} className="text-[12.5px] text-text-dim">{item}</p>)}</div>)}</div><div><h2 className="text-xl font-bold tracking-tight text-text">Contactos</h2>{contacts.map((contact) => <div key={contact.id} className="mt-4"><p className="font-mono text-[10px] text-text-faint">{contact.role}</p><p className="text-sm font-bold">{contact.name}</p>{contact.lines.map((line) => <p key={line} className="font-mono text-[11px] text-text-dim">{line}</p>)}</div>)}</div></section>
    </div>
  )
}
