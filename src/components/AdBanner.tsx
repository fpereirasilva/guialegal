import { useState } from 'react'
import { X } from 'lucide-react'

interface AdBannerProps {
  /** Nome do anunciante, ex: "Pousada Vista Mar" */
  advertiser: string
  /** Texto principal da chamada */
  title: string
  /** Texto secundário / descrição curta */
  description?: string
  /** URL da imagem do anúncio (opcional) */
  image?: string
  /** Link de destino ao clicar */
  href?: string
  /** Texto do botão de ação */
  cta?: string
  /** Permite que o usuário feche o banner */
  dismissible?: boolean
}

export default function AdBanner({
  advertiser,
  title,
  description,
  image,
  href = '#',
  cta = 'Saiba mais',
  dismissible = true,
}: AdBannerProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="relative mb-6 rounded-xl overflow-hidden border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 shadow-sm">
      <span className="absolute top-2 left-2 z-10 bg-black/60 text-white text-[10px] uppercase tracking-wide font-medium px-2 py-0.5 rounded-full">
        Publicidade
      </span>

      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          aria-label="Fechar anúncio"
          className="absolute top-2 right-2 z-10 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition"
        >
          <X size={12} />
        </button>
      )}

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="flex items-center gap-3 no-underline p-3 pt-8"
      >
        {image && (
          <img
            src={image}
            alt={advertiser}
            className="w-16 h-16 rounded-lg object-cover shrink-0"
          />
        )}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-amber-700 mb-0.5 truncate">{advertiser}</p>
          <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{title}</h3>
          {description && (
            <p className="text-xs text-gray-600 line-clamp-1">{description}</p>
          )}
        </div>
        <span className="shrink-0 text-xs font-semibold text-white bg-primary px-3 py-1.5 rounded-lg whitespace-nowrap">
          {cta}
        </span>
      </a>
    </div>
  )
}
