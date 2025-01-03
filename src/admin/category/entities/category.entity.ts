/* eslint-disable prettier/prettier */
import { Product } from "src/admin/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:"categories"})
export class Category {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    title:string;
    @Column()
    image:string

    @ManyToOne(() => Category, (category) => category.children, { nullable: true })
    parent: Category | null;

  
    @OneToMany(() => Category, (category) => category.parent)
    children: Category[];

    @CreateDateColumn()
    created_at:Date;
    @UpdateDateColumn()
    updated_at:Date;

    @OneToMany(()=>Product,(product)=>product.category)
    product:Product[]
}
