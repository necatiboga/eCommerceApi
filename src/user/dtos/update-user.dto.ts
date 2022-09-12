import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {

  @IsOptional()
  @IsEmail({},{message:"Email formatı doğru değil"})
  @ApiProperty()
  email:string;

  @IsOptional()
  @IsString({message:"Şifre alanı metinsel ifade olmalıdır"})
  @MinLength(6,{message:"Şifre alanı en az 6 karakter olmalıdır"})
  @ApiProperty()
  password:string;

}