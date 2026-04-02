import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseBoolPipe, DefaultValuePipe } from '@nestjs/common'
import { BannersService } from './banners.service'
import { CreateBannerDto } from './dto/create-banner.dto'
import { UpdateBannerDto } from './dto/update-banner.dto'

@Controller('banners')
export class BannersController {
  constructor(private readonly service: BannersService) {}

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('active', new DefaultValuePipe(false), ParseBoolPipe) active?: boolean,
  ) {
    return this.service.findAll(page, active)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id)
  }

  @Post()
  create(@Body() dto: CreateBannerDto) {
    return this.service.create(dto)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBannerDto) {
    return this.service.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id)
  }
}
