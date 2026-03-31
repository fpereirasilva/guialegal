import { Link } from 'react-router-dom'
import { Palmtree, Store, CalendarDays, LifeBuoy } from 'lucide-react'
import type { Category } from '../types'

const iconMap = {
  turismo: Palmtree,
  comercio: Store,
  eventos: CalendarDays,
  utilidades: LifeBuoy,
}

const colorMap = {
  turismo: 'bg-sky-100 text-sky-600',
  comercio: 'bg-emerald-100 text-emerald-600',
  eventos: 'bg-purple-100 text-purple-600',
  utilidades: 'bg-red-100 text-red-600',
}

const routeMap = {
  turismo: '/turismo',
  comercio: '/comercio',
  eventos: '/eventos',
  utilidades: '/utilidades',
}

interface CategoryCardProps {
  id: Category
  name: string
  description: string
  count: number
}

export default function CategoryCard({ id, name, description, count }: CategoryCardProps) {
  const Icon = iconMap[id]
  const color = colorMap[id]

  return (
    <Link
      to={routeMap[id]}
      className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition no-underline"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon size={24} />
      </div>
      <div className="text-left min-w-0">
        <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
        <p className="text-xs text-gray-500 truncate">{description}</p>
      </div>
      <span className="text-xs text-gray-400 shrink-0 ml-auto">{count}</span>
    </Link>
  )
}
