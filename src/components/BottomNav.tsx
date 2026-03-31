import { NavLink } from 'react-router-dom'
import { Home, Palmtree, Store, CalendarDays, LifeBuoy } from 'lucide-react'

const navItems = [
  { to: '/', icon: Home, label: 'Início' },
  { to: '/turismo', icon: Palmtree, label: 'Turismo' },
  { to: '/comercio', icon: Store, label: 'Comércio' },
  { to: '/eventos', icon: CalendarDays, label: 'Eventos' },
  { to: '/utilidades', icon: LifeBuoy, label: 'Utilidades' },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-lg mx-auto flex justify-around pb-[env(safe-area-inset-bottom)]">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center py-2 px-3 text-xs transition-colors ${
                isActive ? 'text-primary font-semibold' : 'text-gray-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className="mt-0.5">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
