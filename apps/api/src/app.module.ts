import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module'
import { ProductsModule } from './products/products.module'
import { CategoriesModule } from './categories/categories.module'
import { BannersModule } from './banners/banners.module'
import { PagesModule } from './pages/pages.module'
import { ContactModule } from './contact/contact.module'
import { UploadModule } from './upload/upload.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ProductsModule,
    CategoriesModule,
    BannersModule,
    PagesModule,
    ContactModule,
    UploadModule,
  ],
})
export class AppModule {}
