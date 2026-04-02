'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { Modal } from '@/components/ui/Modal'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { PageContentForm } from '@/components/pages/PageContentForm'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import type { PageContent } from '@metal-depo/types'

export default function PagesPage() {
  const [editTarget, setEditTarget] = useState<PageContent | null | 'new'>(null)
  const [deleteKey, setDeleteKey] = useState<string | null>(null)
  const qc = useQueryClient()

  const { data = [], isLoading } = useQuery<PageContent[]>({
    queryKey: ['page-contents'],
    queryFn: () => api.getPageContents() as Promise<PageContent[]>,
  })

  const deleteMut = useMutation({
    mutationFn: (key: string) => api.deletePageContent(key),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['page-contents'] }); setDeleteKey(null) },
  })

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Page Content</h2>
          <p className="text-sm text-gray-400 mt-0.5">Manage editable content blocks across pages</p>
        </div>
        <button onClick={() => setEditTarget('new')} className="btn-primary">
          <Plus size={15} />
          Add Content Block
        </button>
      </div>

      <div className="card divide-y divide-gray-50">
        {isLoading ? (
          <div className="py-12 text-center text-sm text-gray-400">Loading…</div>
        ) : data.length === 0 ? (
          <div className="py-12 text-center text-sm text-gray-400">
            No content blocks yet. Create your first one!
          </div>
        ) : (
          data.map((item) => (
            <div key={item.key} className="flex items-start justify-between gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {item.key}
                  </span>
                  {item.title && (
                    <span className="text-sm font-medium text-gray-700">{item.title}</span>
                  )}
                </div>
                {item.content && (
                  <p className="text-sm text-gray-500 truncate">{item.content.slice(0, 120)}…</p>
                )}
                <p className="text-xs text-gray-300 mt-1">
                  Updated {new Date(item.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => setEditTarget(item)} className="btn-ghost h-8 w-8 p-0">
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => setDeleteKey(item.key)}
                  className="btn-ghost h-8 w-8 p-0 hover:text-red-500"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        title={editTarget === 'new' ? 'New Content Block' : `Edit: ${(editTarget as PageContent)?.key}`}
        size="lg"
      >
        <PageContentForm
          content={editTarget === 'new' ? undefined : (editTarget as PageContent)}
          onSuccess={() => setEditTarget(null)}
        />
      </Modal>

      <ConfirmDialog
        open={!!deleteKey}
        onClose={() => setDeleteKey(null)}
        onConfirm={() => deleteKey && deleteMut.mutate(deleteKey)}
        message={`Delete content block "${deleteKey}"?`}
        loading={deleteMut.isPending}
      />
    </div>
  )
}
