import { Link } from 'react-router-dom'
import { MapPin, Phone, Star, Heart } from 'lucide-react'
import type { Place } from '../types'
import { useFavorites } from '../hooks/useFavorites'

interface PlaceCardProps {
  place: Place
}

export default function PlaceCard({ place }: PlaceCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(place.id)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
      <Link to={`/lugar/${place.id}`} className="no-underline">
        <div className="relative">
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-40 object-cover"
          />
          {place.rating && (
            <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1 text-amber-600">
              <Star size={12} fill="currentColor" /> {place.rating}
            </span>
          )}
        </div>
        <div className="p-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">{place.name}</h3>
          <p className="text-xs text-gray-500 line-clamp-2 mb-2">{place.description}</p>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <MapPin size={12} />
            <span className="truncate">{place.address}</span>
          </div>
          {place.phone && (
            <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
              <Phone size={12} />
              <span>{place.phone}</span>
            </div>
          )}
        </div>
      </Link>
      <div className="px-3 pb-3 flex justify-end">
        <button
          onClick={(e) => { e.preventDefault(); toggleFavorite(place.id) }}
          className={`p-1.5 rounded-full transition ${fav ? 'text-red-500 bg-red-50' : 'text-gray-300 hover:text-red-400'}`}
        >
          <Heart size={18} fill={fav ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
  )
}
