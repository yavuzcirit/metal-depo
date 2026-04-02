'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isTransparent = pathname === '/' && !scrolled && !isOpen

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isTransparent
          ? 'bg-transparent'
          : 'bg-navy-950/95 backdrop-blur-md border-b border-white/5 shadow-lg',
      )}
      style={{ height: 'var(--header-height)' }}
    >
      <div className="container-wide flex h-full items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center bg-gold-DEFAULT">
            <span className="text-navy-900 font-black text-sm tracking-tight">MD</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg leading-none tracking-wider">
              METAL<span className="text-gold-DEFAULT">DEPO</span>
            </span>
            <span className="text-white/40 text-[9px] uppercase tracking-widest">
              Premium Industrial Supply
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative px-4 py-2 text-sm font-medium uppercase tracking-widest transition-colors duration-200',
                pathname === link.href
                  ? 'text-gold-DEFAULT'
                  : 'text-white/70 hover:text-white',
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute bottom-0 left-4 right-4 h-px bg-gold-DEFAULT" />
              )}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/contact" className="btn-gold text-xs px-6 py-2.5">
            Get a Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 bg-navy-950 border-t border-white/5',
          isOpen ? 'max-h-96 py-4' : 'max-h-0',
        )}
      >
        <div className="container-wide flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                'px-4 py-3 text-sm font-medium uppercase tracking-widest border-b border-white/5',
                pathname === link.href ? 'text-gold-DEFAULT' : 'text-white/70',
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="mt-3 btn-gold text-center text-xs"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </header>
  )
}
