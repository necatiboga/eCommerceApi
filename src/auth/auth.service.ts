import {HttpStatus, Injectable } from "@nestjs/common";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { LoginUserDto } from "./dtos/login-user.dto";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { CustomException } from "../common/exceptions/custom-exception";
import { ForgotPasswordDto } from "./dtos/forgot-password.dto";
import { v4 as uuid } from 'uuid';
import { ConfirmPasswordDto } from "./dtos/confirm-password.dto";
import { User } from "../user/entities/User";
import { ResponseModel } from "../common/response-model";
const password = require("node-php-password");

@Injectable()
export class AuthService {
  constructor(
    private readonly userService:UserService,
    private readonly jwtService:JwtService,
    private readonly configService:ConfigService,
    ) {
  }

  async signup(dto:RegisterUserDto):Promise<ResponseModel>{

    const user = await this.userService.create(dto);

    return { isSuccess:true,data:null,message:"Kullanıcı başarıyla oluşturuldu.Onay aşamasındadır" }

  }

  async signin(dto:LoginUserDto):Promise<ResponseModel>{

    const user = await this.userService.findByEmail(dto.email);

    if (!user)
      throw new CustomException({data:dto.email,message:"Kullanıcı bulunamadı",statusCode:HttpStatus.BAD_REQUEST})

    
    if(!password.verify(dto.password, user.password,"PASSWORD_DEFAULT"))
      throw new CustomException({ message:"Email adresi veya şifre yanlış",statusCode:HttpStatus.UNAUTHORIZED })

    const tokens = await this.getTokens(user.id);

    await this.updateRtHash(user.id,tokens.refresh_token);

    return { isSuccess:true, data:tokens ,message:"Kullanıcı başarıyla oturum açtı" }

  }

  

  async logout(userId:number):Promise<ResponseModel>{

    await this.userService.update(userId,{refresh_token:null})

    return { isSuccess:true, message:"Çıkış başarılı" }

  }

  async refresh(userId:number,rt:string):Promise<ResponseModel>{
    const user:User = (await this.userService.findOne(userId)).data;

    const rtMatches = password.verify(rt,user.refresh_token);
    if (!rtMatches)
      throw new CustomException({ statusCode:HttpStatus.FORBIDDEN,message:"Erişim red edildi" })

    const tokens = await this.getTokens(user.id);

    await this.updateRtHash(user.id,tokens.refresh_token);

    return { isSuccess:true, data:tokens, message:"Token başarıyla yenilendi" }

  }

  async updateRtHash(userId:number,rt:string){

    const refresh_token = password.hash(rt,"PASSWORD_DEFAULT");

    const user = this.userService.update(userId,{refresh_token})

  }

  async getTokens(userId:number) {
    const [at,rt] = await Promise.all([
      this.jwtService.signAsync({
        id:userId
      },{
        expiresIn:60*15,
        secret: 'bukymert2640'
      }),
      this.jwtService.signAsync({
        id:userId
      },{
        expiresIn:60*60*24*7,
        secret: 'bukymert2640refresh'
      })])

    return {
      access_token:at,
      refresh_token:rt
    }

  }

}
