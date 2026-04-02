import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Category } from '@metal-depo/types'
import { getImageUrl } from '@/lib/utils'

interface CategoryShowcaseProps {
  categories: Category[]
}

const categoryGradients = [
  'from-navy-900 to-navy-700',
  'from-steel-800 to-steel-600',
  'from-navy-800 to-steel-700',
  'from-steel-900 to-navy-800',
  'from-navy-700 to-steel-800',
  'from-steel-700 to-navy-900',
]

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  if (categories.length === 0) return null

  return (
    <section className="bg-steel-50 py-20">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <div className="divider-gold mb-4" />
            <h2 className="section-title">Product Categories</h2>
            <p className="section-subtitle">
              Explore our comprehensive range of industrial metal products
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy-DEFAULT uppercase tracking-widest hover:text-gold-600 transition-colors group"
          >
            View All Products
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {categories.slice(0, 8).map((category, i) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group relative overflow-hidden aspect-[4/3] bg-navy-900 block"
            >
              {/* Background */}
              {category.image ? (
                <Image
                  src={getImageUrl(category.image)}
                  alt={category.name}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                />
              ) : (
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${categoryGradients[i % categoryGradients.length]}`}
                />
              )}

              {/* Pattern overlay */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 11px)`,
                }}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/30 transition-colors duration-300" />

              {/* Bottom strip */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="h-px w-0 bg-gold-DEFAULT group-hover:w-full transition-all duration-500 mb-2" />
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-white font-bold text-sm leading-tight">{category.name}</p>
                    {category._count && (
                      <p className="text-white/50 text-xs mt-0.5">
                        {category._count.products} products
                      </p>
                    )}
                  </div>
                  <ArrowRight
                    size={14}
                    className="text-gold-DEFAULT opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-300"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
