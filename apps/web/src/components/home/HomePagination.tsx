'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HomePaginationProps {
  currentPage: number
  totalPages: number
}

export function HomePagination({ currentPage, totalPages }: HomePaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  if (totalPages <= 1) return null

  const goTo = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(page))
    router.push(`/?${params.toString()}`)
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2,
  )

  const renderPages: (number | '...')[] = []
  for (let i = 0; i < pages.length; i++) {
    if (i > 0 && pages[i] - pages[i - 1] > 1) renderPages.push('...')
    renderPages.push(pages[i])
  }

  return (
    <div className="flex items-center justify-center gap-1 mt-12">
      <button
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex h-9 w-9 items-center justify-center border border-steel-200 text-steel-600 hover:border-navy hover:text-navy disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={15} />
      </button>

      {renderPages.map((p, i) =>
        p === '...' ? (
          <span key={`dots-${i}`} className="flex h-9 w-9 items-center justify-center text-steel-400 text-sm">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => goTo(p as number)}
            className={cn(
              'flex h-9 w-9 items-center justify-center text-sm font-medium transition-colors',
              currentPage === p
                ? 'bg-navy text-white border border-navy'
                : 'border border-steel-200 text-steel-600 hover:border-navy hover:text-navy',
            )}
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex h-9 w-9 items-center justify-center border border-steel-200 text-steel-600 hover:border-navy hover:text-navy disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={15} />
      </button>
    </div>
  )
}
