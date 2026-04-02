'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  Tag,
  Image,
  FileText,
  MessageSquare,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const nav = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Products', href: '/products', icon: Package },
  { label: 'Categories', href: '/categories', icon: Tag },
  { label: 'Banners', href: '/banners', icon: Image },
  { label: 'Page Content', href: '/pages', icon: FileText },
  { label: 'Messages', href: '/messages', icon: MessageSquare },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-60 flex-col bg-sidebar border-r border-white/5 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/5">
        <div className="flex h-8 w-8 items-center justify-center bg-gold-DEFAULT">
          <span className="text-[11px] font-black text-navy-950">MD</span>
        </div>
        <div>
          <p className="text-white text-sm font-bold tracking-wide leading-none">
            METAL<span className="text-gold-DEFAULT">DEPO</span>
          </p>
          <p className="text-white/30 text-[10px] mt-0.5">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {nav.map(({ label, href, icon: Icon }) => {
          const isActive =
            href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-white/50 hover:bg-white/5 hover:text-white/80',
              )}
            >
              <Icon size={16} className={isActive ? 'text-gold-DEFAULT' : ''} />
              <span>{label}</span>
              {isActive && <ChevronRight size={12} className="ml-auto text-gold-DEFAULT/50" />}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/5 px-4 py-4">
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-white/30 text-xs hover:text-white/60 transition-colors"
        >
          <ExternalLink size={12} />
          View Portfolio Site
        </a>
      </div>
    </aside>
  )
}
