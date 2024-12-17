/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RegisterDto{
    @IsString()
    @IsNotEmpty()
    name:string;
    
    @IsString()
    @IsNotEmpty()
    family:string;

    @IsString()
    @IsNotEmpty()
    phone:string;

    @IsNumber()
    @IsNotEmpty()
    long:number;

    @IsNumber()
    @IsNotEmpty()
    lat:number;

    @IsString()
    @IsNotEmpty()
    avatar:string;

}