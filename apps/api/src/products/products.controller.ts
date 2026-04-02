import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { QueryProductDto } from './dto/query-product.dto'

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  // Public endpoints
  @Get()
  findAll(@Query() query: QueryProductDto) {
    return this.service.findAll(query)
  }

  @Get('featured')
  getFeatured(@Query('limit') limit = 8) {
    return this.service.getFeatured(+limit)
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.service.findBySlug(slug)
  }

  @Get(':id/related')
  getRelated(@Param('id') id: string, @Query('categoryId') categoryId: string) {
    return this.service.getRelated(id, categoryId)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id)
  }

  // Admin endpoints
  @Get('admin/all')
  findAllAdmin(@Query() query: QueryProductDto) {
    return this.service.findAllAdmin(query)
  }

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.service.create(dto)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.service.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id)
  }
}
