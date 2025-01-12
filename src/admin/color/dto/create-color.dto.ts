import { IsNotEmpty } from "class-validator";

export class CreateColorDto {
    @IsNotEmpty()
    title:string
    @IsNotEmpty()
    code:string
}
