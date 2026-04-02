export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image: string | null
  active: boolean
  order: number
  _count?: { products: number }
  createdAt: string
  updatedAt: string
}

export interface Product {
  id: string
  code: string
  name: string
  slug: string
  description: string | null
  details: string | null
  price: number | null
  unit: string | null
  images: string[]
  categoryId: string
  category: Category
  featured: boolean
  active: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export interface Banner {
  id: string
  title: string
  subtitle: string | null
  description: string | null
  image: string
  link: string | null
  active: boolean
  order: number
  page: string
  createdAt: string
  updatedAt: string
}

export interface PageContent {
  id: string
  key: string
  title: string | null
  content: string | null
  metadata: Record<string, unknown> | null
  updatedAt: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  company: string | null
  phone: string | null
  message: string
  read: boolean
  createdAt: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
