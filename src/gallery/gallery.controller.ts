import { Controller, Get,Res,Post, Body, Patch, Param, Delete, UseInterceptors, Query, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  @UseInterceptors(FilesInterceptor("images"))
 async create(images:Array<Express.Multer.File>,
  @Query("product_id",ParseIntPipe)id:number,@Res()response:Response) {
    await this.galleryService.create(images,id);
    return response.status(HttpStatus.OK).json({
      message:"created",
      status_code:HttpStatus.OK
    });
  }

  @Get()
  findAll() {
    return this.galleryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galleryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGalleryDto: UpdateGalleryDto) {
    return this.galleryService.update(+id, updateGalleryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galleryService.remove(+id);
  }
}
