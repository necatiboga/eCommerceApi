import { Expose } from "class-transformer";

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  first_name:string;

  @Expose()
  last_name:string;

  @Expose()
  email:string;

  @Expose()
  username:string;

  @Expose()
  photo:string;

  @Expose()
  phone_number:string;

  @Expose()
  is_approved:boolean;

  @Expose()
  roles:string;

  @Expose()
  created_at:Date;
}