import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Product } from '@metal-depo/types'
import { ProductCard } from '@/components/products/ProductCard'

interface FeaturedProductsProps {
  products: Product[]
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (products.length === 0) return null

  return (
    <section className="bg-white py-20">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <div className="divider-gold mb-4" />
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">
              Hand-picked selection of our most sought-after metal products
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

        {/* Products grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
