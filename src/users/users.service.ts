/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository<User>
    ){}

    async findUser(phone:string){
        return await this.userRepository.findOne({where:{phone}});
    }
    async updateCode(phone:string,code:string){
    
        const user =await this.userRepository.findOne({where:{phone}});
        user.code = code;
        await this.userRepository.save(user);
        return code;
    }

   async createUserByPhone(phone:string,code:string){
    const newData = await this.userRepository.create({
        code,
        phone,
    });
    await this.userRepository.save(newData);
    return code;
   }
  async updateToken(token:string,phone:string){
    const user = await this.userRepository.findOne({where:{phone}});
        user.token = token;
        await this.userRepository.save(user);
  }

  async registerUserInfo(registerDto :RegisterDto
  ){
    const user = await this.userRepository.findOne({where:{phone:registerDto.phone}});
    user.name = registerDto.name;
    user.family = registerDto.family;
    user.avatar = registerDto.avatar;
    user.lat = registerDto.lat;
    user.long = registerDto.long;
    user.phone = registerDto.phone;
   return await this.userRepository.save(user);   
  }
   
}
