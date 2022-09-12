import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from 'express';
import { ResponseModel } from "../response-model";
import { logger } from "../config/logger.config";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    let responseModel:any = exception.getResponse();

    switch (responseModel.message){
      case "Unauthorized":
        responseModel.message = "Oturum doğrulanamadı";
        break;
      case "Internal Server Error":
        responseModel.message = "Sunucu tarafında hata oluştu";
        break;
    }

    let body:ResponseModel = {
      isSuccess:false,
      message:responseModel.message,
      data:responseModel.data ? responseModel.data : null,
      count:responseModel.count ?? null,
    }

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR){
      logger.error('Sunucu Hatası',{data: {
          url:request.url,
          user:request.user ?? null,
          body:request.body
        }
      })
    }

    response
      .status(status)
      .json(body);

  }
}
