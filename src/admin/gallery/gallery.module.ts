import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gallery } from './entities/gallery.entity';
import { ProductModule } from '../product/product.module';

@Module({
  imports:[TypeOrmModule.forFeature([Gallery]),ProductModule],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
