import { Category } from "src/admin/category/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"products"})
export class Product {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({type:'varchar'})
    title:string;
    @Column({type:'varchar'})
    image:string;
    @Column()
    price:number;
    @Column({type:'varchar'})
    discount:number;
    @Column({type:'varchar'})
    description:string;
    @Column({type:'varchar'})
    quantity:string;
    @ManyToOne(()=>Category,(category)=>category.product)
    @JoinColumn({name:"category_id"})
    category:Category
}
