import { useState, useEffect } from 'react'

const STORAGE_KEY = 'favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  const isFavorite = (id: string) => favorites.includes(id)

  return { favorites, toggleFavorite, isFavorite }
}
