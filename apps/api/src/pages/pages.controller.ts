import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common'
import { PagesService } from './pages.service'
import { UpsertPageContentDto } from './dto/upsert-page-content.dto'

@Controller('pages')
export class PagesController {
  constructor(private readonly service: PagesService) {}

  @Get()
  findAll() {
    return this.service.findAll()
  }

  @Get('many')
  findMany(@Query('keys') keys: string) {
    return this.service.findMany(keys.split(','))
  }

  @Get(':key')
  findByKey(@Param('key') key: string) {
    return this.service.findByKey(key)
  }

  @Post()
  upsert(@Body() dto: UpsertPageContentDto) {
    return this.service.upsert(dto)
  }

  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.service.remove(key)
  }
}
