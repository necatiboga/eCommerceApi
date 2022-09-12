import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ConfirmPasswordDto {

  @ApiProperty()
  @IsString({message:"Şifre alanı metinsel ifade olmalıdır"})
  @IsNotEmpty({message:"Şifre alanı zorunludur"})
  password:string;

  @ApiProperty()
  @IsString({message:"Kod alanı metinsel ifade olmalıdır"})
  @IsNotEmpty({message:"Kod alanı zorunludur"})
  @IsNotEmpty()
  forgot_password_code:string;

}