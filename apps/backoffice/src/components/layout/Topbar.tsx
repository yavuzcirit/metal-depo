'use client'

import { usePathname } from 'next/navigation'
import { Bell } from 'lucide-react'

const titles: Record<string, string> = {
  '/': 'Dashboard',
  '/products': 'Products',
  '/categories': 'Categories',
  '/banners': 'Banners',
  '/pages': 'Page Content',
  '/messages': 'Messages',
}

export function Topbar() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const key = '/' + (segments[0] || '')
  const title = titles[key] || segments[0] || 'Dashboard'

  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-6 shrink-0">
      <div>
        <h1 className="text-sm font-semibold text-gray-800">{title}</h1>
        <p className="text-xs text-gray-400 capitalize">
          {segments.join(' / ') || 'Overview'}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button className="relative flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
          <Bell size={16} />
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-DEFAULT text-white text-xs font-bold">
          A
        </div>
      </div>
    </header>
  )
}
