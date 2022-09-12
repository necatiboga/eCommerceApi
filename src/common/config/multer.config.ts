import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { CustomException } from "../exceptions/custom-exception";
import { HttpStatus } from "@nestjs/common";

export const profilePictureMulterOptions = {
  limits: {
    fileSize: 5242880 //5mb,
  },
  fileFilter: (req: any, file: any, cb: any) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      cb(new CustomException({message:"Desteklenmeyen resim formatı",statusCode:HttpStatus.NOT_ACCEPTABLE}));
    }

    if (parseInt(req.headers['content-length']) > 5242880){
      cb(new CustomException({message:"Resmin boyutu 5 mb den küçük olmalıdır",statusCode:HttpStatus.NOT_ACCEPTABLE}));
    }

    cb(null, true);
  },
  storage: diskStorage({
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = `./uploads/profile-images`;
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (req: any, file: any, cb: any) => {
      cb(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
};