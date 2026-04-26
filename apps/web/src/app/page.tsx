import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getProducts, getCategories } from '@/lib/api'
import { ProductCard } from '@/components/products/ProductCard'
import { HomeProductFilters } from '@/components/home/HomeProductFilters'
import { HomeProductSearch } from '@/components/home/HomeProductSearch'
import { HomePagination } from '@/components/home/HomePagination'
import { SlidersHorizontal } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Metal Depo — Industrial Metal Catalogue',
  description: 'Browse our comprehensive catalogue of premium steel, aluminum, and specialty metal products.',
}

interface PageProps {
  searchParams: Promise<{
    page?: string
    category?: string
    search?: string
  }>
}

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const category = params.category
  const search = params.search

  const [productsResult, categoriesResult] = await Promise.allSettled([
    getProducts({ page, limit: 12, ...(category ? { category } : {}), ...(search ? { search } : {}) }),
    getCategories(true),
  ])

  const products = productsResult.status === 'fulfilled' ? productsResult.value : { data: [], total: 0, page: 1, limit: 12, totalPages: 0 }
  const categories = categoriesResult.status === 'fulfilled' ? categoriesResult.value : []

  return (
    <>
      {/* Page Header */}
      <div className="bg-navy-950 pt-28 pb-14">
        <div className="container-wide">
          <div className="divider-gold mb-4" />
          <h1 className="text-4xl font-black text-white tracking-tight mb-3">Product Catalogue</h1>
          <p className="text-white/50 text-base">
            {products.total.toLocaleString()} products across {categories.length} categories
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-steel-50 min-h-screen">
        <div className="container-wide py-10">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 shrink-0">
              <div className="bg-white p-6 shadow-card sticky top-24">
                <div className="mb-6">
                  <Suspense>
                    <HomeProductSearch value={search} />
                  </Suspense>
                </div>
                <Suspense>
                  <HomeProductFilters categories={categories} activeCategory={category} />
                </Suspense>
              </div>
            </aside>

            {/* Main */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 bg-white px-4 py-3 shadow-card">
                <div className="flex items-center gap-2 text-steel-500 text-sm">
                  <SlidersHorizontal size={14} />
                  <span>
                    {products.total > 0
                      ? `Showing ${(page - 1) * 12 + 1}–${Math.min(page * 12, products.total)} of ${products.total}`
                      : 'No products found'}
                  </span>
                </div>
                {category && (
                  <span className="text-xs bg-navy-50 text-navy border border-navy-100 px-3 py-1 font-medium">
                    {categories.find((c) => c.slug === category)?.name || category}
                  </span>
                )}
              </div>

              {products.data.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {products.data.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  <Suspense>
                    <HomePagination currentPage={page} totalPages={products.totalPages} />
                  </Suspense>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center bg-white shadow-card">
                  <div className="text-steel-200 text-8xl font-black mb-4">?</div>
                  <h3 className="text-steel-700 font-bold text-lg mb-2">No Products Found</h3>
                  <p className="text-steel-400 text-sm">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
