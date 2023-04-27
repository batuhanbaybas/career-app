import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const request: Express.Request = ctx.switchToHttp().getRequest();
  return request.user;
});
