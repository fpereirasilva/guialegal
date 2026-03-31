import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import SearchBar from '../components/SearchBar'
import CategoryCard from '../components/CategoryCard'
import PlaceCard from '../components/PlaceCard'
import { useCity } from '../hooks/useCity'
import { useAdmin } from '../hooks/useAdmin'
import { categories } from '../data/categories'

export default function Home() {
  const { city, cityName } = useCity()
  const { places, events } = useAdmin()
  const [search, setSearch] = useState('')

  const cityPlaces = useMemo(
    () => places.filter(p => p.city === city),
    [places, city]
  )

  const filteredPlaces = useMemo(
    () => search
      ? cityPlaces.filter(p =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
        )
      : [],
    [cityPlaces, search]
  )

  const highlightPlaces = useMemo(
    () => cityPlaces.filter(p => p.rating).sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4),
    [cityPlaces]
  )

  const upcomingEvents = useMemo(
    () => events
      .filter(e => e.city === city && new Date(e.date) >= new Date())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3),
    [events, city]
  )

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    categories.forEach(c => {
      counts[c.id] = cityPlaces.filter(p => p.category === c.id).length
    })
    return counts
  }, [cityPlaces])

  if (search && filteredPlaces.length > 0) {
    return (
      <div>
        <SearchBar value={search} onChange={setSearch} placeholder={`Buscar em ${cityName}...`} />
        <p className="text-xs text-gray-500 mb-3">{filteredPlaces.length} resultado(s)</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredPlaces.map(p => <PlaceCard key={p.id} place={p} />)}
        </div>
      </div>
    )
  }

  return (
    <div>
      <SearchBar value={search} onChange={setSearch} placeholder={`Buscar em ${cityName}...`} />

      {/* Categories */}
      <section className="mb-6">
        <h2 className="text-base font-bold text-gray-900 mb-3">Categorias</h2>
        <div className="space-y-2">
          {categories.map(cat => (
            <CategoryCard
              key={cat.id}
              id={cat.id}
              name={cat.name}
              description={cat.description}
              count={categoryCounts[cat.id] || 0}
            />
          ))}
        </div>
      </section>

      {/* Highlights */}
      {highlightPlaces.length > 0 && (
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-1.5">
              <Sparkles size={16} className="text-amber-500" /> Destaques
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {highlightPlaces.map(p => <PlaceCard key={p.id} place={p} />)}
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-gray-900">Próximos Eventos</h2>
            <Link to="/eventos" className="text-xs text-primary font-medium flex items-center gap-1">
              Ver todos <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-2">
            {upcomingEvents.map(ev => (
              <div key={ev.id} className="flex gap-3 bg-white rounded-xl p-3 border border-gray-100">
                <img src={ev.image} alt={ev.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{ev.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-1">{ev.description}</p>
                  <p className="text-xs text-primary font-medium mt-1">
                    {new Date(ev.date + 'T00:00:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })} · {ev.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
