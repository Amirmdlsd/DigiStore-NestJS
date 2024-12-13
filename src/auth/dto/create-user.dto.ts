import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SendSmsDto{
    @IsString()
    @MaxLength(11)
    @MinLength(11)
    @Matches('/^09\d{9}$/')
    phone:string
}