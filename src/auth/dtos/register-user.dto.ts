import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
// import { RoleCheck } from "../../common/decerators/role-check.decerator";

export class RegisterUserDto {

  @IsString({message:"İsim alanı metinsel ifade olmalıdır"})
  @IsNotEmpty({message:"İsim alanı zorunludur"})
  @ApiProperty()
  first_name:string;

  @IsString({message:"Soyisim alanı metinsel ifade olmalıdır"})
  @IsNotEmpty({message:"Soyisim alanı zorunludur"})
  @ApiProperty()
  last_name:string;

  @IsEmail({}, { message: 'Email formatı doğru değil' })
  @IsNotEmpty({message:"Email alanı zorunludur"})
  @ApiProperty()
  email:string;
  
  //duzenle
  @IsString({message:"İsim alanı metinsel ifade olmalıdır"})
  @IsNotEmpty({message:"İsim alanı zorunludur"})
  @ApiProperty()
  password:string;

  @IsString({message:"Telefon alanı metinsel ifade olmalıdır"})
  @IsNotEmpty({message:"Telefon alanı zorunludur"})
  @ApiProperty()
  phone_number:string;

  @IsString({message:"Sosyal medya adresleri alanı metinsel ifade olmalıdır"})
  @IsNotEmpty({message:"Sosyal medya adresleri alanı zorunludur"})
  @ApiProperty()
  social_media_addresses:string;

  @IsString({message:"Kısa bilgi alanı metinsel ifade olmalıdır"})
  @IsNotEmpty({message:"Kısa bilgi alanı zorunludur"})
  @ApiProperty()
  short_info:string;

  @IsNotEmpty({message:"Role alanı zorunludur"})
  // @RoleCheck()
  @ApiProperty()
  roles:string;


}