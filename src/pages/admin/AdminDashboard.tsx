import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Edit2, Trash2, LogOut, MapPin, Calendar } from 'lucide-react'
import { useAdmin } from '../../hooks/useAdmin'

type Tab = 'places' | 'events'

export default function AdminDashboard() {
  const { isLoggedIn, logout, places, events, deletePlace, deleteEvent } = useAdmin()
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('places')

  if (!isLoggedIn) {
    navigate('/admin', { replace: true })
    return null
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Painel Admin</h2>
        <button onClick={() => { logout(); navigate('/admin') }} className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500">
          <LogOut size={14} /> Sair
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab('places')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition ${
            tab === 'places' ? 'bg-primary text-white' : 'bg-white text-gray-600 border border-gray-200'
          }`}
        >
          <MapPin size={14} /> Lugares ({places.length})
        </button>
        <button
          onClick={() => setTab('events')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition ${
            tab === 'events' ? 'bg-primary text-white' : 'bg-white text-gray-600 border border-gray-200'
          }`}
        >
          <Calendar size={14} /> Eventos ({events.length})
        </button>
      </div>

      {/* Add Button */}
      <button
        onClick={() => navigate(tab === 'places' ? '/admin/lugar/novo' : '/admin/evento/novo')}
        className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white py-2.5 rounded-xl font-medium text-sm mb-4 hover:bg-emerald-600 transition"
      >
        <Plus size={16} /> Adicionar {tab === 'places' ? 'Lugar' : 'Evento'}
      </button>

      {/* List */}
      {tab === 'places' && (
        <div className="space-y-2">
          {places.map(p => (
            <div key={p.id} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-100">
              <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-medium text-gray-900 truncate">{p.name}</h4>
                <p className="text-[10px] text-gray-400">{p.city === 'iguape' ? 'Iguape' : 'Ilha Comprida'} · {p.subcategory}</p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button
                  onClick={() => navigate(`/admin/lugar/${p.id}`)}
                  className="p-1.5 text-gray-400 hover:text-primary rounded-lg hover:bg-sky-50"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => { if (confirm('Excluir este lugar?')) deletePlace(p.id) }}
                  className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'events' && (
        <div className="space-y-2">
          {events.map(e => (
            <div key={e.id} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-100">
              <img src={e.image} alt={e.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-medium text-gray-900 truncate">{e.title}</h4>
                <p className="text-[10px] text-gray-400">
                  {new Date(e.date + 'T00:00:00').toLocaleDateString('pt-BR')} · {e.city === 'iguape' ? 'Iguape' : 'Ilha Comprida'}
                </p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button
                  onClick={() => navigate(`/admin/evento/${e.id}`)}
                  className="p-1.5 text-gray-400 hover:text-primary rounded-lg hover:bg-sky-50"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => { if (confirm('Excluir este evento?')) deleteEvent(e.id) }}
                  className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
