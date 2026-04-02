import { ProductForm } from '@/components/products/ProductForm'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/products" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-3">
          <ChevronLeft size={14} />
          Back to Products
        </Link>
        <h2 className="text-xl font-bold text-gray-800">Add New Product</h2>
      </div>
      <ProductForm />
    </div>
  )
}
