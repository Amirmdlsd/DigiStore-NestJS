import { Injectable } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>
  ){}
  async create(createColorDto: CreateColorDto) {
    const color = await this.colorRepository.create(createColorDto);
    return await this.colorRepository.save(color);
  }

 async findAll() {
    return await this.colorRepository.find();
  }

  async findOne(id: number) {
    return await this.colorRepository.findOneBy({id});
  }

  async update(id: number, updateColorDto: UpdateColorDto) {
    return await this.colorRepository.update(id,updateColorDto);
  }

 async remove(id: number) {
    return await this.colorRepository.delete(id);
  }
}
