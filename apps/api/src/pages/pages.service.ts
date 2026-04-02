import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UpsertPageContentDto } from './dto/upsert-page-content.dto'

@Injectable()
export class PagesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.pageContent.findMany({ orderBy: { key: 'asc' } })
  }

  async findByKey(key: string) {
    return this.prisma.pageContent.findUnique({ where: { key } })
  }

  async findMany(keys: string[]) {
    const items = await this.prisma.pageContent.findMany({
      where: { key: { in: keys } },
    })
    return items.reduce(
      (acc, item) => {
        acc[item.key] = item
        return acc
      },
      {} as Record<string, (typeof items)[0]>,
    )
  }

  async upsert(dto: UpsertPageContentDto) {
    return this.prisma.pageContent.upsert({
      where: { key: dto.key },
      update: {
        title: dto.title,
        content: dto.content,
        metadata: dto.metadata as any,
      },
      create: {
        key: dto.key,
        title: dto.title,
        content: dto.content,
        metadata: dto.metadata as any,
      },
    })
  }

  async remove(key: string) {
    return this.prisma.pageContent.delete({ where: { key } })
  }
}
