import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { ResponseModel } from "../common/response-model";
import { CustomException } from "../common/exceptions/custom-exception";
import { CategoryEntity } from "./entities/category.entity";
import { CreateCategoryDTO } from "./dto/create-category.dto";

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(CategoryEntity)private repo:Repository<CategoryEntity>) {
  }
  //response model yerine CategoryRO yazilacak eger calismazsa
  async save(category:CreateCategoryDTO):Promise<ResponseModel>{
    const data = await this.repo.save(category)

    return {message:"Başarıyla listelendi",data}

  }

  async all (): Promise<ResponseModel> {
    const data = await this.repo.find();

    return {message:"Başarıyla listelendi",data,count:data.length}
  }
}
