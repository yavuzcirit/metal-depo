'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Banner } from '@metal-depo/types'

interface HeroSliderProps {
  banners: Banner[]
}

// Fallback slides when no banners in DB
const fallbackSlides = [
  {
    id: '1',
    title: 'Premium Metal Products',
    subtitle: 'Industrial Grade Quality',
    description: 'Trusted by manufacturers in 50+ countries. Steel, aluminum, and specialty alloys — delivered globally.',
    image: null,
    link: '/products',
    gradient: 'from-navy-950 via-navy-900 to-navy-800',
  },
  {
    id: '2',
    title: 'Precision Steel Solutions',
    subtitle: 'Structural & Commercial',
    description: 'From I-beams to precision tubes. We supply the metals that build the world.',
    image: null,
    link: '/products',
    gradient: 'from-steel-900 via-navy-900 to-navy-950',
  },
  {
    id: '3',
    title: 'Global Supply Chain',
    subtitle: 'Fast & Reliable Delivery',
    description: 'Competitive pricing, certified quality, and logistics expertise for businesses worldwide.',
    image: null,
    link: '/contact',
    gradient: 'from-navy-950 via-navy-800 to-steel-900',
  },
]

export function HeroSlider({ banners }: HeroSliderProps) {
  const slides = banners.length > 0 ? banners : fallbackSlides
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      next()
    }, 6000)
    return () => clearInterval(timer)
  }, [current])

  const goTo = (index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrent(index)
    setTimeout(() => setIsTransitioning(false), 600)
  }

  const prev = () => goTo((current - 1 + slides.length) % slides.length)
  const next = () => goTo((current + 1) % slides.length)

  const slide = slides[current] as any

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden bg-navy-950">
      {/* Background */}
      {slide.image ? (
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          className={cn(
            'object-cover transition-opacity duration-700',
            isTransitioning ? 'opacity-0' : 'opacity-100',
          )}
          priority
        />
      ) : (
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br transition-opacity duration-700',
            slide.gradient || 'from-navy-950 to-navy-800',
            isTransitioning ? 'opacity-0' : 'opacity-100',
          )}
        />
      )}

      {/* Overlay pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Dark overlay for images */}
      {slide.image && <div className="absolute inset-0 bg-navy-950/60" />}

      {/* Gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold-gradient z-10" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container-wide pt-20">
          <div
            className={cn(
              'max-w-3xl transition-all duration-700',
              isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0',
            )}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-gold" />
              <span className="text-gold text-xs font-semibold uppercase tracking-[4px]">
                {slide.subtitle}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl font-black text-white leading-[1.05] tracking-tight md:text-6xl lg:text-7xl mb-6">
              {slide.title}
            </h1>

            {/* Description */}
            {slide.description && (
              <p className="text-white/60 text-lg leading-relaxed max-w-xl mb-10">
                {slide.description}
              </p>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link href={slide.link || '/products'} className="btn-gold">
                Browse Products
                <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-outline text-white border-white/30 hover:bg-white hover:text-navy-900">
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center bg-white/10 text-white backdrop-blur-sm hover:bg-gold hover:text-navy-900 transition-all duration-200 md:left-8"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center bg-white/10 text-white backdrop-blur-sm hover:bg-gold hover:text-navy-900 transition-all duration-200 md:right-8"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={cn(
              'h-1 transition-all duration-300',
              i === current ? 'w-8 bg-gold' : 'w-3 bg-white/30 hover:bg-white/60',
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
