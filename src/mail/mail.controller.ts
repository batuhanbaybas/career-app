import { Body, Controller, Post } from '@nestjs/common';

import { MailService } from './mail.service';
import { ForgetPasswordDto } from './dto/forget-password.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}
  @Post('reset-password')
  async resetPassword(@Body() data: ForgetPasswordDto) {
    const resetLink = 'http://localhost:3000/auth/reset-password';
    return this.mailService.resetPasswordMail(data, resetLink);
  }
}
