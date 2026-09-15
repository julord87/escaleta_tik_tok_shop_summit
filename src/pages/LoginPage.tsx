import { useState } from 'react'
import { useAuth } from '../lib/AuthContext'

export function LoginPage() {
  const { signIn, signUp } = useAuth()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setInfo(null)
    setBusy(true)
    if (mode === 'login') {
      const { error } = await signIn(email, password)
      if (error) setError(error)
    } else {
      const { error } = await signUp(email, password, fullName)
      if (error) setError(error)
      else setInfo('Cuenta creada. Ya podes iniciar sesion.')
    }
    setBusy(false)
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-[380px] flex-col justify-center px-5">
      <img src="/smartworks-logo.png" alt="Smartworks" className="mb-4 h-[22px] w-auto" />
      <h1 className="mb-1 text-2xl font-extrabold tracking-tight text-text">Escaleta AV</h1>
      <p className="mb-6 font-mono text-[11.5px] text-text-faint">produccion tecnica</p>

      <div className="mb-5 flex gap-1 border-b border-border">
        {(['login', 'signup'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => { setMode(m); setError(null); setInfo(null) }}
            className={`px-1 pb-2 font-mono text-xs uppercase tracking-wide ${
              mode === m ? 'border-b-2 border-text text-text' : 'text-text-faint'
            }`}
          >
            {m === 'login' ? 'Entrar' : 'Crear cuenta'}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        {mode === 'signup' && (
          <div>
            <label className="mb-1 block font-mono text-[10.5px] uppercase tracking-wide text-text-faint">Nombre</label>
            <input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-[13px] text-text focus:outline-none focus:ring-2 focus:ring-text"
            />
          </div>
        )}
        <div>
          <label className="mb-1 block font-mono text-[10.5px] uppercase tracking-wide text-text-faint">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-[13px] text-text focus:outline-none focus:ring-2 focus:ring-text"
          />
        </div>
        <div>
          <label className="mb-1 block font-mono text-[10.5px] uppercase tracking-wide text-text-faint">Contrasena</label>
          <input
            required
            type="password"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-[13px] text-text focus:outline-none focus:ring-2 focus:ring-text"
          />
        </div>

        {error && <p className="text-[12.5px] text-red-600">{error}</p>}
        {info && <p className="text-[12.5px] text-text-dim">{info}</p>}

        <button
          type="submit"
          disabled={busy}
          className="mt-2 rounded-lg bg-text px-4 py-2.5 font-mono text-[12.5px] text-white disabled:opacity-50"
        >
          {mode === 'login' ? 'Entrar' : 'Crear cuenta'}
        </button>
      </form>
    </div>
  )
}
