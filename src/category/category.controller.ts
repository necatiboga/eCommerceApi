import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AtGuard } from "../common/guards/at.guard";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { Serialize } from "../common/interceptors/serialize.interceptor";
import { CategoryEntity } from "./entities/category.entity";
import { CategoryDTO } from "./dto/category";

@ApiResponse({status:401,description:"Hali hazırda kullanıcı kayıtlıysa dönecektir"})
@Controller('category')
@ApiTags('category')
@Serialize(CategoryDTO)
export class CategoryController {

  constructor(private service:CategoryService) {
  }

  @Post('')
  @ApiOperation({summary:"Cüzdan hareketlerini listelemek amacıyla kullanılır"})
  @ApiResponse({status:200,description:"Cüzdan hareketlerini dönecektir"})
  @ApiResponse({status:400,description:"Cüzdan hareketi yok ise dönecektir"})
  @HttpCode(HttpStatus.OK)
  async save(@Body() category:CreateCategoryDTO){
    return await this.service.save(category)
  }

  @Get('')
  @ApiOperation({summary:"Cüzdan hareketlerini listelemek amacıyla kullanılır"})
  @ApiResponse({status:200,description:"Cüzdan hareketlerini dönecektir"})
  @ApiResponse({status:400,description:"Cüzdan hareketi yok ise dönecektir"})
  @HttpCode(HttpStatus.OK)
  @Serialize(CategoryDTO)
  async all(){
    const data = await this.service.all();
    console.log(data);    
    return data;
  }

}
