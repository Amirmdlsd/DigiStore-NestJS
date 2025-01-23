import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"colors"})
export class Color {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({type:'varchar'})
    title:string
    @Column()
    code:string;
    @ManyToOne(()=>Product,(product)=>product.color)
    product:Product;
}
