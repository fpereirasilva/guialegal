import type { CategoryInfo } from '../types'

export const categories: CategoryInfo[] = [
  {
    id: 'turismo',
    name: 'Turismo e Lazer',
    icon: 'Palmtree',
    description: 'Praias, trilhas, pontos turísticos e hospedagem',
    subcategories: ['Praias', 'Trilhas', 'Pontos Turísticos', 'Hotéis e Pousadas', 'Passeios'],
  },
  {
    id: 'comercio',
    name: 'Comércio e Serviços',
    icon: 'Store',
    description: 'Restaurantes, lojas e profissionais',
    subcategories: ['Restaurantes', 'Bares', 'Lojas', 'Mercados', 'Profissionais', 'Imobiliárias'],
  },
  {
    id: 'eventos',
    name: 'Eventos e Cultura',
    icon: 'CalendarDays',
    description: 'Agenda de eventos, festas e cultura',
    subcategories: ['Festas', 'Shows', 'Cultura', 'Feiras', 'Esportes'],
  },
  {
    id: 'utilidades',
    name: 'Utilidades',
    icon: 'LifeBuoy',
    description: 'Farmácias, hospitais, emergências',
    subcategories: ['Saúde', 'Farmácias', 'Emergências', 'Transporte', 'Serviços Públicos', 'Educação'],
  },
]
