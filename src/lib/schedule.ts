import type { DayWithLanes } from './useProjectData'
import type { DbTask } from '../types/db'

export interface TimedTask {
  lane: { id: string; room: string | null; floor: string | null }
  task: DbTask
}

function timeRank(label: string | null) {
  const value = (label ?? '').toLowerCase()
  const match = value.match(/(\d{1,2})[:h](\d{2})?/) 
  if (match) return Number(match[1]) * 60 + Number(match[2] ?? 0)
  if (value.includes('mañana') || value.includes('manana')) return 8 * 60
  if (value.includes('tarde')) return 14 * 60
  if (value.includes('noche')) return 19 * 60
  if (value.includes('post')) return 24 * 60
  return 23 * 60 + 59
}

export function chronologicalTasks(day: DayWithLanes | null, assigneeId?: string) {
  if (!day) return [] as TimedTask[]
  return day.lanes
    .flatMap((lane, laneIndex) => lane.tasks.map((task, taskIndex) => ({ lane, task, laneIndex, taskIndex })))
    .filter(({ task }) => !assigneeId || task.assigned_to === assigneeId)
    .sort((a, b) => timeRank(a.task.time_label) - timeRank(b.task.time_label) || a.laneIndex - b.laneIndex || a.taskIndex - b.taskIndex)
    .map(({ lane, task }) => ({ lane, task }))
}
