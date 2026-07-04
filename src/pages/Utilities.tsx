import { useState, useMemo } from 'react'
import SearchBar from '../components/SearchBar'
import PlaceCard from '../components/PlaceCard'
import AdBanner from '../components/AdBanner'
import { useCity } from '../hooks/useCity'
import { useAdmin } from '../hooks/useAdmin'
import { categories } from '../data/categories'
import { utilitiesAds } from '../data/ads'

export default function Utilities() {
  const { city } = useCity()
  const { places } = useAdmin()
  const [search, setSearch] = useState('')
  const [sub, setSub] = useState<string | null>(null)

  const cat = categories.find(c => c.id === 'utilidades')!
  const filtered = useMemo(
    () => places.filter(p =>
      p.city === city &&
      p.category === 'utilidades' &&
      (!sub || p.subcategory === sub) &&
      (!search || p.name.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.includes(search.toLowerCase())))
    ),
    [places, city, sub, search]
  )

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-1">Utilidades</h2>
      <p className="text-xs text-gray-500 mb-3">Saúde, farmácias, emergências e serviços</p>

      <SearchBar value={search} onChange={setSearch} placeholder="Buscar farmácias, hospitais..." />

      <div className="flex gap-2 overflow-x-auto pb-3 mb-3 no-scrollbar">
        <button
          onClick={() => setSub(null)}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition ${
            !sub ? 'bg-danger text-white' : 'bg-white text-gray-600 border border-gray-200'
          }`}
        >
          Todos
        </button>
        {cat.subcategories.map(s => (
          <button
            key={s}
            onClick={() => setSub(s)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition ${
              sub === s ? 'bg-danger text-white' : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <AdBanner ads={utilitiesAds} />

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-sm">Nenhum resultado encontrado</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map(p => <PlaceCard key={p.id} place={p} />)}
        </div>
      )}
    </div>
  )
}
