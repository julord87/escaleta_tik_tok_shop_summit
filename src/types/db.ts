export type Role = 'admin' | 'colaborador'
export type TaskVariant = 'normal' | 'accent' | 'quiet'

export interface Profile {
  id: string
  email: string | null
  full_name: string | null
}

export interface Project {
  id: string
  name: string
  event: string | null
  venue: string | null
  dates: string | null
  created_by: string | null
  created_at: string
}

export interface ProjectMember {
  project_id: string
  user_id: string
  role: Role
  profile?: Profile
}

export interface Day {
  id: string
  project_id: string
  num: string | null
  title: string | null
  date: string | null // ISO yyyy-mm-dd
  description: string | null
  sort_order: number
}

export interface Lane {
  id: string
  day_id: string
  room: string | null
  floor: string | null
  sort_order: number
}

export interface DbTask {
  id: string
  lane_id: string
  time_label: string | null
  what: string
  meta: string | null
  who: string | null
  variant: TaskVariant
  assigned_to: string | null
  sort_order: number
  checked: boolean
  note: string
  checked_by: string | null
  checked_at: string | null
  deleted_at: string | null
}

export interface OpenItem {
  id: string
  project_id: string
  label: string
  who: string | null
  assigned_to: string | null
  checked: boolean
  note: string
  checked_by: string | null
  checked_at: string | null
  sort_order: number
}

export interface CrewPanelRow {
  id: string
  project_id: string
  room: string | null
  crew_text: string | null
  warn: boolean
  items: string[]
  sort_order: number
}

export interface ContactRow {
  id: string
  project_id: string
  initial: string | null
  role: string | null
  name: string | null
  lines: string[]
  sort_order: number
}
