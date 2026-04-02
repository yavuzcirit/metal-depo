'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { DataTable } from '@/components/ui/DataTable'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { Modal } from '@/components/ui/Modal'
import { CategoryForm } from '@/components/categories/CategoryForm'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import type { Category } from '@metal-depo/types'

export default function CategoriesPage() {
  const [editTarget, setEditTarget] = useState<Category | null | 'new'>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const qc = useQueryClient()

  const { data = [], isLoading } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => api.getCategories() as Promise<Category[]>,
  })

  const deleteMut = useMutation({
    mutationFn: (id: string) => api.deleteCategory(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['categories'] }); setDeleteId(null) },
  })

  const columns = [
    {
      key: 'name',
      header: 'Name',
      cell: (row: Category) => (
        <div>
          <p className="font-medium text-gray-800 text-sm">{row.name}</p>
          <p className="text-xs text-gray-400 font-mono">{row.slug}</p>
        </div>
      ),
    },
    {
      key: 'products',
      header: 'Products',
      cell: (row: Category) => (
        <span className="text-sm text-gray-600">{row._count?.products ?? 0}</span>
      ),
      className: 'w-24',
    },
    {
      key: 'order',
      header: 'Order',
      cell: (row: Category) => <span className="text-sm text-gray-500">{row.order}</span>,
      className: 'w-20',
    },
    {
      key: 'status',
      header: 'Status',
      cell: (row: Category) => (
        <span className={row.active ? 'badge badge-green' : 'badge badge-red'}>
          {row.active ? 'Active' : 'Inactive'}
        </span>
      ),
      className: 'w-24',
    },
    {
      key: 'actions',
      header: '',
      cell: (row: Category) => (
        <div className="flex items-center justify-end gap-1">
          <button onClick={() => setEditTarget(row)} className="btn-ghost h-8 w-8 p-0">
            <Pencil size={14} />
          </button>
          <button
            onClick={() => setDeleteId(row.id)}
            className="btn-ghost h-8 w-8 p-0 hover:text-red-500"
            disabled={!!row._count?.products}
            title={row._count?.products ? 'Cannot delete category with products' : 'Delete'}
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
      className: 'w-20 text-right',
    },
  ]

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Categories</h2>
          <p className="text-sm text-gray-400 mt-0.5">{data.length} categories</p>
        </div>
        <button onClick={() => setEditTarget('new')} className="btn-primary">
          <Plus size={15} />
          Add Category
        </button>
      </div>

      <div className="card">
        <DataTable
          columns={columns}
          data={data}
          isLoading={isLoading}
          keyExtractor={(r) => r.id}
          emptyMessage="No categories yet. Create your first one!"
        />
      </div>

      <Modal
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        title={editTarget === 'new' ? 'New Category' : `Edit: ${(editTarget as Category)?.name}`}
        size="md"
      >
        <CategoryForm
          category={editTarget === 'new' ? undefined : (editTarget as Category)}
          onSuccess={() => setEditTarget(null)}
        />
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteMut.mutate(deleteId)}
        message="Delete this category? Products in this category won't be deleted, but will lose their category."
        loading={deleteMut.isPending}
      />
    </div>
  )
}
