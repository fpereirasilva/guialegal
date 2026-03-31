export type City = 'iguape' | 'ilha-comprida'

export interface Place {
  id: string
  name: string
  description: string
  category: Category
  subcategory: string
  city: City
  address: string
  phone?: string
  whatsapp?: string
  website?: string
  image: string
  rating?: number
  hours?: string
  tags: string[]
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  city: City
  image: string
  category: string
}

export type Category = 'turismo' | 'comercio' | 'eventos' | 'utilidades'

export interface CategoryInfo {
  id: Category
  name: string
  icon: string
  description: string
  subcategories: string[]
}
