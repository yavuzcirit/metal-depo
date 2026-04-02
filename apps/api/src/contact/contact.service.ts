import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateContactDto } from './dto/create-contact.dto'

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateContactDto) {
    return this.prisma.contactMessage.create({ data: dto })
  }

  async findAll(unreadOnly = false) {
    return this.prisma.contactMessage.findMany({
      where: unreadOnly ? { read: false } : undefined,
      orderBy: { createdAt: 'desc' },
    })
  }

  async findOne(id: string) {
    const msg = await this.prisma.contactMessage.findUnique({ where: { id } })
    if (!msg) throw new NotFoundException(`Message ${id} not found`)
    return msg
  }

  async markRead(id: string) {
    await this.findOne(id)
    return this.prisma.contactMessage.update({ where: { id }, data: { read: true } })
  }

  async remove(id: string) {
    await this.findOne(id)
    return this.prisma.contactMessage.delete({ where: { id } })
  }

  async getStats() {
    const [total, unread] = await Promise.all([
      this.prisma.contactMessage.count(),
      this.prisma.contactMessage.count({ where: { read: false } }),
    ])
    return { total, unread }
  }
}
