import { Controller, Get, Post, Patch, Delete, Body, Param, Query, ParseBoolPipe, DefaultValuePipe } from '@nestjs/common'
import { ContactService } from './contact.service'
import { CreateContactDto } from './dto/create-contact.dto'

@Controller('contact')
export class ContactController {
  constructor(private readonly service: ContactService) {}

  @Post()
  create(@Body() dto: CreateContactDto) {
    return this.service.create(dto)
  }

  @Get()
  findAll(@Query('unread', new DefaultValuePipe(false), ParseBoolPipe) unread: boolean) {
    return this.service.findAll(unread)
  }

  @Get('stats')
  getStats() {
    return this.service.getStats()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id)
  }

  @Patch(':id/read')
  markRead(@Param('id') id: string) {
    return this.service.markRead(id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id)
  }
}
