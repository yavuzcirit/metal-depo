import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProduct, getRelatedProducts } from '@/lib/api'
import { ProductCard } from '@/components/products/ProductCard'
import { getImageUrl, formatPrice } from '@/lib/utils'
import { Tag, Package, ArrowLeft, ChevronRight, Phone, Mail } from 'lucide-react'
import { ImageGallery } from '@/components/products/ImageGallery'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const product = await getProduct(slug)
    return {
      title: `${product.name} (${product.code})`,
      description: product.description || `${product.name} — Premium metal product by MetalDepo`,
      openGraph: {
        images: product.images?.[0] ? [{ url: getImageUrl(product.images[0]) }] : [],
      },
    }
  } catch {
    return { title: 'Product Not Found' }
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params

  let product
  try {
    product = await getProduct(slug)
  } catch {
    notFound()
  }

  const related = await getRelatedProducts(product.id, product.categoryId, 4).catch(() => [])

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-navy-950 pt-24 pb-5">
        <div className="container-wide">
          <nav className="flex items-center gap-2 text-xs text-white/40">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/products" className="hover:text-white/70 transition-colors">Products</Link>
            <ChevronRight size={12} />
            <Link href={`/products?category=${product.category.slug}`} className="hover:text-white/70 transition-colors">
              {product.category.name}
            </Link>
            <ChevronRight size={12} />
            <span className="text-white/70 truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main product */}
      <div className="bg-white">
        <div className="container-wide py-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Images */}
            <ImageGallery images={product.images} productName={product.name} />

            {/* Info */}
            <div>
              {/* Category & Code */}
              <div className="flex items-center gap-3 mb-3">
                <Link
                  href={`/products?category=${product.category.slug}`}
                  className="text-xs text-steel-500 bg-steel-100 px-3 py-1 hover:bg-navy-50 hover:text-navy-DEFAULT transition-colors"
                >
                  {product.category.name}
                </Link>
                <div className="flex items-center gap-1.5">
                  <Tag size={12} className="text-gold-600" />
                  <span className="text-gold-600 text-xs font-bold uppercase tracking-widest">
                    {product.code}
                  </span>
                </div>
              </div>

              {/* Name */}
              <h1 className="text-3xl font-black text-navy-900 leading-tight tracking-tight mb-4 md:text-4xl">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-steel-100">
                <span className="text-2xl font-bold text-navy-DEFAULT">
                  {formatPrice(product.price, product.unit)}
                </span>
                {!product.price && (
                  <Link href="/contact" className="text-xs text-gold-600 hover:underline">
                    Request quote →
                  </Link>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-steel-600 text-base leading-relaxed mb-6">
                  {product.description}
                </p>
              )}

              {/* Details */}
              {product.details && (
                <div className="mb-8 p-5 bg-steel-50 border-l-2 border-gold-DEFAULT">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-steel-500 mb-3">
                    Technical Details
                  </h3>
                  <div
                    className="text-sm text-steel-700 leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: product.details }}
                  />
                </div>
              )}

              {/* Specs */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="bg-steel-50 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-steel-400 mb-1">
                    Product Code
                  </p>
                  <p className="text-navy-900 font-bold text-sm">{product.code}</p>
                </div>
                <div className="bg-steel-50 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-steel-400 mb-1">
                    Category
                  </p>
                  <p className="text-navy-900 font-bold text-sm">{product.category.name}</p>
                </div>
                {product.unit && (
                  <div className="bg-steel-50 p-4">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-steel-400 mb-1">
                      Unit
                    </p>
                    <p className="text-navy-900 font-bold text-sm">{product.unit}</p>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/contact?product=${product.code}`} className="btn-gold flex-1 text-center justify-center">
                  Request a Quote
                </Link>
                <a
                  href="tel:+905001234567"
                  className="btn-primary bg-navy-900 flex-1 text-center justify-center"
                >
                  <Phone size={15} />
                  Call Us
                </a>
              </div>

              {/* Trust badges */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {['Quality Certified', 'Global Delivery', '24h Quote'].map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center justify-center gap-1.5 border border-steel-200 py-2.5 text-center"
                  >
                    <Package size={11} className="text-gold-DEFAULT" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-steel-600">
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="bg-steel-50 py-16">
          <div className="container-wide">
            <div className="divider-gold mb-4" />
            <h2 className="text-2xl font-bold text-navy-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
