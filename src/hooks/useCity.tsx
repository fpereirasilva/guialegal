import { createContext, useContext, useState, type ReactNode } from 'react'
import type { City } from '../types'

interface CityContextType {
  city: City | null
  setCity: (city: City) => void
  cityName: string
}

const CityContext = createContext<CityContextType | null>(null)

export function CityProvider({ children }: { children: ReactNode }) {
  const [city, setCityState] = useState<City | null>(() => {
    return localStorage.getItem('selectedCity') as City | null
  })

  const setCity = (c: City) => {
    setCityState(c)
    localStorage.setItem('selectedCity', c)
  }

  const cityName = city === 'iguape' ? 'Iguape' : city === 'ilha-comprida' ? 'Ilha Comprida' : ''

  return (
    <CityContext.Provider value={{ city, setCity, cityName }}>
      {children}
    </CityContext.Provider>
  )
}

export function useCity() {
  const ctx = useContext(CityContext)
  if (!ctx) throw new Error('useCity must be used within CityProvider')
  return ctx
}
