'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { ImageUpload } from '@/components/ui/ImageUpload'
import { Loader2, X } from 'lucide-react'
import type { Category, Product } from '@metal-depo/types'
import { useState } from 'react'
import { getImageUrl } from '@/lib/utils'
import Image from 'next/image'

const schema = z.object({
  code: z.string().min(1, 'Required'),
  name: z.string().min(1, 'Required'),
  description: z.string().optional(),
  details: z.string().optional(),
  price: z.coerce.number().positive().optional().or(z.literal('')),
  unit: z.string().optional(),
  categoryId: z.string().min(1, 'Required'),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
  order: z.coerce.number().int().min(0).default(0),
})

type FormData = z.infer<typeof schema>

interface ProductFormProps {
  product?: Product
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter()
  const qc = useQueryClient()
  const [images, setImages] = useState<string[]>(product?.images || [])

  const { data: categories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => api.getCategories() as Promise<Category[]>,
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: product?.code || '',
      name: product?.name || '',
      description: product?.description || '',
      details: product?.details || '',
      price: product?.price || '',
      unit: product?.unit || '',
      categoryId: product?.categoryId || '',
      featured: product?.featured ?? false,
      active: product?.active ?? true,
      order: product?.order ?? 0,
    },
  })

  const mutation = useMutation({
    mutationFn: (data: FormData & { images: string[] }) =>
      product
        ? api.updateProduct(product.id, data)
        : api.createProduct(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products'] })
      router.push('/products')
    },
  })

  const onSubmit = (data: FormData) => {
    mutation.mutate({ ...data, images, price: data.price === '' ? undefined : Number(data.price) } as any)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Fields */}
        <div className="lg:col-span-2 space-y-5">
          <div className="card p-6 space-y-5">
            <h3 className="text-sm font-semibold text-gray-700 border-b pb-3">Basic Information</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Product Code *</label>
                <input {...register('code')} className="input" placeholder="e.g. ST-001" />
                {errors.code && <p className="mt-1 text-xs text-red-500">{errors.code.message}</p>}
              </div>
              <div>
                <label className="label">Category *</label>
                <select {...register('categoryId')} className="input">
                  <option value="">Select category…</option>
                  {categories?.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                {errors.categoryId && <p className="mt-1 text-xs text-red-500">{errors.categoryId.message}</p>}
              </div>
            </div>

            <div>
              <label className="label">Product Name *</label>
              <input {...register('name')} className="input" placeholder="Product name" />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <label className="label">Short Description</label>
              <textarea {...register('description')} rows={3} className="input resize-none" placeholder="Brief product description (shown in listings)" />
            </div>

            <div>
              <label className="label">Technical Details</label>
              <textarea {...register('details')} rows={5} className="input resize-none font-mono text-xs" placeholder="Detailed technical specifications, dimensions, grades..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Price (USD)</label>
                <input {...register('price')} type="number" step="0.01" className="input" placeholder="Leave blank to show 'Contact for price'" />
              </div>
              <div>
                <label className="label">Unit</label>
                <input {...register('unit')} className="input" placeholder="kg, ton, piece, m..." />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Status */}
          <div className="card p-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 border-b pb-3">Status</h3>
            <Controller
              name="active"
              control={control}
              render={({ field }) => (
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-gray-600">Active</span>
                  <button
                    type="button"
                    onClick={() => field.onChange(!field.value)}
                    className={`relative h-5 w-9 rounded-full transition-colors ${field.value ? 'bg-green-500' : 'bg-gray-200'}`}
                  >
                    <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${field.value ? 'left-4' : 'left-0.5'}`} />
                  </button>
                </label>
              )}
            />
            <Controller
              name="featured"
              control={control}
              render={({ field }) => (
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-gray-600">Featured</span>
                  <button
                    type="button"
                    onClick={() => field.onChange(!field.value)}
                    className={`relative h-5 w-9 rounded-full transition-colors ${field.value ? 'bg-amber-500' : 'bg-gray-200'}`}
                  >
                    <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${field.value ? 'left-4' : 'left-0.5'}`} />
                  </button>
                </label>
              )}
            />
            <div>
              <label className="label">Display Order</label>
              <input {...register('order')} type="number" min="0" className="input" />
            </div>
          </div>

          {/* Images */}
          <div className="card p-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 border-b pb-3">
              Images ({images.length})
            </h3>
            {images.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mb-3">
                {images.map((img, i) => (
                  <div key={i} className="relative aspect-square bg-gray-100 rounded overflow-hidden">
                    <Image src={getImageUrl(img)} alt={`img-${i}`} fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white"
                    >
                      <X size={10} />
                    </button>
                    {i === 0 && (
                      <span className="absolute bottom-1 left-1 text-[9px] bg-navy-DEFAULT text-white px-1.5 py-0.5">
                        Main
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
            <ImageUpload
              onChange={(url) => setImages((prev) => [...prev, url])}
            />
          </div>
        </div>
      </div>

      {/* Mutation error */}
      {mutation.isError && (
        <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-md">
          {(mutation.error as Error).message}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting || mutation.isPending}
          className="btn-primary"
        >
          {mutation.isPending && <Loader2 size={14} className="animate-spin" />}
          {product ? 'Update Product' : 'Create Product'}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-outline">
          Cancel
        </button>
      </div>
    </form>
  )
}
