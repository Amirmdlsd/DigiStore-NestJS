import { Category } from "src/admin/category/entities/category.entity";
import { Color } from "src/admin/color/entities/color.entity";
import { Gallery } from "src/admin/gallery/entities/gallery.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    quantity:number;
    @ManyToOne(()=>Category,(category)=>category.product)
    @JoinColumn({name:"category_id"})
    category:Category

    @OneToMany(()=>Color,(color)=>color.product)
    color:Color[];

    @OneToMany(()=>Gallery,(gallery)=>gallery.product)
    gallery:Gallery[]
    
}
