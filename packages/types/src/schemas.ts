import { z } from 'zod'

// ─── Category ───────────────────────────────────────────────────────────────

export const CreateCategorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers and hyphens')
    .optional(),
  description: z.string().max(500).optional().nullable(),
  image: z.string().url().optional().nullable(),
  active: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
})

export const UpdateCategorySchema = CreateCategorySchema.partial()

export type CreateCategoryDto = z.infer<typeof CreateCategorySchema>
export type UpdateCategoryDto = z.infer<typeof UpdateCategorySchema>

// ─── Product ────────────────────────────────────────────────────────────────

export const CreateProductSchema = z.object({
  code: z.string().min(1, 'Product code is required').max(50),
  name: z.string().min(1, 'Name is required').max(200),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  description: z.string().max(1000).optional().nullable(),
  details: z.string().optional().nullable(),
  price: z.number().positive().optional().nullable(),
  unit: z.string().max(20).optional().nullable(),
  images: z.array(z.string()).default([]),
  categoryId: z.string().min(1, 'Category is required'),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
})

export const UpdateProductSchema = CreateProductSchema.partial()

export const ProductQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
  category: z.string().optional(),
  search: z.string().optional(),
  featured: z.coerce.boolean().optional(),
  active: z.coerce.boolean().optional(),
  sort: z.enum(['name', 'code', 'createdAt', 'order']).default('order'),
  order: z.enum(['asc', 'desc']).default('asc'),
})

export type CreateProductDto = z.infer<typeof CreateProductSchema>
export type UpdateProductDto = z.infer<typeof UpdateProductSchema>
export type ProductQueryDto = z.infer<typeof ProductQuerySchema>

// ─── Banner ─────────────────────────────────────────────────────────────────

export const CreateBannerSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  subtitle: z.string().max(200).optional().nullable(),
  description: z.string().max(500).optional().nullable(),
  image: z.string().min(1, 'Image is required'),
  link: z.string().optional().nullable(),
  active: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
  page: z.string().default('home'),
})

export const UpdateBannerSchema = CreateBannerSchema.partial()

export type CreateBannerDto = z.infer<typeof CreateBannerSchema>
export type UpdateBannerDto = z.infer<typeof UpdateBannerSchema>

// ─── Page Content ────────────────────────────────────────────────────────────

export const UpsertPageContentSchema = z.object({
  key: z.string().min(1),
  title: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  metadata: z.record(z.unknown()).optional().nullable(),
})

export type UpsertPageContentDto = z.infer<typeof UpsertPageContentSchema>

// ─── Contact ─────────────────────────────────────────────────────────────────

export const ContactMessageSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  company: z.string().max(100).optional().nullable(),
  phone: z.string().max(20).optional().nullable(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
})

export type ContactMessageDto = z.infer<typeof ContactMessageSchema>
