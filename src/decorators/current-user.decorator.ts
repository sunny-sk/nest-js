import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, content: ExecutionContext) => {
    const req = content.switchToHttp().getRequest();
    return req.currentUser;
  },
);
