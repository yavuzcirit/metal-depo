const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    cache: 'no-store',
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }))
    throw new Error(err.message || `HTTP ${res.status}`)
  }
  return res.json()
}

export const api = {
  // Products
  getProducts: (params = '') => apiFetch(`/products/admin/all${params ? `?${params}` : ''}`),
  getProduct: (id: string) => apiFetch(`/products/${id}`),
  createProduct: (data: unknown) =>
    apiFetch('/products', { method: 'POST', body: JSON.stringify(data) }),
  updateProduct: (id: string, data: unknown) =>
    apiFetch(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProduct: (id: string) => apiFetch(`/products/${id}`, { method: 'DELETE' }),

  // Categories
  getCategories: () => apiFetch('/categories'),
  getCategory: (id: string) => apiFetch(`/categories/${id}`),
  createCategory: (data: unknown) =>
    apiFetch('/categories', { method: 'POST', body: JSON.stringify(data) }),
  updateCategory: (id: string, data: unknown) =>
    apiFetch(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCategory: (id: string) => apiFetch(`/categories/${id}`, { method: 'DELETE' }),

  // Banners
  getBanners: (page?: string) => apiFetch(`/banners${page ? `?page=${page}` : ''}`),
  getBanner: (id: string) => apiFetch(`/banners/${id}`),
  createBanner: (data: unknown) =>
    apiFetch('/banners', { method: 'POST', body: JSON.stringify(data) }),
  updateBanner: (id: string, data: unknown) =>
    apiFetch(`/banners/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteBanner: (id: string) => apiFetch(`/banners/${id}`, { method: 'DELETE' }),

  // Page Content
  getPageContents: () => apiFetch('/pages'),
  upsertPageContent: (data: unknown) =>
    apiFetch('/pages', { method: 'POST', body: JSON.stringify(data) }),
  deletePageContent: (key: string) => apiFetch(`/pages/${key}`, { method: 'DELETE' }),

  // Contact
  getMessages: (unread?: boolean) =>
    apiFetch(`/contact${unread ? '?unread=true' : ''}`),
  markRead: (id: string) => apiFetch(`/contact/${id}/read`, { method: 'PATCH' }),
  deleteMessage: (id: string) => apiFetch(`/contact/${id}`, { method: 'DELETE' }),
  getContactStats: () => apiFetch('/contact/stats'),

  // Upload
  uploadImage: async (file: File) => {
    const form = new FormData()
    form.append('file', file)
    const res = await fetch(`${API_URL}/upload/image`, { method: 'POST', body: form })
    if (!res.ok) throw new Error('Upload failed')
    return res.json() as Promise<{ url: string; filename: string }>
  },
}
