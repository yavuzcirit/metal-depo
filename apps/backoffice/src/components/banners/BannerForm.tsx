'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { ImageUpload } from '@/components/ui/ImageUpload'
import { Loader2 } from 'lucide-react'
import type { Banner } from '@metal-depo/types'

const schema = z.object({
  title: z.string().min(1, 'Required'),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  image: z.string().min(1, 'Image is required'),
  link: z.string().optional(),
  page: z.string().default('home'),
  active: z.boolean().default(true),
  order: z.coerce.number().int().min(0).default(0),
})

type FormData = z.infer<typeof schema>

export function BannerForm({ banner, onSuccess }: { banner?: Banner; onSuccess: () => void }) {
  const qc = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      banner ? api.updateBanner(banner.id, data) : api.createBanner(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['banners'] }); onSuccess() },
  })

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: banner?.title || '',
      subtitle: banner?.subtitle || '',
      description: banner?.description || '',
      image: banner?.image || '',
      link: banner?.link || '',
      page: banner?.page || 'home',
      active: banner?.active ?? true,
      order: banner?.order ?? 0,
    },
  })

  return (
    <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="label">Title *</label>
          <input {...register('title')} className="input" />
          {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
        </div>
        <div>
          <label className="label">Subtitle</label>
          <input {...register('subtitle')} className="input" />
        </div>
        <div>
          <label className="label">Page</label>
          <select {...register('page')} className="input">
            <option value="home">Home</option>
            <option value="products">Products</option>
            <option value="contact">Contact</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="label">Description</label>
          <textarea {...register('description')} rows={2} className="input resize-none" />
        </div>
        <div>
          <label className="label">Link (optional)</label>
          <input {...register('link')} className="input" placeholder="/products" />
        </div>
        <div>
          <label className="label">Display Order</label>
          <input {...register('order')} type="number" min="0" className="input" />
        </div>
        <div className="flex items-center gap-2 col-span-2">
          <input {...register('active')} type="checkbox" id="active" className="h-4 w-4 rounded" />
          <label htmlFor="active" className="text-sm text-gray-600 cursor-pointer">Active</label>
        </div>
      </div>

      <div>
        <label className="label">Banner Image *</label>
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <ImageUpload value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.image && <p className="mt-1 text-xs text-red-500">{errors.image.message}</p>}
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
          {banner ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  )
}
