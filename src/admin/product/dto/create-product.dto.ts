import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";
import { Category } from "src/admin/category/entities/category.entity";

export class CreateProductDto {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    @IsNumberString()
    price: number;
    @IsString()
    @IsNotEmpty()
    quantity: number;
    @IsNotEmpty()
    @IsNumberString()
    discount: number;
    @IsNotEmpty()
    @IsNumber()
    category_id:number

}
