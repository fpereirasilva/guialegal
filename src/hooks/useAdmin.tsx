import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Place, Event } from '../types'
import { initialPlaces } from '../data/places'
import { initialEvents } from '../data/events'

interface AdminContextType {
  isLoggedIn: boolean
  login: (user: string, pass: string) => boolean
  logout: () => void
  places: Place[]
  events: Event[]
  addPlace: (place: Place) => void
  updatePlace: (place: Place) => void
  deletePlace: (id: string) => void
  addEvent: (event: Event) => void
  updateEvent: (event: Event) => void
  deleteEvent: (id: string) => void
}

const AdminContext = createContext<AdminContextType | null>(null)

function loadFromStorage<T>(key: string, fallback: T[]): T[] {
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : fallback
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('adminLogged') === 'true')
  const [places, setPlaces] = useState<Place[]>(() => loadFromStorage('places', initialPlaces))
  const [events, setEvents] = useState<Event[]>(() => loadFromStorage('events', initialEvents))

  useEffect(() => { localStorage.setItem('places', JSON.stringify(places)) }, [places])
  useEffect(() => { localStorage.setItem('events', JSON.stringify(events)) }, [events])

  const login = (user: string, pass: string) => {
    if (user === 'admin' && pass === 'admin') {
      setIsLoggedIn(true)
      localStorage.setItem('adminLogged', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('adminLogged')
  }

  const addPlace = (place: Place) => setPlaces(prev => [...prev, place])
  const updatePlace = (place: Place) => setPlaces(prev => prev.map(p => p.id === place.id ? place : p))
  const deletePlace = (id: string) => setPlaces(prev => prev.filter(p => p.id !== id))
  const addEvent = (event: Event) => setEvents(prev => [...prev, event])
  const updateEvent = (event: Event) => setEvents(prev => prev.map(e => e.id === event.id ? event : e))
  const deleteEvent = (id: string) => setEvents(prev => prev.filter(e => e.id !== id))

  return (
    <AdminContext.Provider value={{
      isLoggedIn, login, logout,
      places, events,
      addPlace, updatePlace, deletePlace,
      addEvent, updateEvent, deleteEvent,
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}
