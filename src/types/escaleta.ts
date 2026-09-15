export type TaskVariant = 'normal' | 'accent' | 'quiet'

export interface EscaletaTask {
  id: string
  time: string
  what: string
  meta: string
  variant?: TaskVariant
}

export interface EscaletaLane {
  room: string
  floor: string
  tasks: EscaletaTask[]
}

export interface EscaletaDay {
  num: string
  title: string
  date: string
  description: string
  lanes: EscaletaLane[]
}

export interface CrewPanel {
  room: string
  crew: string | { warn: string }
  items: string[]
}

export interface OpenItem {
  id: string
  label: string
  who: string
}

export interface Contact {
  initial: string
  role: string
  name: string
  lines: string[]
}

export interface TaskState {
  checked: boolean
  note: string
}
