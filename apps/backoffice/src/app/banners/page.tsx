'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { DataTable } from '@/components/ui/DataTable'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { Modal } from '@/components/ui/Modal'
import { BannerForm } from '@/components/banners/BannerForm'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import Image from 'next/image'
import type { Banner } from '@metal-depo/types'
import { getImageUrl } from '@/lib/utils'

export default function BannersPage() {
  const [editTarget, setEditTarget] = useState<Banner | null | 'new'>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const qc = useQueryClient()

  const { data = [], isLoading } = useQuery<Banner[]>({
    queryKey: ['banners'],
    queryFn: () => api.getBanners() as Promise<Banner[]>,
  })

  const deleteMut = useMutation({
    mutationFn: (id: string) => api.deleteBanner(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['banners'] }); setDeleteId(null) },
  })

  const columns = [
    {
      key: 'image',
      header: '',
      cell: (row: Banner) => (
        <div className="relative h-12 w-20 bg-gray-100 overflow-hidden rounded">
          <Image
            src={getImageUrl(row.image) || '/placeholder.jpg'}
            alt={row.title}
            fill
            className="object-cover"
          />
        </div>
      ),
      className: 'w-24',
    },
    {
      key: 'title',
      header: 'Title',
      cell: (row: Banner) => (
        <div>
          <p className="font-medium text-gray-800 text-sm">{row.title}</p>
          {row.subtitle && <p className="text-xs text-gray-400">{row.subtitle}</p>}
        </div>
      ),
    },
    {
      key: 'page',
      header: 'Page',
      cell: (row: Banner) => (
        <span className="badge badge-blue capitalize">{row.page}</span>
      ),
      className: 'w-24',
    },
    {
      key: 'order',
      header: 'Order',
      cell: (row: Banner) => <span className="text-sm text-gray-500">{row.order}</span>,
      className: 'w-20',
    },
    {
      key: 'status',
      header: 'Status',
      cell: (row: Banner) => (
        <span className={row.active ? 'badge badge-green' : 'badge badge-red'}>
          {row.active ? 'Active' : 'Inactive'}
        </span>
      ),
      className: 'w-24',
    },
    {
      key: 'actions',
      header: '',
      cell: (row: Banner) => (
        <div className="flex items-center justify-end gap-1">
          <button onClick={() => setEditTarget(row)} className="btn-ghost h-8 w-8 p-0">
            <Pencil size={14} />
          </button>
          <button
            onClick={() => setDeleteId(row.id)}
            className="btn-ghost h-8 w-8 p-0 hover:text-red-500"
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
          <h2 className="text-xl font-bold text-gray-800">Banners</h2>
          <p className="text-sm text-gray-400 mt-0.5">{data.length} banners</p>
        </div>
        <button onClick={() => setEditTarget('new')} className="btn-primary">
          <Plus size={15} />
          Add Banner
        </button>
      </div>

      <div className="card">
        <DataTable
          columns={columns}
          data={data}
          isLoading={isLoading}
          keyExtractor={(r) => r.id}
          emptyMessage="No banners yet."
        />
      </div>

      <Modal
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        title={editTarget === 'new' ? 'New Banner' : `Edit Banner`}
        size="lg"
      >
        <BannerForm
          banner={editTarget === 'new' ? undefined : (editTarget as Banner)}
          onSuccess={() => setEditTarget(null)}
        />
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteMut.mutate(deleteId)}
        message="Delete this banner?"
        loading={deleteMut.isPending}
      />
    </div>
  )
}
