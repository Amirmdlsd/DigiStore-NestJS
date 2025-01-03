import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CategoryModule } from '../category/category.module';
import { diskStorage } from 'multer';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:[
      MulterModule.register({storage:diskStorage({
          destination:join(__dirname,"../../../uploads/products/")
        })}),
    TypeOrmModule.forFeature([Product]),
  CategoryModule
],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
