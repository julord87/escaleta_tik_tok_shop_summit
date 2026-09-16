import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './lib/AuthContext'
import { LoginPage } from './pages/LoginPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { ProjectPage } from './pages/ProjectPage'
import { PublicProjectPage } from './pages/PublicProjectPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="p-8 text-[13px] text-text-dim">Cargando...</div>
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function App() {
  const { user, loading } = useAuth()

  return (
    <Routes>
      <Route path="/p/:id" element={<PublicProjectPage />} />
      <Route path="/login" element={loading ? null : user ? <Navigate to="/projects" replace /> : <LoginPage />} />
      <Route path="/projects" element={<ProtectedRoute><ProjectsPage /></ProtectedRoute>} />
      <Route path="/projects/:id" element={<ProtectedRoute><ProjectPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/projects" replace />} />
    </Routes>
  )
}

export default App
