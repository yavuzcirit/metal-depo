'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { cn, getImageUrl } from '@/lib/utils'

interface ImageGalleryProps {
  images: string[]
  productName: string
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [current, setCurrent] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-gradient-to-br from-steel-100 to-steel-200 flex items-center justify-center">
        <span className="text-steel-300 text-6xl font-black opacity-30">IMG</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div
        className="relative aspect-square bg-steel-100 overflow-hidden cursor-zoom-in group"
        onClick={() => setLightbox(true)}
      >
        <Image
          src={getImageUrl(images[current])}
          alt={`${productName} - Image ${current + 1}`}
          fill
          className="object-contain"
          priority
        />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 p-2">
          <ZoomIn size={16} className="text-navy" />
        </div>
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + images.length) % images.length) }}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center bg-white/80 hover:bg-white transition-colors shadow-sm"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % images.length) }}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center bg-white/80 hover:bg-white transition-colors shadow-sm"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                'relative h-16 w-16 shrink-0 overflow-hidden border-2 transition-colors',
                i === current ? 'border-navy' : 'border-steel-200 hover:border-steel-400',
              )}
            >
              <Image src={getImageUrl(img)} alt={`${productName} thumbnail ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-navy-950/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full">
            <Image
              src={getImageUrl(images[current])}
              alt={productName}
              fill
              className="object-contain"
            />
          </div>
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white text-xl font-bold"
            onClick={() => setLightbox(false)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}
