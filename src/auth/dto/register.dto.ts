import { IsNotEmpty, IsString } from "class-validator";

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

}