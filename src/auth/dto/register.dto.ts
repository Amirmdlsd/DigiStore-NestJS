/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class RegisterDto{
    @IsString()
    @IsNotEmpty()
    name:string;
    
    @IsString()
    @IsNotEmpty()
    family:string;

    @IsNumberString()
    @IsNotEmpty()
    phone:string;

    @IsNumberString()
    @IsNotEmpty()
    long:number;

    @IsNumberString()
    @IsNotEmpty()
    lat:number;

    
    avatar:string;

}