/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ){}
  async create(createCategoryDto: CreateCategoryDto,image:Express.Multer.File) {
   const category = this.categoryRepository.create({...createCategoryDto,image:image.filename});

   return await this.categoryRepository.save(category);
  }

  findAll() {
    return this.categoryRepository.find({relations:['parent']});
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOneBy({id})
  }

 async update(id: number, updateCategoryDto: UpdateCategoryDto,image:Express.Multer.File) {
  let list :Category[]=[];
    const category = await this.categoryRepository.findOneBy({id});
    if(!category){
      throw new BadRequestException("دسته بندی یافت نشد");
    }
    if(fs.existsSync(join(__dirname,"../../../uploads/category/",category.image))){
      fs.unlinkSync(join(__dirname,"../../../uploads/category/",category.image));
      category.image = image.filename
    }
    category.title = updateCategoryDto.title;
    updateCategoryDto.parent_id.forEach(async(category_id) => {
      const category = await this.categoryRepository.findOne({where:{id:category_id}})
        list.push(category);
        console.log(list);
        
    })
    category.children = list;
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
