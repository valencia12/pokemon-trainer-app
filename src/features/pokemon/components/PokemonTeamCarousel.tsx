import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Keyboard } from 'swiper/modules'
import type { Swiper as SwiperInstance } from 'swiper'
import 'swiper/css'
import { texts } from '../../../lib/config'
import { Icon } from '../../../components/ui/Icon'
import type { Pokemon } from '../types/pokemon'
import { PokemonStatsCard } from './PokemonStatsCard'

export function PokemonTeamCarousel({ pokemon }: { pokemon: Pokemon[] }) {
  const swiperRef = useRef<SwiperInstance | null>(null)
  const [position, setPosition] = useState({ beginning: true, end: pokemon.length <= 1 })
  const copy = texts.profile.carousel
  function updatePosition(swiper: SwiperInstance) {
    setPosition({ beginning: swiper.isBeginning || swiper.isLocked, end: swiper.isEnd || swiper.isLocked })
  }
  const buttonClass = 'flex size-8 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-brand transition-colors hover:bg-brand-soft disabled:cursor-default disabled:opacity-30 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus'
  return (
    <div className="mx-auto grid w-full max-w-[960px] min-w-0 grid-cols-[32px_minmax(0,1fr)_32px] items-center gap-2 sm:gap-3">
      <button type="button" className={buttonClass} aria-label={copy.previous} title={copy.previous} disabled={position.beginning} onClick={() => swiperRef.current?.slidePrev()}><Icon name="arrow" className="size-4 rotate-180" /></button>
      <Swiper modules={[A11y, Keyboard]} slidesPerView={1} spaceBetween={16}
        breakpointsBase="container" breakpoints={{ 480: { slidesPerView: 2 }, 760: { slidesPerView: 3 } }}
        keyboard={{ enabled: true, onlyInViewport: true }} watchOverflow
        a11y={{ containerMessage: copy.container, containerRoleDescriptionMessage: copy.containerRole,
          itemRoleDescriptionMessage: copy.itemRole, slideLabelMessage: copy.slide }}
        onSwiper={swiper => { swiperRef.current = swiper; updatePosition(swiper) }}
        onSlideChange={updatePosition} onResize={updatePosition} onLock={updatePosition} onUnlock={updatePosition}
        className="w-full">
        {pokemon.map(item => <SwiperSlide key={item.id}><PokemonStatsCard pokemon={item} /></SwiperSlide>)}
      </Swiper>
      <button type="button" className={buttonClass} aria-label={copy.next} title={copy.next} disabled={position.end} onClick={() => swiperRef.current?.slideNext()}><Icon name="arrow" className="size-4" /></button>
    </div>
  )
}
