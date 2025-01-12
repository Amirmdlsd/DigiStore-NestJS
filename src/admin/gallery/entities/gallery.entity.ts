import { Product } from "src/admin/product/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"galleries")
export class Gallery {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"jsonb",nullable:true,default:null})
    image:string[]

    @ManyToOne(()=>Product,(product)=>product.gallery)
    product:Product;

}
