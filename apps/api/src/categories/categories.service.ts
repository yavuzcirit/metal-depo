import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { generateSlug } from '../common/slug.util'

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(activeOnly = false) {
    return this.prisma.category.findMany({
      where: activeOnly ? { active: true } : undefined,
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
      include: { _count: { select: { products: true } } },
    })
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { _count: { select: { products: true } } },
    })
    if (!category) throw new NotFoundException(`Category ${id} not found`)
    return category
  }

  async findBySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      include: { _count: { select: { products: true } } },
    })
    if (!category) throw new NotFoundException(`Category ${slug} not found`)
    return category
  }

  async create(dto: CreateCategoryDto) {
    const slug = dto.slug || generateSlug(dto.name)
    const exists = await this.prisma.category.findUnique({ where: { slug } })
    if (exists) throw new ConflictException(`Slug "${slug}" already exists`)

    return this.prisma.category.create({
      data: { ...dto, slug },
      include: { _count: { select: { products: true } } },
    })
  }

  async update(id: string, dto: UpdateCategoryDto) {
    await this.findOne(id)

    if (dto.name && !dto.slug) {
      dto.slug = generateSlug(dto.name)
    }

    if (dto.slug) {
      const conflict = await this.prisma.category.findFirst({
        where: { slug: dto.slug, id: { not: id } },
      })
      if (conflict) throw new ConflictException(`Slug "${dto.slug}" already exists`)
    }

    return this.prisma.category.update({
      where: { id },
      data: dto,
      include: { _count: { select: { products: true } } },
    })
  }

  async remove(id: string) {
    await this.findOne(id)
    return this.prisma.category.delete({ where: { id } })
  }
}
