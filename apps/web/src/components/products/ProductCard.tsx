import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Tag } from 'lucide-react'
import type { Product } from '@metal-depo/types'
import { cn, getImageUrl, truncate } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const image = product.images?.[0]

  return (
    <Link href={`/products/${product.slug}`} className={cn('product-card', className)}>
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-steel-100">
        {image ? (
          <Image
            src={getImageUrl(image)}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-steel-100 to-steel-200">
            <div className="text-steel-300 text-center">
              <div className="text-4xl font-black opacity-20 tracking-widest">
                {product.code.slice(0, 3)}
              </div>
            </div>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 bg-navy-900/80 text-white text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 backdrop-blur-sm">
            {product.category.name}
          </span>
        </div>

        {/* Featured badge */}
        {product.featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 bg-gold text-navy-900 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Code */}
        <div className="flex items-center gap-1.5 mb-2">
          <Tag size={11} className="text-gold-600" />
          <span className="text-gold-600 text-[11px] font-bold uppercase tracking-widest">
            {product.code}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-navy-900 font-bold text-sm leading-snug mb-2 group-hover:text-navy-700 transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          <p className="text-steel-500 text-xs leading-relaxed flex-1 mb-4">
            {truncate(product.description, 90)}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-steel-100">
          {product.price ? (
            <span className="text-navy-900 font-bold text-sm">
              ${product.price.toLocaleString()}
              {product.unit && <span className="text-steel-400 font-normal text-xs"> /{product.unit}</span>}
            </span>
          ) : (
            <span className="text-steel-400 text-xs italic">Contact for price</span>
          )}
          <span className="flex items-center gap-1 text-navy text-[11px] font-semibold uppercase tracking-wider group-hover:text-gold-600 transition-colors">
            View
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  )
}
