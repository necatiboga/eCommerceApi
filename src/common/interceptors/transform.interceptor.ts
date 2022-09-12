import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { ResponseModel } from "../response-model";
  
  
  @Injectable()
  export class TransformInterceptor<T>
    implements NestInterceptor<T, ResponseModel> {
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<ResponseModel> {
      // @ts-ignore
      return next
        .handle()
        .pipe(
          map((res:ResponseModel) => ({
            isSuccess:res.isSuccess ?? true,
            message: [res.message],
            data: res.data ?? null,
            count:res.count ?? null,
          })),
        );
    }
  }
  