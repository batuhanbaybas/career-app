import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argo from 'argon2';
@Injectable()
export class ResetPasswordService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async resetPassword(data: { password: string }, id: string) {
    try {
      const userId = await this.jwt.verify(id, {
        secret: this.config.get('JWT_SECRET'),
      });
      const password = await argo.hash(data.password);
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: password,
        },
      });
      return { status: true, message: 'Password updated successfully' };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }
}
