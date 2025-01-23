import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Role } from 'src/auth/decorator/role-decorator';
import { VerifyTokenGuard } from 'src/auth/guard/verify-token/verify-token.guard';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @Role('admin')
  @UseGuards(VerifyTokenGuard)
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Get()
  @Role('admin')
  @UseGuards(VerifyTokenGuard)
  findAll() {
    return this.brandService.findAll();
  }

  @Get(':id')
  @Role('admin')
  @UseGuards(VerifyTokenGuard)
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(+id);
  }

  @Patch(':id')
  @Role('admin')
  @UseGuards(VerifyTokenGuard)
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  @Role('admin')
  @UseGuards(VerifyTokenGuard)
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}
