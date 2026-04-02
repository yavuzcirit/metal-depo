import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number | null | undefined, unit?: string | null): string {
  if (!price) return 'Contact for price'
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price)
  return unit ? `${formatted} / ${unit}` : formatted
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length).trim() + '…'
}

export function getImageUrl(path: string | null | undefined): string {
  if (!path) return '/images/placeholder.jpg'
  if (path.startsWith('http')) return path
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:4000'
  return `${apiUrl}${path}`
}
