import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/User';
import { Repository } from 'typeorm';
import { RegisterUserDto } from '../auth/dtos/register-user.dto';
import { CustomException } from '../common/exceptions/custom-exception';
import { ResponseModel } from '../common/response-model';
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);
const password = require('node-php-password');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
  ) {}

  async create(dto: RegisterUserDto): Promise<ResponseModel> {
    const emailCheck = await this.findByEmail(dto.email);

    if (emailCheck)
      throw new CustomException({
        data: dto.email,
        message: 'Bu email adresi kayıtlı',
        statusCode: HttpStatus.BAD_REQUEST,
      });

    const user = this.repo.create({
      email: dto.email,
      password:password.hash(dto.password),
      first_name: dto.first_name,
      last_name:dto.last_name,
      phone_number:dto.phone_number,
    });
    
    await this.repo.save(user);

    return {
      isSuccess: true,
      data: user,
      message: 'Kullanıcı başarıyla oluşturuldu.',
    };
  }

  async findOne(id: number): Promise<ResponseModel> {
    const user = await this.repo.findOne({
      where: { id: id },
    });

    if (!user)
      throw new CustomException({
        data: id,
        message: 'Kullanıcı bulunamadı',
        statusCode: HttpStatus.BAD_REQUEST,
      });
      
    return {
      isSuccess: true,
      data: user,
      message: 'Kullanıcı başarıyla listelendi',
    };
  }


  async update(userId: number, attrs: Partial<User>) {
    const user = await this.findOne(userId);

    if (attrs.password) {
      attrs.password = password.hash(attrs.password, 'PASSWORD_DEFAULT');
    }

    if (attrs.email && user.data.email != attrs.email) {
      const checkEmail = await this.findByEmail(attrs.email);
      if (checkEmail)
        throw new CustomException({
          data: attrs.email,
          message: 'Bu email adresi kayıtlı',
          statusCode: HttpStatus.BAD_REQUEST,
        });
    }

    Object.assign(user.data, attrs);

    await this.repo.save(user.data);

    return {
      isSuccess: true,
      data: user.data,
      message: 'Kullanıcı başarıyla güncellendi',
    };
  }

  async updateProfileImage(
    userId: number,
    file: Express.Multer.File,
  ): Promise<ResponseModel> {
    const user: User = (await this.findOne(userId)).data;

    if (user.photo != 'default.png') {
      unlinkAsync(`./uploads/profile-images/${user.photo}`);
    }

    user.photo = file.filename;

    await this.repo.save(user);

    return { isSuccess: true, message: 'Profil resmi başarıyla güncellendi' };
  }


  async findByEmail(email: string) {
    return await this.repo.findOne({ where: { email: email } });
  }
}
