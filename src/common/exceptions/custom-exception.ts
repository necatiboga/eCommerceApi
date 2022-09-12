import { HttpException } from "@nestjs/common";
import { ResponseModel } from "../response-model";

export class CustomException extends HttpException {
  constructor(responseModel:ResponseModel) {
    super({
      isSuccess:false,
      message: [responseModel.message],
      data: responseModel.data ?? null,
      count:responseModel.count ?? null,
    },responseModel.statusCode);
  }
}