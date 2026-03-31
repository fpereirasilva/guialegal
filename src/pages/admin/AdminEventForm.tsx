import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { useAdmin } from '../../hooks/useAdmin'
import type { Event, City } from '../../types'

const eventCategories = ['Festas', 'Shows', 'Cultura', 'Feiras', 'Esportes']

export default function AdminEventForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { events, addEvent, updateEvent, isLoggedIn } = useAdmin()
  const isEdit = id && id !== 'novo'

  const existing = isEdit ? events.find(e => e.id === id) : null

  const [form, setForm] = useState<Omit<Event, 'id'>>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    city: 'iguape',
    image: 'https://placehold.co/600x400/8b5cf6/white?text=Novo+Evento',
    category: 'Festas',
  })

  useEffect(() => {
    if (existing) {
      setForm({ ...existing })
    }
  }, [existing])

  if (!isLoggedIn) {
    navigate('/admin', { replace: true })
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isEdit && id) {
      updateEvent({ ...form, id })
    } else {
      addEvent({ ...form, id: 'e' + Date.now() })
    }
    navigate('/admin/dashboard')
  }

  const fieldClass = "w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate(-1)} className="p-1.5 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-bold text-gray-900">{isEdit ? 'Editar Evento' : 'Novo Evento'}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          required
          type="text"
          placeholder="Título do evento *"
          value={form.title}
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          className={fieldClass}
        />

        <textarea
          required
          placeholder="Descrição *"
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          rows={3}
          className={fieldClass}
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            required
            type="date"
            value={form.date}
            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            className={fieldClass}
          />
          <input
            required
            type="time"
            value={form.time}
            onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
            className={fieldClass}
          />
        </div>

        <input
          required
          type="text"
          placeholder="Local *"
          value={form.location}
          onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
          className={fieldClass}
        />

        <div className="grid grid-cols-2 gap-3">
          <select
            value={form.city}
            onChange={e => setForm(f => ({ ...f, city: e.target.value as City }))}
            className={fieldClass}
          >
            <option value="iguape">Iguape</option>
            <option value="ilha-comprida">Ilha Comprida</option>
          </select>

          <select
            value={form.category}
            onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            className={fieldClass}
          >
            {eventCategories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <input
          type="url"
          placeholder="URL da imagem"
          value={form.image}
          onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
          className={fieldClass}
        />

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-medium text-sm hover:bg-primary-dark transition"
        >
          <Save size={16} /> {isEdit ? 'Salvar Alterações' : 'Cadastrar Evento'}
        </button>
      </form>
    </div>
  )
}
