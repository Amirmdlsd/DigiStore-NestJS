import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import * as fs from 'fs';
import { join } from 'path';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository:Repository<Product>,
    private readonly categoryService:CategoryService
  ){}
 async create(createProductDto: CreateProductDto,image:Express.Multer.File) {
    const category = await this.categoryService.findOne(createProductDto.category_id);
    if(!category){
      throw new Error("category not found");
    }
    const product =await this.productRepository.create({
      category,
      ...createProductDto
    });
    return  await this.productRepository.save(product);
  }

 async findAll() {
    return await this.productRepository.find();
    
  }

 async findOne(id: number) {
  return await this.productRepository.findOneByOrFail({id});

  }

  async update(id: number, updateProductDto: UpdateProductDto,image:Express.Multer.File) {
    const Product = await this.productRepository.findOneByOrFail({id});
      const category = await this.categoryService.findOne(updateProductDto.category_id);
    if(!category){
      throw new Error("category not found");
    }
    if(fs.existsSync(join(__dirname,'../../../uploads/product'))){
      fs.unlinkSync(join(__dirname,'../../../uploads/product',Product.image));
    }
    Product.title = updateProductDto.title??Product.title;
    Product.image = image.filename??Product.image;
    Product.price = updateProductDto.price??Product.price;
    Product.discount = updateProductDto.discount??Product.discount;
    Product.description = updateProductDto.description??Product.description;
    Product.quantity = updateProductDto.quantity??Product.quantity;
    Product.category = category;
    return await this.productRepository.save(Product);
  

  }

  async remove(id: number) {
    const product = await this.productRepository.findOneByOrFail({id});
    if(fs.existsSync(join(__dirname,'../../../uploads/product'))){
      fs.unlinkSync(join(__dirname,'../../../uploads/product', product.image));
    }
    return await this.productRepository.delete(id);
  }
}
