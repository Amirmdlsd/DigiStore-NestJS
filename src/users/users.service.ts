import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

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
  async updateUserInfo(phone:string,name:string,family:string){
    const user = await this.userRepository.findOne({where:{phone}});
    user.name = name;
    user.family = family;
   return await this.userRepository.save(user);   
 
  }
   
}
