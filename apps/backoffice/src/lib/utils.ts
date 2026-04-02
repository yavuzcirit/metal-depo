import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageUrl(path: string | null | undefined): string {
  if (!path) return ''
  if (path.startsWith('http')) return path
  const base =
    (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api').replace('/api', '')
  return `${base}${path}`
}
