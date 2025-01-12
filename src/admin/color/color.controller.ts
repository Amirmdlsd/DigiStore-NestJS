import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Response } from 'express';
import { Role } from 'src/auth/decorator/role-decorator';
import { VerifyTokenGuard } from 'src/auth/guard/verify-token/verify-token.guard';
@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Post()
  @Role('admin')
  @UseGuards(VerifyTokenGuard)
  async create(@Body() createColorDto: CreateColorDto,@Res() res:Response) {
    await this.colorService.create(createColorDto);
    return res.status(HttpStatus.CREATED).json({
      message:"رنگ ایجاد شد",
       statusCode:HttpStatus.OK
    })
  }

  @Get()
  @Role('admin')
  @UseGuards(VerifyTokenGuard)
  async findAll(@Res() res:Response) {
    const data = await this.colorService.findAll();
    return res.status(HttpStatus.OK).json({
      data,
       statusCode:HttpStatus.OK
    })
  }

  @Get(':id')
  @Role('admin')
  @UseGuards(VerifyTokenGuard)
 async findOne(@Param('id') id: string,@Res() res:Response) {
    const data = await this.colorService.findOne(+id);
    return res.status(HttpStatus.OK).json({
      data,
       statusCode:HttpStatus.OK
    })
  }

  @Patch(':id')
  @Role('admin')
  @UseGuards(VerifyTokenGuard)
  async update(@Param('id') id: string, @Body() updateColorDto: UpdateColorDto,
  @Res()res:Response
) {
    await this.colorService.update(+id, updateColorDto);
    return res.status(HttpStatus.OK).json({
      message:"رنگ ویرایش شد",
       statusCode:HttpStatus.OK
    })
  }

  @Delete(':id')
  @Role('admin')
  @UseGuards(VerifyTokenGuard)
 async remove(@Param('id') id: string,@Res()res:Response) {
    await this.colorService.remove(+id);
    return res.status(HttpStatus.OK).json({
      message:"رنگ حذف شد",
       statusCode:HttpStatus.OK
    })
  }
}
