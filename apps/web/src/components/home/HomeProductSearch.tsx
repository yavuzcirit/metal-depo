'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { useRef, useTransition } from 'react'

export function HomeProductSearch({ value }: { value?: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()
  const ref = useRef<HTMLInputElement>(null)

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (term) {
      params.set('search', term)
    } else {
      params.delete('search')
    }
    params.delete('page')
    startTransition(() => {
      router.push(`/?${params.toString()}`)
    })
  }

  return (
    <div className="relative">
      <Search
        size={15}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-steel-400 pointer-events-none"
      />
      <input
        ref={ref}
        type="text"
        defaultValue={value}
        placeholder="Search products, codes..."
        className="input-base pl-10 pr-10"
        onChange={(e) => {
          const timer = setTimeout(() => handleSearch(e.target.value), 400)
          return () => clearTimeout(timer)
        }}
      />
      {value && (
        <button
          onClick={() => {
            if (ref.current) ref.current.value = ''
            handleSearch('')
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-steel-400 hover:text-steel-600"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
