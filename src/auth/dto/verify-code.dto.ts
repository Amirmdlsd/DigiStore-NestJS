
import { IsNotEmpty, IsString, MaxLength } from "class-validator"
import { SendSmsDto } from "./create-user.dto"


export class verifyCodeDto extends SendSmsDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(4)
    code:string
}