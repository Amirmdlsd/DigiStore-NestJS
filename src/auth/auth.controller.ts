/* eslint-disable prettier/prettier */
import { Body, Controller, HttpStatus, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendSmsDto } from './dto/create-user.dto';
import { Response } from 'express';
import { verifyCodeDto } from './dto/verify-code.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyTokenGuard } from './guard/verify-token/verify-token.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api')
export class AuthController {
    constructor(
        private readonly authService:AuthService
    ){}
    @Post('send-sms')
    async sendSms(
        @Res() res:Response,
        @Body() sendSmsDto:SendSmsDto){
            const code = await this.authService.sendSms(sendSmsDto);
            return res.status(HttpStatus.OK).
            json({
                msg:"code sent",
                code,
                statusCode:HttpStatus.OK
            })
        }
        @Post('verify-code')
        async verifyCode(
            @Res()res:Response,
            @Body()verifyDto:verifyCodeDto){
            const token = await this.authService.verifyCode(verifyDto);
            return res.status(HttpStatus.OK).json({
                msg:"code is verified",
                statusCode:200,
                token,
            }) 
        }

        @Post('register')
        @UseGuards(VerifyTokenGuard)
        @UseInterceptors(FileInterceptor('avatar'))
        async register(
            @UploadedFile() avatar:Express.Multer.File,
            @Res() res:Response,
            @Body() registerDto:RegisterDto
        ){
           await this.authService.register(registerDto,avatar);
           return res.status(HttpStatus.OK).json({
            msg:"user registered",
            statusCode:HttpStatus.OK,
           })
        }
}
