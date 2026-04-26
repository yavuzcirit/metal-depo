'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { Category } from '@metal-depo/types'

interface HomeProductFiltersProps {
  categories: Category[]
  activeCategory?: string
}

export function HomeProductFilters({ categories, activeCategory }: HomeProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const setCategory = (slug: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (slug) {
      params.set('category', slug)
    } else {
      params.delete('category')
    }
    params.delete('page')
    router.push(`/?${params.toString()}`)
  }

  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-widest text-steel-600 mb-4">
        Categories
      </h3>
      <ul className="space-y-1">
        <li>
          <button
            onClick={() => setCategory(null)}
            className={cn(
              'w-full text-left px-3 py-2.5 text-sm transition-all duration-150 border-l-2',
              !activeCategory
                ? 'border-gold bg-navy-50 text-navy-900 font-semibold'
                : 'border-transparent text-steel-600 hover:border-steel-200 hover:text-steel-900 hover:bg-steel-50',
            )}
          >
            All Products
          </button>
        </li>
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              onClick={() => setCategory(cat.slug)}
              className={cn(
                'w-full text-left px-3 py-2.5 text-sm transition-all duration-150 border-l-2 flex items-center justify-between group',
                activeCategory === cat.slug
                  ? 'border-gold bg-navy-50 text-navy-900 font-semibold'
                  : 'border-transparent text-steel-600 hover:border-steel-200 hover:text-steel-900 hover:bg-steel-50',
              )}
            >
              <span>{cat.name}</span>
              {cat._count && (
                <span className="text-[11px] text-steel-400 group-hover:text-steel-500">
                  {cat._count.products}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
