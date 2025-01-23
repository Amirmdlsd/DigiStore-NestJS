import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Role } from 'src/auth/decorator/role-decorator';
import { VerifyTokenGuard } from 'src/auth/guard/verify-token/verify-token.guard';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Role('admin')
  @UseGuards(VerifyTokenGuard)
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body()
    createProductDto: CreateProductDto,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    await this.productService.create(createProductDto, image);
    return res.status(HttpStatus.CREATED).json({
      message: 'محصول ایجاد شد',
      statusCode: HttpStatus.OK,
    });
  }

  @Get()
  @Role('admin')
  @UseGuards(VerifyTokenGuard)
  async findAll(@Res() res: Response) {
    const data = await this.productService.findAll();
    return res.status(HttpStatus.OK).json({
      data,
      statusCode: HttpStatus.OK,
    });
  }

  @Get(':id')
  @Role('admin')
  @UseGuards(VerifyTokenGuard)
  @UseInterceptors(FileInterceptor('image'))
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const data = await this.productService.findOne(+id);
    return res.status(HttpStatus.OK).json({
      data,
      statusCode: HttpStatus.OK,
    });
  }

  @Patch(':id')
  @Role('admin')
  @UseGuards(VerifyTokenGuard)
  async update(
    @UploadedFile() image: Express.Multer.File,
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    await this.productService.update(+id, updateProductDto, image);
    return res.status(HttpStatus.OK).json({
      message: 'محصول ویرایش شد',
      statusCode: HttpStatus.OK,
    });
  }

  @Delete(':id')
  @Role('admin')
  @UseGuards(VerifyTokenGuard)
  async remove(@Res() res: Response, @Param('id') id: string) {
    await this.productService.remove(+id);
    return res.status(HttpStatus.OK).json({
      message: 'محصول حذف شد',
      statusCode: HttpStatus.OK,
    });
  }

  @Get('special')
  @Role('user')
  @UseGuards(VerifyTokenGuard)
  async showIsSepecialProduct(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: await this.productService.showIsSepecialProduct(),
    });
  }

  @Get(':category_id')
  @Role('user')
  @UseGuards(VerifyTokenGuard)
  async findProductByCategory(@Res() res: Response, @Query('category_id') category_id: number) {
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: await this.productService.findProductByCategory(category_id),
    });
  }
}
