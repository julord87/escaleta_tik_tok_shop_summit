import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { useProjectData, type TrashedTask } from '../lib/useProjectData'
import { DayCalendarPicker } from '../components/DayCalendarPicker'
import { TaskRow, profileLabel } from '../components/TaskRow'
import { ConfirmModal } from '../components/ConfirmModal'
import { DeleteButton } from '../components/DeleteButton'
import { PublicShareButton } from '../components/PublicShareButton'
import { chronologicalTasks } from '../lib/schedule'
import type { DbTask, Role, TaskVariant } from '../types/db'

interface Pending {
  kind: 'task' | 'open'
  id: string
  label: string
  mode: 'check' | 'uncheck'
}

export function ProjectPage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const data = useProjectData(id)
  const {
    project, members, myRole, days, openItems, crew, contacts, trashedTasks, loading,
    toggleTask, toggleOpenItem,
    addDay, deleteDay, addLane, deleteLane, addTask, deleteTask, restoreTask,
    updateTask,
    addOpenItem, deleteOpenItem, addCrewPanel, deleteCrewPanel, addContact, deleteContact,
    addMemberByEmail, updateMemberRole, removeMember,
    setPublicShare,
  } = data

  const isAdmin = myRole === 'admin'
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null)
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all')
  const [pending, setPending] = useState<Pending | null>(null)
  const [showMembers, setShowMembers] = useState(false)
  const [showTrash, setShowTrash] = useState(false)
  const [showAddDay, setShowAddDay] = useState(false)
  const [showStructure, setShowStructure] = useState(false)
  const [editingTask, setEditingTask] = useState<DbTask | null>(null)

  const selectedDay = useMemo(
    () => days.find((d) => d.id === selectedDayId) ?? days[0] ?? null,
    [days, selectedDayId],
  )

  function profileById(uid: string | null) {
    return members.find((m) => m.user_id === uid)?.profile ?? null
  }

  function canCheckTask(t: DbTask) {
    return isAdmin || t.assigned_to === user?.id
  }

  function requestToggleTask(t: DbTask, next: boolean) {
    if (!canCheckTask(t)) return
    setPending({ kind: 'task', id: t.id, label: t.what, mode: next ? 'check' : 'uncheck' })
  }
  function requestToggleOpen(item: { id: string; label: string; assigned_to: string | null }, next: boolean) {
    if (!(isAdmin || item.assigned_to === user?.id)) return
    setPending({ kind: 'open', id: item.id, label: item.label, mode: next ? 'check' : 'uncheck' })
  }

  async function confirmPending(note: string) {
    if (!pending) return
    if (pending.kind === 'task') await toggleTask(pending.id, pending.mode === 'check', note)
    else await toggleOpenItem(pending.id, pending.mode === 'check', note)
    setPending(null)
  }

  const currentNote = (() => {
    if (!pending) return ''
    if (pending.kind === 'task') {
      for (const d of days) for (const l of d.lanes) {
        const t = l.tasks.find((t) => t.id === pending.id)
        if (t) return t.note
      }
      return ''
    }
    return openItems.find((o) => o.id === pending.id)?.note ?? ''
  })()

  if (loading && !project) {
    return <div className="mx-auto max-w-[1040px] px-5 py-16 text-[13px] text-text-dim">Cargando proyecto...</div>
  }
  if (!project) {
    return <div className="mx-auto max-w-[1040px] px-5 py-16 text-[13px] text-text-dim">No tenes acceso a este proyecto.</div>
  }

  const filteredOpenItems = assigneeFilter === 'all' ? openItems : openItems.filter((o) => o.assigned_to === assigneeFilter)
  const orderedTasks = chronologicalTasks(selectedDay, assigneeFilter === 'all' ? undefined : assigneeFilter)

  return (
    <div className="mx-auto max-w-[1040px] px-5 pb-16">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border py-6">
        <div>
          <img src="/smartworks-logo.png" alt="Smartworks" className="mb-1.5 h-3.5 w-auto opacity-80" />
          <Link to="/projects" className="font-mono text-[11px] uppercase tracking-wide text-text-faint">← Proyectos</Link>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-text sm:text-3xl">{project.name}</h1>
        </div>
        <div className="text-right font-mono text-xs leading-relaxed text-text-dim">
          <div className="font-semibold text-text">{project.event}</div>
          <div>{project.venue}</div>
          <div>{project.dates}</div>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-2 border-b border-border py-3.5">
        <span className={`rounded-full px-3 py-1.5 font-mono text-[11.5px] ${isAdmin ? 'bg-text text-white' : 'border-[2.5px] border-border-strong text-text-dim'}`}>
          {myRole}
        </span>
        <select
          value={assigneeFilter}
          onChange={(e) => setAssigneeFilter(e.target.value)}
          className="rounded-full border-[2.5px] border-border-strong bg-surface px-3 py-1.5 font-mono text-[11.5px] text-text-dim"
        >
          <option value="all">Todos los responsables</option>
          {members.map((m) => (
            <option key={m.user_id} value={m.user_id}>{profileLabel(m.profile) ?? m.user_id}</option>
          ))}
        </select>
        {isAdmin && (
          <div className="ml-auto flex gap-2">
            <PublicShareButton enabled={project.public_share_enabled} onSetEnabled={setPublicShare} />
            <button onClick={() => setShowTrash((s) => !s)} className="rounded-full border-[2.5px] border-border-strong px-3 py-1.5 font-mono text-[11.5px] text-text-dim">
              Papelera{trashedTasks.length > 0 ? ` (${trashedTasks.length})` : ''}
            </button>
            <button onClick={() => setShowMembers((s) => !s)} className="rounded-full border-[2.5px] border-border-strong px-3 py-1.5 font-mono text-[11.5px] text-text-dim">
              Miembros
            </button>
          </div>
        )}
      </div>

      {isAdmin && showTrash && (
        <TrashPanel tasks={trashedTasks} onRestore={restoreTask} />
      )}

      {isAdmin && showMembers && (
        <MembersPanel members={members} onAdd={addMemberByEmail} onRole={updateMemberRole} onRemove={removeMember} />
      )}

      <section className="mt-8">
        <DayCalendarPicker days={days} selectedId={selectedDay?.id ?? null} onSelect={setSelectedDayId} />

        {isAdmin && (
          <div className="pt-3">
            {!showAddDay ? (
              <button onClick={() => setShowAddDay(true)} className="font-mono text-[11.5px] text-text-dim underline">+ agregar dia</button>
            ) : (
              <AddDayForm onCancel={() => setShowAddDay(false)} onSubmit={async (v) => { await addDay(v); setShowAddDay(false) }} />
            )}
          </div>
        )}

        {selectedDay && (
          <div className="mt-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded bg-text px-2.5 py-1 font-mono text-[11px] font-semibold text-white">{selectedDay.num || 'DIA'}</span>
              <h2 className="text-xl font-bold tracking-tight text-text">{selectedDay.title}</h2>
              <span className="ml-auto font-mono text-[11.5px] text-text-faint">{selectedDay.date}</span>
              {isAdmin && (
                <DeleteButton itemLabel={`Eliminar el dia "${selectedDay.title || selectedDay.num}" y todo su contenido`} onConfirm={() => deleteDay(selectedDay.id)} />
              )}
            </div>
            {selectedDay.description && <p className="mt-1.5 max-w-[64ch] text-[13.5px] text-text-dim">{selectedDay.description}</p>}

            {isAdmin && <div className="mt-3"><button type="button" onClick={() => setShowStructure((value) => !value)} className="font-mono text-[10.5px] text-text-faint underline">{showStructure ? 'Volver a orden cronológico' : 'Editar estructura por sala'}</button></div>}

            {!showStructure && <div className="mt-4 overflow-hidden border border-border-strong">
              <div className="hidden bg-surface-2 sm:grid sm:grid-cols-[110px_170px_minmax(0,1fr)]">
                <span className="border-r border-border-strong px-3 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-text-dim">Hora</span>
                <span className="border-r border-border-strong px-3 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-text-dim">Espacio</span>
                <span className="px-3 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-text-dim">Actividad</span>
              </div>
              {orderedTasks.map(({ lane, task }, index) => <div key={task.id} className={`grid sm:grid-cols-[110px_170px_minmax(0,1fr)] ${index > 0 ? 'border-t border-border' : ''}`}>
                <span className="border-b border-border px-3 py-3 font-mono text-[11px] font-semibold tabular-nums text-text sm:border-b-0 sm:border-r sm:border-border-strong">{task.time_label || '—'}</span>
                <span className="border-b border-border px-3 py-2.5 font-mono text-[10px] font-bold uppercase leading-relaxed tracking-wide text-text sm:border-b-0 sm:border-r sm:border-border-strong">{lane.room}<br /><span className="font-normal text-text-faint">{lane.floor}</span></span>
                <div className="flex items-start gap-2 px-3 py-3"><div className="flex-1"><TaskRow task={task} showTime={false} contained canCheck={canCheckTask(task)} assigneeName={profileLabel(profileById(task.assigned_to))} onToggle={requestToggleTask} /></div>{isAdmin && <><EditTaskButton onClick={() => setEditingTask(task)} /><DeleteButton itemLabel={task.what} confirmText="Eliminar tarea (se puede restaurar desde la papelera)" onConfirm={() => deleteTask(task.id)} /></>}</div>
              </div>)}
            </div>}

            {showStructure && <div className="mt-4 flex flex-col divide-y divide-border border-t border-border">
              {selectedDay.lanes.map((lane) => {
                const tasks = assigneeFilter === 'all' ? lane.tasks : lane.tasks.filter((t) => t.assigned_to === assigneeFilter)
                if (assigneeFilter !== 'all' && tasks.length === 0) return null
                return (
                  <div key={lane.id} className="flex flex-col gap-2 py-4 sm:flex-row sm:gap-6">
                    <div className="flex shrink-0 flex-row items-baseline justify-between gap-2 sm:w-40 sm:flex-col sm:items-start sm:justify-start">
                      <span className="text-[13.5px] font-semibold text-text">{lane.room}</span>
                      <span className="font-mono text-[10px] uppercase tracking-wide text-text-faint">{lane.floor}</span>
                      {isAdmin && (
                        <DeleteButton itemLabel={`Eliminar la sala "${lane.room}" y sus tareas`} onConfirm={() => deleteLane(lane.id)} className="self-start" />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col">
                      {tasks.map((t) => (
                        <div key={t.id} className="flex items-start gap-2">
                          <div className="flex-1">
                            <TaskRow task={t} canCheck={canCheckTask(t)} assigneeName={profileLabel(profileById(t.assigned_to))} onToggle={requestToggleTask} />
                          </div>
                          {isAdmin && (
                            <div className="mt-2 flex items-center gap-1"><EditTaskButton onClick={() => setEditingTask(t)} /><DeleteButton itemLabel={t.what} confirmText="Eliminar tarea (se puede restaurar desde la papelera)" onConfirm={() => deleteTask(t.id)} /></div>
                          )}
                        </div>
                      ))}
                      {isAdmin && <AddTaskForm members={members} onSubmit={(v) => addTask(lane.id, v)} />}
                    </div>
                  </div>
                )
              })}
            </div>}
            {isAdmin && showStructure && <AddLaneForm onSubmit={(v) => addLane(selectedDay.id, v)} />}
          </div>
        )}
      </section>

      <section className="mt-13">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold tracking-tight text-text">Pendientes</h2>
        </div>
        <div className="mt-4 flex flex-col divide-y divide-border border-t border-border">
          {filteredOpenItems.map((item) => (
            <label key={item.id} className={`flex items-start gap-3 py-3.5 ${isAdmin || item.assigned_to === user?.id ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'}`}>
              <input
                type="checkbox"
                checked={item.checked}
                disabled={!(isAdmin || item.assigned_to === user?.id)}
                onChange={(e) => requestToggleOpen(item, e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-[2.5px] border-border-strong accent-text"
              />
              <span className={`text-[13px] leading-relaxed ${item.checked ? 'text-text-faint line-through' : 'text-text-dim'}`}>
                {item.label}
                <span className="ml-1.5 font-mono text-[10.5px] text-text-faint">
                  {[item.who, profileLabel(profileById(item.assigned_to))].filter(Boolean).join(' · ')}
                </span>
              </span>
              {isAdmin && (
                <DeleteButton itemLabel={item.label} onConfirm={() => deleteOpenItem(item.id)} className="ml-auto" />
              )}
            </label>
          ))}
        </div>
        {isAdmin && <AddOpenItemForm members={members} onSubmit={addOpenItem} />}
      </section>

      <section className="mt-13">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold tracking-tight text-text">Crew</h2>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-6 divide-y divide-border sm:grid-cols-3 sm:gap-8 sm:divide-y-0">
          {crew.map((panel) => (
            <div key={panel.id} className="pt-4 sm:border-l sm:border-border sm:pl-6 sm:pt-0 sm:first:border-l-0 sm:first:pl-0">
              <h3 className="text-sm font-bold text-text">{panel.room}</h3>
              {panel.warn ? (
                <span className="mb-2.5 mt-1 inline-block rounded-full bg-yellow px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-yellow-contrast">{panel.crew_text}</span>
              ) : (
                <div className="mb-2.5 mt-0.5 font-mono text-[11px] text-text-faint">{panel.crew_text}</div>
              )}
              <ul className="flex flex-col gap-1.5">
                {panel.items.map((item) => (
                  <li key={item} className="relative pl-3.5 text-[12.5px] leading-snug text-text-dim before:absolute before:left-0 before:top-[7px] before:h-1 before:w-1 before:bg-border-strong">{item}</li>
                ))}
              </ul>
              {isAdmin && <DeleteButton itemLabel={`Eliminar panel "${panel.room}"`} onConfirm={() => deleteCrewPanel(panel.id)} className="mt-1" />}
            </div>
          ))}
        </div>
        {isAdmin && <AddCrewForm onSubmit={addCrewPanel} />}
      </section>

      <section className="mt-13 border-t border-border pt-8">
        <h2 className="mb-4 text-xl font-bold tracking-tight text-text">Contactos</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {contacts.map((c) => (
            <div key={c.id} className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[2.5px] border-border-strong font-bold text-[12.5px] text-text">{c.initial}</div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wide text-text-faint">{c.role}</div>
                <div className="mb-1 text-[15px] font-bold text-text">{c.name}</div>
                {c.lines.map((line) => <div key={line} className="font-mono text-xs text-text-dim">{line}</div>)}
                {isAdmin && <DeleteButton itemLabel={`Eliminar contacto "${c.name}"`} onConfirm={() => deleteContact(c.id)} className="mt-1" />}
              </div>
            </div>
          ))}
        </div>
        {isAdmin && <AddContactForm onSubmit={addContact} />}
      </section>

      <ConfirmModal
        open={pending !== null}
        taskLabel={pending?.label ?? ''}
        mode={pending?.mode ?? 'check'}
        initialNote={currentNote}
        onConfirm={confirmPending}
        onCancel={() => setPending(null)}
      />
      {editingTask && <EditTaskModal task={editingTask} members={members} onCancel={() => setEditingTask(null)} onSubmit={async (values) => { await updateTask(editingTask.id, values); setEditingTask(null) }} />}
    </div>
  )
}

// ---- small admin forms ----

function TrashPanel({ tasks, onRestore }: { tasks: TrashedTask[]; onRestore: (id: string) => void }) {
  return (
    <div className="border-b border-border py-4">
      <h3 className="mb-2 font-mono text-[11px] uppercase tracking-wide text-text-faint">Tareas eliminadas</h3>
      {tasks.length === 0 ? (
        <p className="text-[12.5px] text-text-dim">La papelera esta vacia.</p>
      ) : (
        <div className="flex flex-col divide-y divide-border">
          {tasks.map((t) => (
            <div key={t.id} className="flex items-start gap-3 py-2.5">
              <span className="flex-1">
                <span className="block text-[13px] leading-snug text-text-dim line-through decoration-text-faint">{t.what}</span>
                <span className="block font-mono text-[10px] text-text-faint">
                  {[t.dayTitle, t.laneRoom].filter(Boolean).join(' · ')}
                </span>
              </span>
              <button
                type="button"
                onClick={() => onRestore(t.id)}
                className="shrink-0 rounded-lg border-2 border-border-strong px-3 py-1.5 font-mono text-[11px] text-text"
              >
                Restaurar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function MembersPanel({ members, onAdd, onRole, onRemove }: {
  members: { user_id: string; role: Role; profile?: { full_name: string | null; email: string | null } }[]
  onAdd: (email: string, role: Role) => Promise<{ error: string | null }>
  onRole: (userId: string, role: Role) => void
  onRemove: (userId: string) => void
}) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<Role>('colaborador')
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="border-b border-border py-4">
      <h3 className="mb-2 font-mono text-[11px] uppercase tracking-wide text-text-faint">Miembros del proyecto</h3>
      <div className="flex flex-col divide-y divide-border">
        {members.map((m) => (
          <div key={m.user_id} className="flex items-center gap-3 py-2">
            <span className="flex-1 text-[13px] text-text">{m.profile?.full_name || m.profile?.email}</span>
            <select value={m.role} onChange={(e) => onRole(m.user_id, e.target.value as Role)} className="rounded border border-border px-2 py-1 font-mono text-[11px]">
              <option value="admin">admin</option>
              <option value="colaborador">colaborador</option>
            </select>
            <button onClick={() => onRemove(m.user_id)} className="font-mono text-[10.5px] text-red-500 underline">quitar</button>
          </div>
        ))}
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const res = await onAdd(email, role)
          if (res.error) setError(res.error)
          else { setEmail(''); setError(null) }
        }}
        className="mt-3 flex flex-wrap items-center gap-2"
      >
        <input required type="email" placeholder="email del trabajador" value={email} onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-lg border border-border px-3 py-1.5 text-[12.5px]" />
        <select value={role} onChange={(e) => setRole(e.target.value as Role)} className="rounded-lg border border-border px-2 py-1.5 font-mono text-[11px]">
          <option value="colaborador">colaborador</option>
          <option value="admin">admin</option>
        </select>
        <button type="submit" className="rounded-lg bg-text px-3 py-1.5 font-mono text-[11px] text-white">Agregar</button>
      </form>
      {error && <p className="mt-1.5 text-[12px] text-red-600">{error}</p>}
    </div>
  )
}

function AddDayForm({ onSubmit, onCancel }: { onSubmit: (v: { num: string; title: string; date: string; description: string }) => void; onCancel: () => void }) {
  const [num, setNum] = useState('')
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ num, title, date, description }) }} className="flex flex-wrap items-center gap-2">
      <input required placeholder="DIA 1" value={num} onChange={(e) => setNum(e.target.value)} className="w-24 rounded-lg border border-border px-2 py-1.5 text-[12.5px]" />
      <input required placeholder="Titulo" value={title} onChange={(e) => setTitle(e.target.value)} className="flex-1 rounded-lg border border-border px-2 py-1.5 text-[12.5px]" />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-lg border border-border px-2 py-1.5 text-[12.5px]" />
      <input placeholder="Descripcion" value={description} onChange={(e) => setDescription(e.target.value)} className="flex-1 rounded-lg border border-border px-2 py-1.5 text-[12.5px]" />
      <button type="submit" className="rounded-lg bg-text px-3 py-1.5 font-mono text-[11px] text-white">Agregar</button>
      <button type="button" onClick={onCancel} className="font-mono text-[11px] text-text-dim">cancelar</button>
    </form>
  )
}

function AddLaneForm({ onSubmit }: { onSubmit: (v: { room: string; floor: string }) => void }) {
  const [show, setShow] = useState(false)
  const [room, setRoom] = useState('')
  const [floor, setFloor] = useState('')
  if (!show) return <button onClick={() => setShow(true)} className="mt-3 font-mono text-[11.5px] text-text-dim underline">+ agregar sala</button>
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ room, floor }); setShow(false); setRoom(''); setFloor('') }} className="mt-3 flex flex-wrap gap-2">
      <input required placeholder="Sala" value={room} onChange={(e) => setRoom(e.target.value)} className="rounded-lg border border-border px-2 py-1.5 text-[12.5px]" />
      <input placeholder="Planta / detalle" value={floor} onChange={(e) => setFloor(e.target.value)} className="rounded-lg border border-border px-2 py-1.5 text-[12.5px]" />
      <button type="submit" className="rounded-lg bg-text px-3 py-1.5 font-mono text-[11px] text-white">Agregar</button>
    </form>
  )
}

function AddTaskForm({ members, onSubmit }: {
  members: { user_id: string; profile?: { full_name: string | null; email: string | null } }[]
  onSubmit: (v: { time_label: string; what: string; meta: string; who: string; variant: TaskVariant; assigned_to: string | null }) => void
}) {
  const [show, setShow] = useState(false)
  const [time_label, setTime] = useState('')
  const [what, setWhat] = useState('')
  const [meta, setMeta] = useState('')
  const [who, setWho] = useState('')
  const [variant, setVariant] = useState<TaskVariant>('normal')
  const [assigned_to, setAssigned] = useState('')
  if (!show) return <button onClick={() => setShow(true)} className="mt-2 self-start font-mono text-[11px] text-text-dim underline">+ tarea</button>
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit({ time_label, what, meta, who, variant, assigned_to: assigned_to || null }); setShow(false); setTime(''); setWhat(''); setMeta(''); setWho(''); setVariant('normal'); setAssigned('') }}
      className="mt-2 flex flex-wrap items-center gap-2 border-t border-border pt-2"
    >
      <input required placeholder="Hora" value={time_label} onChange={(e) => setTime(e.target.value)} className="w-20 rounded-lg border border-border px-2 py-1.5 text-[12px]" />
      <input required placeholder="Tarea" value={what} onChange={(e) => setWhat(e.target.value)} className="min-w-[180px] flex-1 rounded-lg border border-border px-2 py-1.5 text-[12px]" />
      <input placeholder="Proveedor" value={meta} onChange={(e) => setMeta(e.target.value)} className="rounded-lg border border-border px-2 py-1.5 text-[12px]" />
      <input placeholder="Responsable (si no es de Smartworks)" value={who} onChange={(e) => setWho(e.target.value)} className="rounded-lg border border-border px-2 py-1.5 text-[12px]" />
      <select value={variant} onChange={(e) => setVariant(e.target.value as TaskVariant)} className="rounded-lg border border-border px-2 py-1.5 font-mono text-[11px]">
        <option value="normal">normal</option>
        <option value="accent">accent</option>
        <option value="quiet">quiet</option>
      </select>
      <select value={assigned_to} onChange={(e) => setAssigned(e.target.value)} className="rounded-lg border border-border px-2 py-1.5 font-mono text-[11px]">
        <option value="">sin asignar (Smartworks)</option>
        {members.map((m) => <option key={m.user_id} value={m.user_id}>{m.profile?.full_name || m.profile?.email}</option>)}
      </select>
      <button type="submit" className="rounded-lg bg-text px-3 py-1.5 font-mono text-[11px] text-white">Agregar</button>
    </form>
  )
}

function EditTaskButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Editar tarea"
      title="Editar tarea"
      className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-border text-text-dim transition-colors duration-150 hover:border-border-strong hover:bg-surface-2 hover:text-text focus:outline-none focus:ring-2 focus:ring-text focus:ring-offset-2 active:scale-95"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-[1.8]">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
      </svg>
    </button>
  )
}

function EditTaskModal({ task, members, onCancel, onSubmit }: {
  task: DbTask
  members: { user_id: string; profile?: { full_name: string | null; email: string | null } }[]
  onCancel: () => void
  onSubmit: (v: Pick<DbTask, 'time_label' | 'what' | 'meta' | 'who' | 'note' | 'variant' | 'assigned_to'>) => Promise<void>
}) {
  const [time_label, setTime] = useState(task.time_label ?? '')
  const [what, setWhat] = useState(task.what)
  const [meta, setMeta] = useState(task.meta ?? '')
  const [who, setWho] = useState(task.who ?? '')
  const [note, setNote] = useState(task.note ?? '')
  const [variant, setVariant] = useState<TaskVariant>(task.variant)
  const [assigned_to, setAssigned] = useState(task.assigned_to ?? '')
  const [saving, setSaving] = useState(false)
  const fieldClass = 'w-full rounded-md border border-border-strong bg-surface px-3 py-2 text-[13px] text-text outline-none transition-colors duration-150 focus:border-text focus:ring-2 focus:ring-text/15'

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setSaving(true)
    await onSubmit({ time_label, what, meta, who, note, variant, assigned_to: assigned_to || null })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/30 p-3 sm:items-center sm:justify-center" role="dialog" aria-modal="true" aria-labelledby="edit-task-title">
      <form onSubmit={submit} className="w-full max-w-xl border border-border-strong bg-surface p-5 shadow-xl sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-text-faint">Administración</p>
            <h3 id="edit-task-title" className="mt-1 text-lg font-bold text-text">Editar tarea</h3>
          </div>
          <button type="button" onClick={onCancel} className="h-9 px-2 font-mono text-[11px] text-text-dim underline">Cancelar</button>
        </div>
        <div className="grid gap-3 sm:grid-cols-[110px_1fr]">
          <Field label="Hora"><input required value={time_label} onChange={(e) => setTime(e.target.value)} className={fieldClass} /></Field>
          <Field label="Tarea"><input required value={what} onChange={(e) => setWhat(e.target.value)} className={fieldClass} /></Field>
          <Field label="Proveedor"><input value={meta} onChange={(e) => setMeta(e.target.value)} className={fieldClass} /></Field>
          <Field label="Responsable"><input value={who} onChange={(e) => setWho(e.target.value)} className={fieldClass} /></Field>
          <Field label="Asignar"><select value={assigned_to} onChange={(e) => setAssigned(e.target.value)} className={fieldClass}><option value="">Sin asignar</option>{members.map((m) => <option key={m.user_id} value={m.user_id}>{m.profile?.full_name || m.profile?.email}</option>)}</select></Field>
          <Field label="Énfasis"><select value={variant} onChange={(e) => setVariant(e.target.value as TaskVariant)} className={fieldClass}><option value="normal">Normal</option><option value="accent">Destacada</option><option value="quiet">Secundaria</option></select></Field>
          <div className="sm:col-span-2"><Field label="Notas"><textarea value={note} onChange={(e) => setNote(e.target.value)} rows={4} className={`${fieldClass} resize-y`} /></Field></div>
        </div>
        <div className="mt-6 flex justify-end gap-2 border-t border-border pt-4">
          <button type="button" onClick={onCancel} className="rounded-md px-3 py-2 font-mono text-[11px] text-text-dim">Cancelar</button>
          <button disabled={saving} type="submit" className="rounded-md bg-text px-4 py-2 font-mono text-[11px] font-semibold text-white disabled:opacity-60">{saving ? 'Guardando…' : 'Guardar cambios'}</button>
        </div>
      </form>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="flex flex-col gap-1.5"><span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-text-faint">{label}</span>{children}</label>
}

function AddOpenItemForm({ members, onSubmit }: {
  members: { user_id: string; profile?: { full_name: string | null; email: string | null } }[]
  onSubmit: (v: { label: string; who: string; assigned_to: string | null }) => void
}) {
  const [label, setLabel] = useState('')
  const [who, setWho] = useState('')
  const [assigned_to, setAssigned] = useState('')
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit({ label, who, assigned_to: assigned_to || null }); setLabel(''); setWho(''); setAssigned('') }}
      className="mt-3 flex flex-wrap items-center gap-2"
    >
      <input required placeholder="Pendiente" value={label} onChange={(e) => setLabel(e.target.value)} className="min-w-[220px] flex-1 rounded-lg border border-border px-2 py-1.5 text-[12.5px]" />
      <input placeholder="Quien" value={who} onChange={(e) => setWho(e.target.value)} className="rounded-lg border border-border px-2 py-1.5 text-[12.5px]" />
      <select value={assigned_to} onChange={(e) => setAssigned(e.target.value)} className="rounded-lg border border-border px-2 py-1.5 font-mono text-[11px]">
        <option value="">sin asignar</option>
        {members.map((m) => <option key={m.user_id} value={m.user_id}>{m.profile?.full_name || m.profile?.email}</option>)}
      </select>
      <button type="submit" className="rounded-lg bg-text px-3 py-1.5 font-mono text-[11px] text-white">Agregar</button>
    </form>
  )
}

function AddCrewForm({ onSubmit }: { onSubmit: (v: { room: string; crew_text: string; warn: boolean; items: string[] }) => void }) {
  const [room, setRoom] = useState('')
  const [crewText, setCrewText] = useState('')
  const [items, setItems] = useState('')
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit({ room, crew_text: crewText, warn: false, items: items.split(',').map((s) => s.trim()).filter(Boolean) }); setRoom(''); setCrewText(''); setItems('') }}
      className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-3"
    >
      <input required placeholder="Sala" value={room} onChange={(e) => setRoom(e.target.value)} className="rounded-lg border border-border px-2 py-1.5 text-[12.5px]" />
      <input placeholder="Nota de crew" value={crewText} onChange={(e) => setCrewText(e.target.value)} className="rounded-lg border border-border px-2 py-1.5 text-[12.5px]" />
      <input placeholder="Items separados por coma" value={items} onChange={(e) => setItems(e.target.value)} className="min-w-[200px] flex-1 rounded-lg border border-border px-2 py-1.5 text-[12.5px]" />
      <button type="submit" className="rounded-lg bg-text px-3 py-1.5 font-mono text-[11px] text-white">Agregar</button>
    </form>
  )
}

function AddContactForm({ onSubmit }: { onSubmit: (v: { initial: string; role: string; name: string; lines: string[] }) => void }) {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [lines, setLines] = useState('')
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit({ initial: name.charAt(0).toUpperCase(), role, name, lines: lines.split(',').map((s) => s.trim()).filter(Boolean) }); setName(''); setRole(''); setLines('') }}
      className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-3"
    >
      <input required placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} className="rounded-lg border border-border px-2 py-1.5 text-[12.5px]" />
      <input placeholder="Rol / empresa" value={role} onChange={(e) => setRole(e.target.value)} className="rounded-lg border border-border px-2 py-1.5 text-[12.5px]" />
      <input placeholder="Email, telefono (coma)" value={lines} onChange={(e) => setLines(e.target.value)} className="min-w-[200px] flex-1 rounded-lg border border-border px-2 py-1.5 text-[12.5px]" />
      <button type="submit" className="rounded-lg bg-text px-3 py-1.5 font-mono text-[11px] text-white">Agregar</button>
    </form>
  )
}
