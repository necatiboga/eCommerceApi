import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { ResponseModel } from "../common/response-model";
import { CustomException } from "../common/exceptions/custom-exception";
import { ProductEntity } from "./entities/product.entity";
import { CreateProductDTO } from "./dto/create-product.dto";

@Injectable()
export class ProductService {
  constructor(@InjectRepository(ProductEntity)private repo:Repository<ProductEntity>) {
  }

  async save(product: CreateProductDTO):Promise<ResponseModel>{
    const data = await this.repo.save(product)

    // if (data.length == 0)
    //   throw new CustomException({message:"Kayıtlı cüzdan hareketi bulunamadı",statusCode:HttpStatus.BAD_REQUEST})

    return {message:"Başarıyla listelendi",data}

  }

  async all():Promise<ResponseModel>{
    const data = await this.repo.find()
    
    if (data.length == 0)
      throw new CustomException({message:"Kayıtlı cüzdan hareketi bulunamadı",statusCode:HttpStatus.BAD_REQUEST})

    return {message:"Başarıyla listelendi",data,count:data.length}
  }

  async findById(id:number):Promise<ResponseModel>{
    const data = await this.repo.findOne({
      where: {id:id}
    })
  
    if (!data)
      throw new CustomException({message:"Kayıtlı cüzdan hareketi bulunamadı",statusCode:HttpStatus.BAD_REQUEST})

    return {message:"Başarıyla listelendi",data,count:1}
  }

  async findBycategoryId(categoryId:number):Promise<ResponseModel>{
    const data = await this.repo.find({
      where: {categoryId},
      relations:['category']
    })
  
    if (data.length == 0)
      throw new CustomException({message:"Kayıtlı cüzdan hareketi bulunamadı",statusCode:HttpStatus.BAD_REQUEST})

    return {message:"Başarıyla listelendi",data}
  }



}
