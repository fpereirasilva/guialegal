import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { useAdmin } from '../../hooks/useAdmin'

export default function AdminLogin() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState(false)
  const { login, isLoggedIn } = useAdmin()
  const navigate = useNavigate()

  if (isLoggedIn) {
    navigate('/admin/dashboard', { replace: true })
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(user, pass)) {
      navigate('/admin/dashboard')
    } else {
      setError(true)
    }
  }

  return (
    <div className="min-h-[70dvh] flex flex-col items-center justify-center">
      <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
        <Lock size={28} className="text-gray-500" />
      </div>
      <h2 className="text-lg font-bold text-gray-900 mb-1">Painel Admin</h2>
      <p className="text-xs text-gray-500 mb-6">Acesso restrito a administradores</p>

      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-3">
        <input
          type="text"
          value={user}
          onChange={e => { setUser(e.target.value); setError(false) }}
          placeholder="Usuário"
          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <input
          type="password"
          value={pass}
          onChange={e => { setPass(e.target.value); setError(false) }}
          placeholder="Senha"
          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        {error && <p className="text-xs text-red-500 text-center">Usuário ou senha incorretos</p>}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2.5 rounded-xl font-medium text-sm hover:bg-primary-dark transition"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}
