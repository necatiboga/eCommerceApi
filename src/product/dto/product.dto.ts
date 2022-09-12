import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { CategoryDTO } from 'src/category/dto/category';

export class ProductDTO {

  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  price: number;

  @IsNotEmpty()
  @IsString()
  @Expose()
  description: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  created_at: string;

  @Expose()
  @ValidateNested()
  @Type(() => CategoryDTO)
  category:CategoryDTO

}
