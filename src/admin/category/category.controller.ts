/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, Res, HttpStatus, UseInterceptors, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from 'src/auth/decorator/role-decorator';
import { VerifyTokenGuard } from 'src/auth/guard/verify-token/verify-token.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Role('admin')
    @UseGuards(VerifyTokenGuard)
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
  @Role('admin')
  @UseGuards(VerifyTokenGuard)
  async findAll(   @Res() res:Response,) {
    const data = await this.categoryService.findAll();
    return res.status(HttpStatus.CREATED).json({
     data,
      statusCode:HttpStatus.OK
    });
  }

  @Get(':id')
  @Role('admin')
  @UseGuards(VerifyTokenGuard)
  async findOne(   @Res() res:Response,@Param('id') id: string) {
    const data = await this.categoryService.findOne(+id);
    return res.status(HttpStatus.CREATED).json({
      data,
       statusCode:HttpStatus.OK
     });
  }

  @Patch(':id')
  @Role('admin')
  @UseGuards(VerifyTokenGuard)
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
  @Role('admin')
  @UseGuards(VerifyTokenGuard)
  async remove(@Res() res:Response , @Param('id') id: string) {
    await this.categoryService.remove(+id);
    return res.status(HttpStatus.CREATED).json({
      message:"دسته بندی ویرایش شد",
       statusCode:HttpStatus.OK
     });
  }
}
