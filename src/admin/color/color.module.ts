import { Module } from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { Category } from '../category/entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Color])],
  
  controllers: [ColorController],
  providers: [ColorService],
})
export class ColorModule {}
