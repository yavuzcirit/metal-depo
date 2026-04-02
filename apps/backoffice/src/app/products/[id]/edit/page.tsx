import { api } from '@/lib/api'
import { ProductForm } from '@/components/products/ProductForm'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import type { Product } from '@metal-depo/types'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let product: Product

  try {
    product = await api.getProduct(id) as Product
  } catch {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/products" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-3">
          <ChevronLeft size={14} />
          Back to Products
        </Link>
        <h2 className="text-xl font-bold text-gray-800">Edit Product</h2>
        <p className="text-sm text-gray-400 font-mono">{product.code} — {product.name}</p>
      </div>
      <ProductForm product={product} />
    </div>
  )
}
