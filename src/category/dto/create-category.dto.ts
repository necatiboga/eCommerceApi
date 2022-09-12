import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Expose } from "class-transformer";


export class CreateCategoryDTO {
  @IsNotEmpty({message:"İsim alanı zorunludur"})
  @IsString({message:"İsim alanı metinsel ifade olmalıdır"})
  @ApiProperty()
  name: string;

}

