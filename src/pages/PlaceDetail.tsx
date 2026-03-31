import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Phone, Clock, Globe, Heart, MessageCircle, Star, Navigation } from 'lucide-react'
import { useAdmin } from '../hooks/useAdmin'
import { useFavorites } from '../hooks/useFavorites'

function getMapsUrl(address: string, name: string) {
  const query = encodeURIComponent(`${name}, ${address}`)
  // geo: intent works on Android (opens chooser: Maps, Uber, 99, Waze, etc.)
  // On iOS/desktop falls back to Google Maps web which also offers app deep links
  const isAndroid = /android/i.test(navigator.userAgent)
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent)

  if (isAndroid) {
    return `geo:0,0?q=${query}`
  }
  if (isIOS) {
    // maps: scheme opens Apple Maps with option to switch to other apps
    return `maps:0,0?q=${query}`
  }
  // Desktop / fallback → Google Maps
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

export default function PlaceDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { places } = useAdmin()
  const { isFavorite, toggleFavorite } = useFavorites()

  const place = places.find(p => p.id === id)

  if (!place) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Lugar não encontrado</p>
        <button onClick={() => navigate(-1)} className="text-primary text-sm mt-2">Voltar</button>
      </div>
    )
  }

  const fav = isFavorite(place.id)

  return (
    <div className="-mx-4 -mt-4">
      {/* Image */}
      <div className="relative">
        <img src={place.image} alt={place.name} className="w-full h-56 object-cover" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={() => toggleFavorite(place.id)}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-sm ${
            fav ? 'bg-red-500 text-white' : 'bg-white/90 backdrop-blur-sm text-gray-600'
          }`}
        >
          <Heart size={20} fill={fav ? 'currentColor' : 'none'} />
        </button>
        {place.rating && (
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
            <Star size={14} className="text-amber-500" fill="currentColor" />
            <span className="text-sm font-semibold">{place.rating}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        <div className="flex gap-2 mb-2">
          {place.tags.map(tag => (
            <span key={tag} className="bg-sky-100 text-sky-700 text-[10px] font-medium px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-xl font-bold text-gray-900 mb-2">{place.name}</h1>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">{place.description}</p>

        {/* Info */}
        <div className="space-y-3 mb-6">
          <a
            href={getMapsUrl(place.address, place.name)}
            target="_blank"
            rel="noopener"
            className="flex items-start gap-3 no-underline group"
          >
            <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
            <span className="text-sm text-primary font-medium group-hover:underline">{place.address}</span>
          </a>
          {place.hours && (
            <div className="flex items-start gap-3">
              <Clock size={18} className="text-gray-400 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{place.hours}</span>
            </div>
          )}
          {place.phone && (
            <div className="flex items-start gap-3">
              <Phone size={18} className="text-gray-400 shrink-0 mt-0.5" />
              <a href={`tel:${place.phone}`} className="text-sm text-primary font-medium">{place.phone}</a>
            </div>
          )}
          {place.website && (
            <div className="flex items-start gap-3">
              <Globe size={18} className="text-gray-400 shrink-0 mt-0.5" />
              <a href={place.website} target="_blank" rel="noopener" className="text-sm text-primary font-medium truncate">
                {place.website}
              </a>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-3">
          {place.phone && (
            <a
              href={`tel:${place.phone}`}
              className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-medium text-sm no-underline"
            >
              <Phone size={16} /> Ligar
            </a>
          )}
          {place.whatsapp && (
            <a
              href={`https://wa.me/${place.whatsapp}`}
              target="_blank"
              rel="noopener"
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 text-white py-3 rounded-xl font-medium text-sm no-underline"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          )}
        </div>

        {/* Como Chegar Button */}
        <a
          href={getMapsUrl(place.address, place.name)}
          target="_blank"
          rel="noopener"
          className="w-full flex items-center justify-center gap-2 bg-amber-500 text-white py-3 rounded-xl font-medium text-sm no-underline hover:bg-amber-600 transition"
        >
          <Navigation size={16} /> Como Chegar
        </a>
      </div>
    </div>
  )
}
