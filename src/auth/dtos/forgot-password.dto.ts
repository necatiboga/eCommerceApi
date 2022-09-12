import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ForgotPasswordDto {
  @ApiProperty()
  @IsNotEmpty({message:"Email adresi alanı zorunludur"})
  @IsEmail({},{message:"Email formatına uygun degil"})
  email:string;
}