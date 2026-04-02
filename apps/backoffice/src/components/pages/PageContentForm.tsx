'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { Loader2 } from 'lucide-react'
import type { PageContent } from '@metal-depo/types'

const schema = z.object({
  key: z.string().min(1, 'Required').regex(/^[a-z0-9_]+$/, 'Only lowercase, numbers and underscores'),
  title: z.string().optional(),
  content: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export function PageContentForm({
  content,
  onSuccess,
}: {
  content?: PageContent
  onSuccess: () => void
}) {
  const qc = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data: FormData) => api.upsertPageContent(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['page-contents'] }); onSuccess() },
  })

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      key: content?.key || '',
      title: content?.title || '',
      content: content?.content || '',
    },
  })

  return (
    <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-4">
      <div>
        <label className="label">Content Key *</label>
        <input
          {...register('key')}
          className="input font-mono"
          placeholder="e.g. home_about_text"
          disabled={!!content}
        />
        <p className="mt-1 text-xs text-gray-400">
          Unique identifier used in code. Lowercase, numbers, underscores only.
        </p>
        {errors.key && <p className="mt-1 text-xs text-red-500">{errors.key.message}</p>}
      </div>
      <div>
        <label className="label">Title</label>
        <input {...register('title')} className="input" placeholder="Section heading or label" />
      </div>
      <div>
        <label className="label">Content</label>
        <textarea
          {...register('content')}
          rows={8}
          className="input resize-y font-mono text-xs"
          placeholder="Content text or HTML…"
        />
      </div>

      {mutation.isError && (
        <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded">
          {(mutation.error as Error).message}
        </p>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onSuccess} className="btn-outline">Cancel</button>
        <button type="submit" disabled={mutation.isPending} className="btn-primary">
          {mutation.isPending && <Loader2 size={14} className="animate-spin" />}
          {content ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  )
}
