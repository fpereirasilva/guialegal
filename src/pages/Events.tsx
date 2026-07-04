import { useMemo } from 'react'
import { Calendar, MapPin, Clock } from 'lucide-react'
import AdBanner from '../components/AdBanner'
import { useCity } from '../hooks/useCity'
import { useAdmin } from '../hooks/useAdmin'
import { eventsAds } from '../data/ads'

export default function Events() {
  const { city } = useCity()
  const { events } = useAdmin()

  const cityEvents = useMemo(
    () => events
      .filter(e => e.city === city)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    [events, city]
  )

  const upcoming = cityEvents.filter(e => new Date(e.date) >= new Date())
  const past = cityEvents.filter(e => new Date(e.date) < new Date())

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-1">Eventos e Cultura</h2>
      <p className="text-xs text-gray-500 mb-4">Agenda de eventos da cidade</p>

      <AdBanner ads={eventsAds} />

      {upcoming.length > 0 && (
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Próximos Eventos</h3>
          <div className="space-y-3">
            {upcoming.map(ev => (
              <div key={ev.id} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                <img src={ev.image} alt={ev.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <span className="inline-block bg-purple-100 text-purple-700 text-[10px] font-medium px-2 py-0.5 rounded-full mb-2">
                    {ev.category}
                  </span>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{ev.title}</h3>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{ev.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(ev.date + 'T00:00:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {ev.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {ev.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Eventos Passados</h3>
          <div className="space-y-2 opacity-60">
            {past.map(ev => (
              <div key={ev.id} className="flex gap-3 bg-white rounded-xl p-3 border border-gray-100">
                <img src={ev.image} alt={ev.title} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-sm font-medium text-gray-700 line-clamp-1">{ev.title}</h4>
                  <p className="text-xs text-gray-400">
                    {new Date(ev.date + 'T00:00:00').toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {cityEvents.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <Calendar size={40} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">Nenhum evento cadastrado</p>
        </div>
      )}
    </div>
  )
}
