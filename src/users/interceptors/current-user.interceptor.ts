import {
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { Observable } from 'rxjs';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private service: UsersService) {}

  async intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Promise<Observable<any>> {
    // run something before a request is handled
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};
    if (userId) {
      const result = await this.service.findOne(userId);
      request.currentUser = result;
    }

    return handler.handle();
  }
}
