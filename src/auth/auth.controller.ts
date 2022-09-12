import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards
  } from "@nestjs/common";
  import { AuthService } from "./auth.service";
  import { RegisterUserDto } from "./dtos/register-user.dto";
  import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiResponse,
    ApiTags
  } from "@nestjs/swagger";
  import { LoginUserDto } from "./dtos/login-user.dto";
  import { AtGuard } from "../common/guards/at.guard";
  import { RtGuard } from "../common/guards/rt.guard";
  import { GetCurrentUser } from "../common/decorators/get-current-user.decerator";
  import { ForgotPasswordDto } from "./dtos/forgot-password.dto";
  import { ConfirmPasswordDto } from "./dtos/confirm-password.dto";
  
  @Controller('auth')
  @ApiTags('auth')
  export class AuthController {
  
    constructor(private readonly service:AuthService) {
    }
  
    @Post("signup")
    @ApiOperation({summary:"Kayıt olmak amacıyla kullanılmalıdır"})
    @ApiResponse({status:201,description:"Başarılı mesajı dönecektir"})
    @ApiResponse({status:400,description:"Kullanıcı yok ise dönecektir"})
    @ApiResponse({status:401,description:"Hali hazırda kullanıcı kayıtlıysa dönecektir"})
    @ApiBody({type:RegisterUserDto})
    async signup(@Body() dto:RegisterUserDto){
      return await this.service.signup(dto);
    }
  
    @Post("signin")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary:"Giriş yapmak amacıyla kullanılmalıdır"})
    @ApiResponse({status:200,description:"Access token ve refresh token dönecektir"})
    @ApiResponse({status:400,description:"Kullanıcı yok ise dönecektir"})
    @ApiResponse({status:401,description:"Şifre yanlış veya kullanıcı onaylanmamış ise dönecektir"})
    @ApiBody({type:LoginUserDto})
    async signin(@Body() dto:LoginUserDto){
      return await this.service.signin(dto);
    }
  
    
  
   
  
    @UseGuards(AtGuard)
    @ApiOperation({summary:"Çıkış yapmak amacıyla kullanılmalıdır"})
    @ApiBearerAuth('defaultBearerAuth')
    @Post("logout")
    @HttpCode(HttpStatus.OK)
    async logout(@GetCurrentUser('id') userId:number){
      return this.service.logout(userId);
    }
  
    @UseGuards(RtGuard)
    @ApiOperation({summary:"Refresh token yenilemek amacıyla kullanılmalıdır"})
    @ApiBearerAuth('refreshBearerAuth')
    @Post("refresh")
    @HttpCode(HttpStatus.OK)
    async refresh(@GetCurrentUser() user:any){
      return this.service.refresh(user['id'],user['refreshToken']);
    }
  
  }
  