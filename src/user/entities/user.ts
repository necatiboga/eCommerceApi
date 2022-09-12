import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  first_name:string;

  @Column({ nullable: true })
  last_name:string;

  @Column({ nullable: true })
  email:string;

  @Column({ nullable: true })
  password?:string;

  @Column({ nullable: true })
  username:string;

  @Column({ nullable: true })
  phone_number:string;

  @Column({ nullable: true })
  photo:string;

  @Column({ nullable: true })
  roles:string;

  @Column({ nullable: true })
  refresh_token:string;
  
  @Column({ nullable: true })
  created_at:Date;

 

  

}
