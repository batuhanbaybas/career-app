import { Body, Controller, Param, Post } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';

@Controller('reset-password')
export class ResetPasswordController {
  constructor(private resetPasswordService: ResetPasswordService) {}
  @Post('/:id')
  async resetPassword(
    @Param('id') id: string,
    @Body() data: { password: string },
  ) {
    return await this.resetPasswordService.resetPassword(data, id);
  }
}
