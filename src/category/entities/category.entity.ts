import { Expose } from "class-transformer";
import { ProductEntity } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, JoinColumn, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Entity } from "typeorm/decorator/entity/Entity";

@Entity("category")
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id:number;

  @Column("text")
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date; 


}