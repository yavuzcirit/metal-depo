import type { Product, Category, Banner, PageContent, PaginatedResponse, ContactMessage } from '@metal-depo/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

async function fetcher<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(error.message || `HTTP ${res.status}`)
  }
  return res.json()
}

// Products
export const getProducts = (params: Record<string, string | number | boolean> = {}) => {
  const qs = new URLSearchParams(params as any).toString()
  return fetcher<PaginatedResponse<Product>>(`/products${qs ? `?${qs}` : ''}`, {
    next: { revalidate: 60 },
  })
}

export const getProduct = (slug: string) =>
  fetcher<Product>(`/products/slug/${slug}`, { next: { revalidate: 60 } })

export const getFeaturedProducts = (limit = 8) =>
  fetcher<Product[]>(`/products/featured?limit=${limit}`, { next: { revalidate: 60 } })

export const getRelatedProducts = (id: string, categoryId: string, limit = 4) =>
  fetcher<Product[]>(`/products/${id}/related?categoryId=${categoryId}&limit=${limit}`, {
    next: { revalidate: 60 },
  })

// Categories
export const getCategories = (activeOnly = true) =>
  fetcher<Category[]>(`/categories?active=${activeOnly}`, { next: { revalidate: 300 } })

export const getCategoryBySlug = (slug: string) =>
  fetcher<Category>(`/categories/slug/${slug}`, { next: { revalidate: 300 } })

// Banners
export const getBanners = (page = 'home', activeOnly = true) =>
  fetcher<Banner[]>(`/banners?page=${page}&active=${activeOnly}`, { next: { revalidate: 300 } })

// Page Content
export const getPageContent = (keys: string[]) =>
  fetcher<Record<string, PageContent>>(`/pages/many?keys=${keys.join(',')}`, {
    next: { revalidate: 300 },
  })

export const getPageContentByKey = (key: string) =>
  fetcher<PageContent | null>(`/pages/${key}`, { next: { revalidate: 300 } })

// Contact
export const submitContact = (data: {
  name: string
  email: string
  company?: string
  phone?: string
  message: string
}) => fetcher<ContactMessage>('/contact', { method: 'POST', body: JSON.stringify(data) })
