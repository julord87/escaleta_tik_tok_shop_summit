import { useCallback, useEffect, useState } from 'react'
import { supabase } from './supabase'
import type { Project, Role } from '../types/db'
import { useAuth } from './AuthContext'

export interface ProjectWithRole {
  project: Project
  role: Role
}

export function useProjects() {
  const { user } = useAuth()
  const [projects, setProjects] = useState<ProjectWithRole[]>([])
  const [loading, setLoading] = useState(true)

  const reload = useCallback(async () => {
    if (!user) {
      setProjects([])
      setLoading(false)
      return
    }
    setLoading(true)
    const { data, error } = await supabase
      .from('project_members')
      .select('role, project:projects(*)')
      .eq('user_id', user.id)

    if (!error && data) {
      const rows = (data as unknown as { role: Role; project: Project }[])
        .filter((r) => r.project)
        .map((r) => ({ project: r.project, role: r.role }))
      rows.sort((a, b) => b.project.created_at.localeCompare(a.project.created_at))
      setProjects(rows)
    }
    setLoading(false)
  }, [user])

  useEffect(() => {
    reload()
  }, [reload])

  async function createProject(input: { name: string; event: string; venue: string; dates: string }) {
    const { data, error } = await supabase.rpc('create_project', {
      p_name: input.name,
      p_event: input.event,
      p_venue: input.venue,
      p_dates: input.dates,
    })
    if (!error) await reload()
    return { id: data as string | null, error: error?.message ?? null }
  }

  return { projects, loading, reload, createProject }
}
