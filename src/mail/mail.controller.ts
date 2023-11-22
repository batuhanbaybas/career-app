import { Body, Controller, Post } from '@nestjs/common';

import { MailService } from './mail.service';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argo from 'argon2';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private prisma: PrismaService,
  ) {}
  @Post('forget-password')
  async resetPassword(@Body() data: ForgetPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      return 'User not found!';
    }
    const hash = await argo.hash(user.id);

    const resetLink = `http://localhost:3000/reset-password/${hash}`;
    return await this.mailService.resetPasswordMail(data, resetLink);
  }
}
