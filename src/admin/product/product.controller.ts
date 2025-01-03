import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
 async create(@UploadedFile()image:Express.Multer.File,@Body() 
  createProductDto: CreateProductDto,@Res() res:Response) {
    await this.productService.create(createProductDto,image);
    return res.status(HttpStatus.CREATED).json({
      message:"محصول ایجاد شد",
       statusCode:HttpStatus.OK
    })
  }

  @Get()
  async findAll(@Res() res:Response) {
    const data = await this.productService.findAll();
    return res.status(HttpStatus.OK).json({
      data,
       statusCode:HttpStatus.OK
    })
  }

  @Get(':id')
  @UseInterceptors(FileInterceptor('image'))
  async findOne(@Res() res:Response,@Param('id') id: string) {
    const data =await this.productService.findOne(+id);
    return res.status(HttpStatus.OK).json({
      data,
       statusCode:HttpStatus.OK
    })
  }

  @Patch(':id')
 async update(@UploadedFile()image:Express.Multer.File,
  @Res() res:Response,@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    await this.productService.update(+id, updateProductDto,image);
    return res.status(HttpStatus.OK).json({
      message:"محصول ویرایش شد",
       statusCode:HttpStatus.OK
    })
  }

  @Delete(':id')
  async remove( @Res() res:Response,@Param('id') id: string) {
    await this.productService.remove(+id);
    return res.status(HttpStatus.OK).json({
      message:"محصول حذف شد",
       statusCode:HttpStatus.OK
    })
  }
}
