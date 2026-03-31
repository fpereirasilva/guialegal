import { useNavigate } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { useCity } from '../hooks/useCity'
import type { City } from '../types'

const cities: { id: City; name: string; desc: string; emoji: string }[] = [
  {
    id: 'iguape',
    name: 'Iguape',
    desc: 'Centro histórico, Basílica, praias e natureza',
    emoji: '⛪',
  },
  {
    id: 'ilha-comprida',
    name: 'Ilha Comprida',
    desc: '74km de praias, dunas, natureza preservada',
    emoji: '🏖️',
  },
]

export default function CitySelector() {
  const { setCity, city: currentCity } = useCity()
  const navigate = useNavigate()

  const handleSelect = (id: City) => {
    setCity(id)
    navigate('/')
  }

  return (
    <div className="min-h-[80dvh] flex flex-col items-center justify-center px-4">
      <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4">
        <MapPin size={32} className="text-white" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Guia Digital</h1>
      <p className="text-sm text-gray-500 mb-8">Escolha sua cidade</p>

      <div className="w-full max-w-sm space-y-3">
        {cities.map(c => (
          <button
            key={c.id}
            onClick={() => handleSelect(c.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition text-left ${
              currentCity === c.id
                ? 'border-primary bg-sky-50'
                : 'border-gray-200 bg-white hover:border-primary/50'
            }`}
          >
            <span className="text-3xl">{c.emoji}</span>
            <div>
              <h3 className="font-semibold text-gray-900">{c.name}</h3>
              <p className="text-xs text-gray-500">{c.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
