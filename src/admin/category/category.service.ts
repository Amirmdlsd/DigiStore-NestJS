/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ){}
  async create(createCategoryDto: CreateCategoryDto) {
   const category = this.categoryRepository.create({...createCategoryDto});

   return await this.categoryRepository.save(category);
  }

  findAll() {
    return this.categoryRepository.find({relations:['parent']});
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOneBy({id})
  }

 async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneBy({id});
    if(!category){
      throw new BadRequestException("دسته بندی یافت نشد");
    }
    if(fs.existsSync(category.image)){
      fs.unlinkSync(category.image);
    }
    category.title = updateCategoryDto.title;
    category.image = updateCategoryDto.image;
    return await this.categoryRepository.save(category);
  }

 async remove(id: number) {
    const category = await this.categoryRepository.findOneBy({id});
    if(!category){
      throw new BadRequestException("دسته بندی یافت نشد");
    }
    if(fs.existsSync(category.image)){
      fs.unlinkSync(category.image);
    }
    return await this.categoryRepository.delete(id);
  }
}
