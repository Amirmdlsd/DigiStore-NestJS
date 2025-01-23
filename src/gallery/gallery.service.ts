import { Injectable } from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gallery } from './entities/gallery.entity';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepository: Repository<Gallery>,
    private readonly productService:ProductService
  ){}
 async create(image:Express.Multer.File[],id:number) {
  const product = await this.productService.findOne(id);
    const gallery = await this.galleryRepository.create({
      image:image.map(i=>i.filename),
      product
    });
  }

  findAll() {
    return `This action returns all gallery`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gallery`;
  }

  update(id: number, updateGalleryDto: UpdateGalleryDto) {
    return `This action updates a #${id} gallery`;
  }

  remove(id: number) {
    return `This action removes a #${id} gallery`;
  }
}
