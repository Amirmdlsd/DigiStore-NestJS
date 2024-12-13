import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SendSmsDto } from './dto/create-user.dto';
import { verifyCodeDto } from './dto/verify-code.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService:UsersService,
        private readonly jwtService:JwtService,

        
    ){}

    async sendSms(sendSmsDto:SendSmsDto){
        const user = await this.userService.findUser(sendSmsDto.phone);
        const now =Date.now();
        const resendCodeTime = 2 * 60 *1000;
        const dif = now  - (user.updated_at.getTime())
        if(user && dif<resendCodeTime){
            throw new ForbiddenException('you must wait 2 minute for next rqeuest ')
        }

        const code = (Math.floor(Math.random()* 9999)).toString();
        if(!user){
            await this.userService.createUserByPhone(sendSmsDto.phone,code);
        }else{
            await this.userService.updateCode(sendSmsDto.phone,code);
        }

        return code;
  
    }

    async verifyCode(verifyDto :verifyCodeDto){
        const user = await this.userService.findUser(verifyDto.phone);
        const now =Date.now();
        const codeExpiredTime = 2 * 60 *1000;
        const dif = now  - (user.updated_at.getTime());

        if(dif > codeExpiredTime){
            throw new ForbiddenException('code is deprecated');
        }

        if(verifyDto.code !== user.code)throw new UnauthorizedException('code is invalid');
        const payload ={userId:user.id,phone:user.phone,code:user.code,role:'user'}
        const token = await this.jwtService.sign(payload,{secret:"DIGI_STORE_SECRET"})
        return token;
    }
}