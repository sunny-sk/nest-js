import {
  NestInterceptor,
  UseInterceptors,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';


interface ClassConstructor {
  new (...atgs: any[]): {};
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private Dto: ClassConstructor) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // run something before a request is handled

    return handler.handle().pipe(
      map((data: ClassConstructor) => {
        // run something before the response is sent out;
        return plainToClass(this.Dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}

// custome decorator for serialize
// should have class type dto, no string & numbers numbers
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
