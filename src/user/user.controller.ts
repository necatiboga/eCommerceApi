import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GetCurrentUser } from '../common/decorators/get-current-user.decerator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AtGuard } from '../common/guards/at.guard';
import { UserService } from './user.service';
import { Serialize } from '../common/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { profilePictureMulterOptions } from '../common/config/multer.config';
import { fileUploadOption } from '../common/options/file-upload.option';
import { Observable, of } from 'rxjs';
import { doc } from 'prettier';
import join = doc.builders.join;

@Controller('user')
@ApiTags('user')
@ApiResponse({
  status: 401,
  description: 'Kullanıcının oturumu yok ise dönecektir',
})
@ApiBearerAuth('defaultBearerAuth')
@UseGuards(AtGuard)
export class UserController {
  constructor(private service: UserService) {}

  @Post()
  @Serialize(UserDto)
  @HttpCode(200)
  @ApiOperation({ summary: 'Kullanıcının bilgilerini verir' })
  @ApiResponse({
    status: 200,
    description: 'Kullanıcının bilgileri dönecektir',
  })
  @ApiResponse({ status: 400, description: 'Kullanıcı bulunamazsa dönecektir' })
  me(@GetCurrentUser('id') userId: number) {
    return this.service.findOne(userId);
  }

  @Put()
  @Serialize(UserDto)
  @HttpCode(200)
  @ApiOperation({ summary: 'Kullanıcıyı günceller' })
  @ApiResponse({
    status: 200,
    description: 'Kullanıcının bilgileri dönecektir',
  })
  @ApiResponse({ status: 400, description: 'Kullanıcı bulunamazsa dönecektir' })
  update(@GetCurrentUser('id') userId: number, @Body() body: UpdateUserDto) {
    return this.service.update(userId, body);
  }

  @Put('profil-image')
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  @ApiBody(fileUploadOption)
  @ApiOperation({ summary: 'Kullanıcının profil resmini günceller' })
  @UseInterceptors(FileInterceptor('file', profilePictureMulterOptions))
  updateProfilImage(
    @GetCurrentUser('id') userId: number,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    return this.service.updateProfileImage(userId, file);
  }
}
