'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { DataTable } from '@/components/ui/DataTable'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Eye } from 'lucide-react'
import { getImageUrl } from '@/lib/utils'
import type { Product, PaginatedResponse } from '@metal-depo/types'

export default function ProductsPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const qc = useQueryClient()

  const { data, isLoading } = useQuery<PaginatedResponse<Product>>({
    queryKey: ['products', page, search],
    queryFn: () => {
      const params = new URLSearchParams({ page: String(page), limit: '15' })
      if (search) params.set('search', search)
      return api.getProducts(params.toString()) as Promise<PaginatedResponse<Product>>
    },
  })

  const deleteMut = useMutation({
    mutationFn: (id: string) => api.deleteProduct(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['products'] }); setDeleteId(null) },
  })

  const columns = [
    {
      key: 'image',
      header: '',
      cell: (row: Product) => (
        <div className="relative h-10 w-14 bg-gray-100 rounded overflow-hidden shrink-0">
          {row.images?.[0] ? (
            <Image src={getImageUrl(row.images[0])} alt={row.name} fill className="object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-300 text-[10px]">
              IMG
            </div>
          )}
        </div>
      ),
      className: 'w-16',
    },
    {
      key: 'code',
      header: 'Code',
      cell: (row: Product) => (
        <span className="font-mono text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
          {row.code}
        </span>
      ),
      className: 'w-28',
    },
    {
      key: 'name',
      header: 'Name',
      cell: (row: Product) => (
        <div>
          <p className="font-medium text-gray-800 text-sm">{row.name}</p>
          <p className="text-xs text-gray-400">{row.category.name}</p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      cell: (row: Product) => (
        <div className="flex items-center gap-1.5">
          <span className={row.active ? 'badge-green badge' : 'badge-red badge'}>
            {row.active ? 'Active' : 'Inactive'}
          </span>
          {row.featured && <span className="badge badge-yellow">Featured</span>}
        </div>
      ),
      className: 'w-36',
    },
    {
      key: 'actions',
      header: '',
      cell: (row: Product) => (
        <div className="flex items-center justify-end gap-1">
          <a
            href={`http://localhost:3000/products/${row.slug}`}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost h-8 w-8 p-0"
            title="View on site"
          >
            <Eye size={14} />
          </a>
          <Link href={`/products/${row.id}/edit`} className="btn-ghost h-8 w-8 p-0" title="Edit">
            <Pencil size={14} />
          </Link>
          <button
            onClick={() => setDeleteId(row.id)}
            className="btn-ghost h-8 w-8 p-0 hover:text-red-500"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
      className: 'w-28 text-right',
    },
  ]

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Products</h2>
          <p className="text-sm text-gray-400 mt-0.5">{data?.total || 0} total products</p>
        </div>
        <Link href="/products/new" className="btn-primary">
          <Plus size={15} />
          Add Product
        </Link>
      </div>

      {/* Card */}
      <div className="card">
        {/* Search + Filter bar */}
        <div className="border-b border-gray-100 px-4 py-3">
          <input
            type="text"
            placeholder="Search by name or code…"
            className="input max-w-xs"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          />
        </div>

        <DataTable
          columns={columns}
          data={data?.data || []}
          isLoading={isLoading}
          keyExtractor={(r) => r.id}
          emptyMessage="No products found. Add your first product!"
        />

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
            <p className="text-xs text-gray-400">
              Page {page} of {data.totalPages}
            </p>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="btn-outline h-8 px-3 text-xs disabled:opacity-40"
              >
                Prev
              </button>
              <button
                disabled={page >= data.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="btn-outline h-8 px-3 text-xs disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteMut.mutate(deleteId)}
        message="Are you sure you want to delete this product? This action cannot be undone."
        loading={deleteMut.isPending}
      />
    </div>
  )
}
