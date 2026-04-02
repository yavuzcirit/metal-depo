'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { DataTable } from '@/components/ui/DataTable'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { Modal } from '@/components/ui/Modal'
import { Trash2, Mail, MailOpen, Building2, Phone } from 'lucide-react'
import type { ContactMessage } from '@metal-depo/types'

export default function MessagesPage() {
  const [viewMsg, setViewMsg] = useState<ContactMessage | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [unreadOnly, setUnreadOnly] = useState(false)
  const qc = useQueryClient()

  const { data = [], isLoading } = useQuery<ContactMessage[]>({
    queryKey: ['messages', unreadOnly],
    queryFn: () => api.getMessages(unreadOnly) as Promise<ContactMessage[]>,
  })

  const markReadMut = useMutation({
    mutationFn: (id: string) => api.markRead(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['messages'] }),
  })

  const deleteMut = useMutation({
    mutationFn: (id: string) => api.deleteMessage(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['messages'] }); setDeleteId(null) },
  })

  const handleView = (msg: ContactMessage) => {
    setViewMsg(msg)
    if (!msg.read) markReadMut.mutate(msg.id)
  }

  const columns = [
    {
      key: 'read',
      header: '',
      cell: (row: ContactMessage) => (
        row.read
          ? <MailOpen size={14} className="text-gray-300" />
          : <Mail size={14} className="text-blue-500" />
      ),
      className: 'w-8',
    },
    {
      key: 'sender',
      header: 'Sender',
      cell: (row: ContactMessage) => (
        <div>
          <p className={`text-sm ${row.read ? 'text-gray-600' : 'font-semibold text-gray-800'}`}>
            {row.name}
          </p>
          <p className="text-xs text-gray-400">{row.email}</p>
        </div>
      ),
    },
    {
      key: 'company',
      header: 'Company',
      cell: (row: ContactMessage) => (
        <span className="text-sm text-gray-500">{row.company || '—'}</span>
      ),
      className: 'w-36',
    },
    {
      key: 'preview',
      header: 'Message',
      cell: (row: ContactMessage) => (
        <p className="text-sm text-gray-500 truncate max-w-xs">{row.message}</p>
      ),
    },
    {
      key: 'date',
      header: 'Date',
      cell: (row: ContactMessage) => (
        <span className="text-xs text-gray-400">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
      className: 'w-24',
    },
    {
      key: 'actions',
      header: '',
      cell: (row: ContactMessage) => (
        <div className="flex items-center justify-end gap-1">
          <button onClick={() => handleView(row)} className="btn-ghost h-8 px-2 text-xs">
            View
          </button>
          <button
            onClick={() => setDeleteId(row.id)}
            className="btn-ghost h-8 w-8 p-0 hover:text-red-500"
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Messages</h2>
          <p className="text-sm text-gray-400 mt-0.5">{data.length} messages</p>
        </div>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={unreadOnly}
            onChange={(e) => setUnreadOnly(e.target.checked)}
            className="h-4 w-4 rounded"
          />
          Unread only
        </label>
      </div>

      <div className="card">
        <DataTable
          columns={columns}
          data={data}
          isLoading={isLoading}
          keyExtractor={(r) => r.id}
          emptyMessage="No messages yet."
        />
      </div>

      {/* View message modal */}
      <Modal
        open={!!viewMsg}
        onClose={() => setViewMsg(null)}
        title="Message Details"
        size="md"
      >
        {viewMsg && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="label">From</p>
                <p className="text-sm font-medium text-gray-800">{viewMsg.name}</p>
                <p className="text-xs text-gray-500">{viewMsg.email}</p>
              </div>
              {viewMsg.company && (
                <div>
                  <p className="label">Company</p>
                  <p className="text-sm text-gray-700 flex items-center gap-1">
                    <Building2 size={12} className="text-gray-400" />
                    {viewMsg.company}
                  </p>
                </div>
              )}
              {viewMsg.phone && (
                <div>
                  <p className="label">Phone</p>
                  <p className="text-sm text-gray-700 flex items-center gap-1">
                    <Phone size={12} className="text-gray-400" />
                    {viewMsg.phone}
                  </p>
                </div>
              )}
              <div>
                <p className="label">Date</p>
                <p className="text-sm text-gray-700">
                  {new Date(viewMsg.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <div>
              <p className="label">Message</p>
              <div className="rounded-md border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {viewMsg.message}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <a
                href={`mailto:${viewMsg.email}`}
                className="btn-primary text-xs"
              >
                Reply via Email
              </a>
              <button onClick={() => { setViewMsg(null); setDeleteId(viewMsg.id) }} className="btn-ghost text-red-500 text-xs">
                Delete Message
              </button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteMut.mutate(deleteId)}
        message="Delete this message permanently?"
        loading={deleteMut.isPending}
      />
    </div>
  )
}
