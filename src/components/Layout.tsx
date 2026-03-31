import { Outlet, Link } from 'react-router-dom'
import { MapPin, Settings } from 'lucide-react'
import BottomNav from './BottomNav'
import { useCity } from '../hooks/useCity'

export default function Layout() {
  const { cityName, city } = useCity()

  return (
    <div className="flex flex-col min-h-dvh bg-sky-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
              <MapPin size={20} className="text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-sm font-bold text-gray-900 leading-tight">Guia Digital</h1>
              {city && <p className="text-[11px] text-primary font-medium">{cityName}</p>}
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/cidade" className="text-xs text-primary font-medium bg-sky-50 px-3 py-1.5 rounded-full">
              {city ? 'Trocar cidade' : 'Escolher cidade'}
            </Link>
            <Link to="/admin" className="text-gray-400 hover:text-gray-600">
              <Settings size={20} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-4 pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
