/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, Res, HttpStatus, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
 async create(
    @UploadedFile()image:Express.Multer.File,
    @Res() res:Response,
    @Body() createCategoryDto: CreateCategoryDto) {
      createCategoryDto.image = image.path;
      await this.categoryService.create(createCategoryDto);
    return res.status(HttpStatus.CREATED).json({
      message:"دسته بندی ایجاد شد",
      statusCode:HttpStatus.OK
    })
  }

  @Get()
  async findAll(   @Res() res:Response,) {
    const data = await this.categoryService.findAll();
    return res.status(HttpStatus.CREATED).json({
     data,
      statusCode:HttpStatus.OK
    });
  }

  @Get(':id')
  async findOne(   @Res() res:Response,@Param('id') id: string) {
    const data = await this.categoryService.findOne(+id);
    return res.status(HttpStatus.CREATED).json({
      data,
       statusCode:HttpStatus.OK
     });
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(@UploadedFile() image:Express.Multer.File, @Res() res:Response,@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto ) {
    updateCategoryDto.image = image.path;
    await this.categoryService.update(+id, updateCategoryDto);
    return res.status(HttpStatus.CREATED).json({
      message:"دسته بندی ویرایش شد",
       statusCode:HttpStatus.OK
     });
  }

  @Delete(':id')
  async remove(@Res() res:Response , @Param('id') id: string) {
    await this.categoryService.remove(+id);
    return res.status(HttpStatus.CREATED).json({
      message:"دسته بندی ویرایش شد",
       statusCode:HttpStatus.OK
     });
  }
}
