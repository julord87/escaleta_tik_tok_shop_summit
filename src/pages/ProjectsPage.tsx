import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { useProjects } from '../lib/useProjects'
import { DeleteButton } from '../components/DeleteButton'

export function ProjectsPage() {
  const { profile, signOut } = useAuth()
  const { projects, loading, createProject, deleteProject } = useProjects()
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [event, setEvent] = useState('')
  const [venue, setVenue] = useState('')
  const [dates, setDates] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function onCreate(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    const { error } = await createProject({ name, event, venue, dates })
    setBusy(false)
    if (error) { setError(error); return }
    setShowForm(false)
    setName(''); setEvent(''); setVenue(''); setDates('')
  }

  return (
    <div className="mx-auto max-w-[720px] px-5 pb-16">
      <header className="flex items-center justify-between border-b border-border py-6">
        <div>
          <img src="/smartworks-logo.png" alt="Smartworks" className="mb-1.5 h-4 w-auto" />
          <h1 className="text-2xl font-extrabold tracking-tight text-text">Tus proyectos</h1>
        </div>
        <button onClick={signOut} className="font-mono text-xs text-text-dim underline">
          {profile?.full_name || profile?.email} · salir
        </button>
      </header>

      <div className="mt-5">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="rounded-lg bg-text px-4 py-2 font-mono text-[12.5px] text-white"
          >
            + Nuevo proyecto
          </button>
        ) : (
          <form onSubmit={onCreate} className="flex flex-col gap-2.5 border-b border-border pb-5">
            <input required placeholder="Nombre del proyecto" value={name} onChange={(e) => setName(e.target.value)}
              className="rounded-lg border border-border px-3 py-2 text-[13px]" />
            <input placeholder="Evento" value={event} onChange={(e) => setEvent(e.target.value)}
              className="rounded-lg border border-border px-3 py-2 text-[13px]" />
            <input placeholder="Venue" value={venue} onChange={(e) => setVenue(e.target.value)}
              className="rounded-lg border border-border px-3 py-2 text-[13px]" />
            <input placeholder="Fechas (ej: Montaje 21.SEP · Evento 22.SEP)" value={dates} onChange={(e) => setDates(e.target.value)}
              className="rounded-lg border border-border px-3 py-2 text-[13px]" />
            {error && <p className="text-[12.5px] text-red-600">{error}</p>}
            <div className="flex gap-2">
              <button type="submit" disabled={busy} className="rounded-lg bg-text px-3.5 py-2 font-mono text-[11.5px] text-white">Crear</button>
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border-2 border-border-strong px-3.5 py-2 font-mono text-[11.5px] text-text">Cancelar</button>
            </div>
          </form>
        )}
      </div>

      <div className="mt-2 flex flex-col divide-y divide-border">
        {loading && <p className="py-6 text-[13px] text-text-dim">Cargando...</p>}
        {!loading && projects.length === 0 && (
          <p className="py-6 text-[13px] text-text-dim">Todavia no tenes proyectos.</p>
        )}
        {projects.map(({ project, role }) => (
          <Link key={project.id} to={`/projects/${project.id}`} className="flex items-center justify-between py-4">
            <div>
              <div className="text-[14px] font-semibold text-text">{project.name}</div>
              <div className="font-mono text-[11px] text-text-faint">{project.event || project.venue}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase ${role === 'admin' ? 'bg-text text-white' : 'border-[2.5px] border-border-strong text-text-dim'}`}>
                {role}
              </span>
              {role === 'admin' && (
                <DeleteButton
                  itemLabel={project.name}
                  confirmText="Eliminar proyecto (borra dias, tareas, pendientes, crew y contactos)"
                  onConfirm={() => deleteProject(project.id)}
                />
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
