export interface ResponseModel {
    message: string;
    data?: any;
    isSuccess?: boolean;
    count?:number;
    statusCode?: number;
  }