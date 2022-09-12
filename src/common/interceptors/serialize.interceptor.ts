import {
    CallHandler,
    ExecutionContext,
    NestInterceptor,
    UseInterceptors,
  } from '@nestjs/common';
  import { map, Observable } from 'rxjs';
  import { plainToClass } from 'class-transformer';
  import { ResponseModel } from "../response-model";
  
  interface ClassConstructor {
    new (...args: any[]): {};
  }
  
  export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
  }
  
  export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {}
  
    intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
      return next.handle().pipe(
        map((res: ResponseModel) => {
          res.data = plainToClass(this.dto, res.data, {
            excludeExtraneousValues: true,
          });
          return res;
        }),
      );
    }
  }
  