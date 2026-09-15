import { useCallback, useEffect, useState } from 'react'
import { supabase } from './supabase'
import { useAuth } from './AuthContext'
import type {
  Project,
  ProjectMember,
  Day,
  Lane,
  DbTask,
  OpenItem,
  CrewPanelRow,
  ContactRow,
  Role,
  TaskVariant,
} from '../types/db'

export interface LaneWithTasks extends Lane {
  tasks: DbTask[]
}
export interface DayWithLanes extends Day {
  lanes: LaneWithTasks[]
}
export interface TrashedTask extends DbTask {
  laneRoom: string | null
  dayTitle: string | null
}

export function useProjectData(projectId: string | undefined) {
  const { user } = useAuth()
  const [project, setProject] = useState<Project | null>(null)
  const [members, setMembers] = useState<ProjectMember[]>([])
  const [days, setDays] = useState<DayWithLanes[]>([])
  const [trashedTasks, setTrashedTasks] = useState<TrashedTask[]>([])
  const [openItems, setOpenItems] = useState<OpenItem[]>([])
  const [crew, setCrew] = useState<CrewPanelRow[]>([])
  const [contacts, setContacts] = useState<ContactRow[]>([])
  const [loading, setLoading] = useState(true)

  const myRole = members.find((m) => m.user_id === user?.id)?.role ?? null

  const reload = useCallback(async () => {
    if (!projectId) return
    setLoading(true)

    const [proj, mem, daysRes, lanesRes, tasksRes, openRes, crewRes, contactsRes] = await Promise.all([
      supabase.from('projects').select('*').eq('id', projectId).maybeSingle(),
      supabase.from('project_members').select('*, profile:profiles(*)').eq('project_id', projectId),
      supabase.from('days').select('*').eq('project_id', projectId).order('sort_order'),
      supabase.from('lanes').select('*, days!inner(project_id)').eq('days.project_id', projectId).order('sort_order'),
      supabase
        .from('tasks')
        .select('*, lanes!inner(day_id, days!inner(project_id))')
        .eq('lanes.days.project_id', projectId)
        .order('sort_order'),
      supabase.from('open_items').select('*').eq('project_id', projectId).order('sort_order'),
      supabase.from('crew_panels').select('*').eq('project_id', projectId).order('sort_order'),
      supabase.from('contacts').select('*').eq('project_id', projectId).order('sort_order'),
    ])

    setProject(proj.data ?? null)
    setMembers((mem.data as unknown as ProjectMember[]) ?? [])

    const lanesByDay = new Map<string, LaneWithTasks[]>()
    for (const l of (lanesRes.data as (Lane & Record<string, unknown>)[]) ?? []) {
      const lane: LaneWithTasks = { id: l.id, day_id: l.day_id, room: l.room, floor: l.floor, sort_order: l.sort_order, tasks: [] }
      if (!lanesByDay.has(l.day_id)) lanesByDay.set(l.day_id, [])
      lanesByDay.get(l.day_id)!.push(lane)
    }
    const laneById = new Map<string, LaneWithTasks>()
    for (const arr of lanesByDay.values()) for (const l of arr) laneById.set(l.id, l)
    const dayByLaneId = new Map<string, DayWithLanes>()
    const trashed: TrashedTask[] = []
    for (const t of (tasksRes.data as (DbTask & Record<string, unknown>)[]) ?? []) {
      const lane = laneById.get(t.lane_id)
      if (t.deleted_at) {
        trashed.push({ ...t, laneRoom: lane?.room ?? null, dayTitle: null })
      } else if (lane) {
        lane.tasks.push(t)
      }
    }
    const dayList: DayWithLanes[] = ((daysRes.data as Day[]) ?? []).map((d) => ({
      ...d,
      lanes: lanesByDay.get(d.id) ?? [],
    }))
    for (const d of dayList) for (const l of d.lanes) dayByLaneId.set(l.id, d)
    for (const t of trashed) t.dayTitle = dayByLaneId.get(t.lane_id)?.title ?? null
    trashed.sort((a, b) => (b.deleted_at ?? '').localeCompare(a.deleted_at ?? ''))
    setDays(dayList)
    setTrashedTasks(trashed)
    setOpenItems((openRes.data as OpenItem[]) ?? [])
    setCrew((crewRes.data as CrewPanelRow[]) ?? [])
    setContacts((contactsRes.data as ContactRow[]) ?? [])
    setLoading(false)
  }, [projectId])

  useEffect(() => {
    reload()
  }, [reload])

  useEffect(() => {
    if (!projectId) return
    const channel = supabase
      .channel(`project_${projectId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, reload)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'open_items' }, reload)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'days' }, reload)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'lanes' }, reload)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'project_members' }, reload)
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [projectId, reload])

  // --- checkbox actions (admin + colaborador-own, enforced server-side by RPC) ---
  async function toggleTask(taskId: string, checked: boolean, note: string) {
    await supabase.rpc('set_task_state', { p_task_id: taskId, p_checked: checked, p_note: note })
  }
  async function toggleOpenItem(id: string, checked: boolean, note: string) {
    await supabase.rpc('set_open_item_state', { p_item_id: id, p_checked: checked, p_note: note })
  }

  // --- admin structure actions ---
  async function addDay(input: { num: string; title: string; date: string; description: string }) {
    if (!projectId) return
    await supabase.from('days').insert({ project_id: projectId, sort_order: days.length, ...input })
    await reload()
  }
  async function deleteDay(id: string) {
    await supabase.from('days').delete().eq('id', id)
    await reload()
  }
  async function addLane(dayId: string, input: { room: string; floor: string }) {
    const day = days.find((d) => d.id === dayId)
    await supabase.from('lanes').insert({ day_id: dayId, sort_order: day?.lanes.length ?? 0, ...input })
    await reload()
  }
  async function deleteLane(id: string) {
    await supabase.from('lanes').delete().eq('id', id)
    await reload()
  }
  async function addTask(
    laneId: string,
    input: { time_label: string; what: string; meta: string; who: string; variant: TaskVariant; assigned_to: string | null },
  ) {
    await supabase.from('tasks').insert({ lane_id: laneId, ...input })
    await reload()
  }
  async function updateTask(id: string, input: Partial<Pick<DbTask, 'time_label' | 'what' | 'meta' | 'who' | 'variant' | 'assigned_to'>>) {
    await supabase.from('tasks').update(input).eq('id', id)
    await reload()
  }
  async function deleteTask(id: string) {
    await supabase.from('tasks').update({ deleted_at: new Date().toISOString() }).eq('id', id)
    await reload()
  }
  async function restoreTask(id: string) {
    await supabase.from('tasks').update({ deleted_at: null }).eq('id', id)
    await reload()
  }
  async function addOpenItem(input: { label: string; who: string; assigned_to: string | null }) {
    if (!projectId) return
    await supabase.from('open_items').insert({ project_id: projectId, sort_order: openItems.length, ...input })
    await reload()
  }
  async function deleteOpenItem(id: string) {
    await supabase.from('open_items').delete().eq('id', id)
    await reload()
  }
  async function addCrewPanel(input: { room: string; crew_text: string; warn: boolean; items: string[] }) {
    if (!projectId) return
    await supabase.from('crew_panels').insert({ project_id: projectId, sort_order: crew.length, ...input })
    await reload()
  }
  async function deleteCrewPanel(id: string) {
    await supabase.from('crew_panels').delete().eq('id', id)
    await reload()
  }
  async function addContact(input: { initial: string; role: string; name: string; lines: string[] }) {
    if (!projectId) return
    await supabase.from('contacts').insert({ project_id: projectId, sort_order: contacts.length, ...input })
    await reload()
  }
  async function deleteContact(id: string) {
    await supabase.from('contacts').delete().eq('id', id)
    await reload()
  }

  // --- member management (admin only, enforced by RLS) ---
  async function addMemberByEmail(email: string, role: Role) {
    if (!projectId) return { error: 'no project' }
    const { data: prof, error: profErr } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .maybeSingle()
    if (profErr || !prof) return { error: 'No existe una cuenta con ese email todavia' }
    const { error } = await supabase.from('project_members').insert({ project_id: projectId, user_id: prof.id, role })
    if (!error) await reload()
    return { error: error?.message ?? null }
  }
  async function updateMemberRole(userId: string, role: Role) {
    if (!projectId) return
    await supabase.from('project_members').update({ role }).eq('project_id', projectId).eq('user_id', userId)
    await reload()
  }
  async function removeMember(userId: string) {
    if (!projectId) return
    await supabase.from('project_members').delete().eq('project_id', projectId).eq('user_id', userId)
    await reload()
  }

  return {
    project,
    members,
    myRole,
    days,
    openItems,
    crew,
    contacts,
    trashedTasks,
    loading,
    reload,
    toggleTask,
    toggleOpenItem,
    addDay,
    deleteDay,
    addLane,
    deleteLane,
    addTask,
    updateTask,
    deleteTask,
    restoreTask,
    addOpenItem,
    deleteOpenItem,
    addCrewPanel,
    deleteCrewPanel,
    addContact,
    deleteContact,
    addMemberByEmail,
    updateMemberRole,
    removeMember,
  }
}
