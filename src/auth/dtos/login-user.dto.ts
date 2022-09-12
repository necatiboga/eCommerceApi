import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginUserDto {

  @IsEmail({}, { message: 'Email formatı doğru değil' })
  @IsNotEmpty({message:"Email alanı zorunludur"})
  @ApiProperty()
  email:string;

  @IsString({message:"Şifre alanı metinsel ifade olmalıdır"})
  @IsNotEmpty({message:"Şifre alanı zorunludur"})
  @MinLength(6,{message:"Şifre alanı en az 6 karakter olmalıdır"})
  @ApiProperty()
  password:string;


}