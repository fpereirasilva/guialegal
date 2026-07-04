import { useState, useRef, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export interface AdItem {
  id: string
  /** Nome do anunciante, ex: "Pousada Vista Mar" */
  advertiser: string
  /** Texto principal da chamada */
  title: string
  /** Texto secundário / descrição curta */
  description?: string
  /** URL da imagem de fundo do slide */
  image: string
  /** Link de destino ao clicar */
  href?: string
  /** Texto do botão de ação */
  cta?: string
}

interface AdBannerProps {
  ads: AdItem[]
  /** Intervalo do autoplay em ms (0 desativa) */
  autoPlayMs?: number
  /** Permite fechar o carrossel inteiro */
  dismissible?: boolean
}

export default function AdBanner({ ads, autoPlayMs = 5000, dismissible = true }: AdBannerProps) {
  const [index, setIndex] = useState(0)
  const [dismissed, setDismissed] = useState(false)
  const [paused, setPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)

  const count = ads.length

  const goTo = useCallback((i: number) => {
    setIndex(((i % count) + count) % count)
  }, [count])

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    if (!autoPlayMs || paused || count <= 1) return
    const timer = setInterval(() => setIndex(i => (i + 1) % count), autoPlayMs)
    return () => clearInterval(timer)
  }, [autoPlayMs, paused, count])

  if (dismissed || count === 0) return null

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    setPaused(true)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (delta > 40) prev()
    else if (delta < -40) next()
    touchStartX.current = null
    setPaused(false)
  }

  return (
    <div className="relative mb-6 rounded-xl overflow-hidden shadow-sm border border-gray-100">
      <span className="absolute top-2 left-2 z-20 bg-black/60 text-white text-[10px] uppercase tracking-wide font-medium px-2 py-0.5 rounded-full">
        Publicidade
      </span>

      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          aria-label="Fechar anúncios"
          className="absolute top-2 right-2 z-20 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition"
        >
          <X size={12} />
        </button>
      )}

      {count > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Anúncio anterior"
            className="absolute left-1 top-1/2 -translate-y-1/2 z-20 bg-black/40 text-white rounded-full p-1 hover:bg-black/60 transition"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            aria-label="Próximo anúncio"
            className="absolute right-1 top-1/2 -translate-y-1/2 z-20 bg-black/40 text-white rounded-full p-1 hover:bg-black/60 transition"
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}

      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {ads.map(ad => (
          <a
            key={ad.id}
            href={ad.href || '#'}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="relative w-full shrink-0 no-underline"
          >
            <div className="relative h-40">
              <img
                src={ad.image}
                alt={ad.advertiser}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 pr-4">
                <p className="text-[11px] font-semibold text-amber-300 mb-0.5 truncate">{ad.advertiser}</p>
                <div className="flex items-end justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-white line-clamp-1">{ad.title}</h3>
                    {ad.description && (
                      <p className="text-xs text-white/80 line-clamp-1">{ad.description}</p>
                    )}
                  </div>
                  <span className="shrink-0 text-xs font-semibold text-white bg-primary px-3 py-1.5 rounded-lg whitespace-nowrap">
                    {ad.cta || 'Saiba mais'}
                  </span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {count > 1 && (
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-20 flex gap-1">
          {ads.map((ad, i) => (
            <button
              key={ad.id}
              onClick={() => goTo(i)}
              aria-label={`Ir para anúncio ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
