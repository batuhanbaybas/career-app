import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ForgetPasswordDto } from './dto/forget-password.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendResetPasswordMail(data: ForgetPasswordDto, resetLink: string) {
    try {
      return await this.mailerService.sendMail({
        to: data.email,
        subject: 'Şifre Sıfırlama İsteği',
        html: `<p>Merhaba,</p><p>Şifrenizi sıfırlamak için aşağıdaki linke tıklayınız:</p><p><a href="${resetLink}">Şifre Sıfırlama</a></p><p>Eğer bu isteği siz yapmadıysanız, bu maili dikkate almayabilirsiniz.</p>`,
      });
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  }
}
