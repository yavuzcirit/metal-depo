'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { Loader2 } from 'lucide-react'
import type { Category } from '@metal-depo/types'

const schema = z.object({
  name: z.string().min(1, 'Required'),
  description: z.string().optional(),
  active: z.boolean().default(true),
  order: z.coerce.number().int().min(0).default(0),
})

type FormData = z.infer<typeof schema>

export function CategoryForm({
  category,
  onSuccess,
}: {
  category?: Category
  onSuccess: () => void
}) {
  const qc = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      category ? api.updateCategory(category.id, data) : api.createCategory(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['categories'] })
      onSuccess()
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: category?.name || '',
      description: category?.description || '',
      active: category?.active ?? true,
      order: category?.order ?? 0,
    },
  })

  return (
    <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-4">
      <div>
        <label className="label">Name *</label>
        <input {...register('name')} className="input" placeholder="e.g. Steel Products" />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label className="label">Description</label>
        <textarea {...register('description')} rows={3} className="input resize-none" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Display Order</label>
          <input {...register('order')} type="number" min="0" className="input" />
        </div>
        <div className="flex items-end pb-0.5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input {...register('active')} type="checkbox" className="h-4 w-4 rounded" />
            <span className="text-sm text-gray-600">Active</span>
          </label>
        </div>
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
          {category ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  )
}
