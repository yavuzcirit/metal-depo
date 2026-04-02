import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { QueryProductDto } from './dto/query-product.dto'
import { generateSlug } from '../common/slug.util'

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: QueryProductDto) {
    const { page = 1, limit = 12, category, search, featured, active, sort = 'order', order = 'asc' } = query

    const where: any = {}

    if (active !== undefined) where.active = active
    else where.active = true // default to active only for public

    if (featured !== undefined) where.featured = featured

    if (category) {
      const cat = await this.prisma.category.findFirst({
        where: { OR: [{ id: category }, { slug: category }] },
      })
      if (cat) where.categoryId = cat.id
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        orderBy: { [sort]: order },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          category: { select: { id: true, name: true, slug: true } },
        },
      }),
      this.prisma.product.count({ where }),
    ])

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  }

  async findAllAdmin(query: QueryProductDto) {
    const { page = 1, limit = 12, category, search, featured, active, sort = 'order', order = 'asc' } = query

    const where: any = {}
    if (active !== undefined) where.active = active
    if (featured !== undefined) where.featured = featured

    if (category) {
      const cat = await this.prisma.category.findFirst({
        where: { OR: [{ id: category }, { slug: category }] },
      })
      if (cat) where.categoryId = cat.id
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        orderBy: { [sort]: order },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          category: { select: { id: true, name: true, slug: true } },
        },
      }),
      this.prisma.product.count({ where }),
    ])

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) }
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    })
    if (!product) throw new NotFoundException(`Product ${id} not found`)
    return product
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    })
    if (!product) throw new NotFoundException(`Product not found`)
    return product
  }

  async create(dto: CreateProductDto) {
    const slug = dto.slug || generateSlug(`${dto.name}-${dto.code}`)

    const [codeExists, slugExists] = await Promise.all([
      this.prisma.product.findUnique({ where: { code: dto.code } }),
      this.prisma.product.findUnique({ where: { slug } }),
    ])

    if (codeExists) throw new ConflictException(`Product code "${dto.code}" already exists`)
    if (slugExists) throw new ConflictException(`Slug "${slug}" already exists`)

    return this.prisma.product.create({
      data: { ...dto, slug },
      include: { category: true },
    })
  }

  async update(id: string, dto: UpdateProductDto) {
    await this.findOne(id)

    if (dto.code) {
      const conflict = await this.prisma.product.findFirst({
        where: { code: dto.code, id: { not: id } },
      })
      if (conflict) throw new ConflictException(`Product code "${dto.code}" already exists`)
    }

    return this.prisma.product.update({
      where: { id },
      data: dto,
      include: { category: true },
    })
  }

  async remove(id: string) {
    await this.findOne(id)
    return this.prisma.product.delete({ where: { id } })
  }

  async getFeatured(limit = 8) {
    return this.prisma.product.findMany({
      where: { active: true, featured: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      take: limit,
      include: { category: { select: { id: true, name: true, slug: true } } },
    })
  }

  async getRelated(productId: string, categoryId: string, limit = 4) {
    return this.prisma.product.findMany({
      where: { active: true, categoryId, id: { not: productId } },
      orderBy: { order: 'asc' },
      take: limit,
      include: { category: { select: { id: true, name: true, slug: true } } },
    })
  }
}
