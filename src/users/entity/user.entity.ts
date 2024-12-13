import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:true,default:null})
    name:string;
    @Column({nullable:true,default:null})
    family:string;
    @Column({type:"varchar",length:11})
    phone:string;  
    @Column({nullable:true,default:null})
    token:string;
    @Column({length:4,type:'varchar'})
    code:string;
    @CreateDateColumn({type:"datetime",default: () => "CURRENT_TIMESTAMP"})  
    created_at:Date;
    @UpdateDateColumn({type:"datetime",default: () => "CURRENT_TIMESTAMP"})  
    updated_at:Date
}