import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { useAdmin } from '../../hooks/useAdmin'
import { categories } from '../../data/categories'
import type { Place, City, Category } from '../../types'

export default function AdminPlaceForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { places, addPlace, updatePlace, isLoggedIn } = useAdmin()
  const isEdit = id && id !== 'novo'

  const existing = isEdit ? places.find(p => p.id === id) : null

  const [form, setForm] = useState<Omit<Place, 'id'>>({
    name: '',
    description: '',
    category: 'turismo',
    subcategory: '',
    city: 'iguape',
    address: '',
    phone: '',
    whatsapp: '',
    website: '',
    image: 'https://placehold.co/600x400/0ea5e9/white?text=Novo+Local',
    rating: undefined,
    hours: '',
    tags: [],
  })

  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    if (existing) {
      setForm({ ...existing })
    }
  }, [existing])

  if (!isLoggedIn) {
    navigate('/admin', { replace: true })
    return null
  }

  const currentCat = categories.find(c => c.id === form.category)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isEdit && id) {
      updatePlace({ ...form, id })
    } else {
      addPlace({ ...form, id: Date.now().toString() })
    }
    navigate('/admin/dashboard')
  }

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim().toLowerCase())) {
      setForm(f => ({ ...f, tags: [...f.tags, tagInput.trim().toLowerCase()] }))
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    setForm(f => ({ ...f, tags: f.tags.filter(t => t !== tag) }))
  }

  const fieldClass = "w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate(-1)} className="p-1.5 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-bold text-gray-900">{isEdit ? 'Editar Lugar' : 'Novo Lugar'}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          required
          type="text"
          placeholder="Nome do lugar *"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
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
            onChange={e => setForm(f => ({ ...f, category: e.target.value as Category, subcategory: '' }))}
            className={fieldClass}
          >
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <select
          value={form.subcategory}
          onChange={e => setForm(f => ({ ...f, subcategory: e.target.value }))}
          className={fieldClass}
        >
          <option value="">Subcategoria</option>
          {currentCat?.subcategories.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <input
          required
          type="text"
          placeholder="Endereço *"
          value={form.address}
          onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
          className={fieldClass}
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Telefone"
            value={form.phone || ''}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            className={fieldClass}
          />
          <input
            type="text"
            placeholder="WhatsApp (5513...)"
            value={form.whatsapp || ''}
            onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))}
            className={fieldClass}
          />
        </div>

        <input
          type="text"
          placeholder="Horário de funcionamento"
          value={form.hours || ''}
          onChange={e => setForm(f => ({ ...f, hours: e.target.value }))}
          className={fieldClass}
        />

        <input
          type="url"
          placeholder="URL da imagem"
          value={form.image}
          onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
          className={fieldClass}
        />

        <input
          type="number"
          step="0.1"
          min="0"
          max="5"
          placeholder="Avaliação (0-5)"
          value={form.rating || ''}
          onChange={e => setForm(f => ({ ...f, rating: e.target.value ? parseFloat(e.target.value) : undefined }))}
          className={fieldClass}
        />

        {/* Tags */}
        <div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Adicionar tag"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className={`${fieldClass} flex-1`}
            />
            <button type="button" onClick={addTag} className="px-3 bg-gray-100 rounded-xl text-sm font-medium text-gray-600">
              +
            </button>
          </div>
          {form.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {form.tags.map(tag => (
                <span
                  key={tag}
                  className="bg-sky-100 text-sky-700 text-xs px-2 py-0.5 rounded-full cursor-pointer hover:bg-red-100 hover:text-red-600"
                  onClick={() => removeTag(tag)}
                >
                  {tag} &times;
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-medium text-sm hover:bg-primary-dark transition"
        >
          <Save size={16} /> {isEdit ? 'Salvar Alterações' : 'Cadastrar Lugar'}
        </button>
      </form>
    </div>
  )
}
