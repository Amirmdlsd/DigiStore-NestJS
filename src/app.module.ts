/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './admin/category/category.module';
import { ProductModule } from './admin/product/product.module';
import { BrandModule } from './admin/brand/brand.module';
import { ColorModule } from './color/color.module';
import { ColorModule } from './admin/color/color.module';
import { GalleryModule } from './admin/gallery/gallery.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      host:'localhost',
      type:"mysql",
      port:3306,
      database:'digi_store',
      username:'root',
      password:'',

      synchronize:true,
      entities:[__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UsersModule,
    AuthModule,
    CategoryModule,
    ProductModule,
    BrandModule,
    ColorModule,
    GalleryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
