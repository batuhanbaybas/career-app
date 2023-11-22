import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update.user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argo from 'argon2';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async updateMe(id: string, data: UpdateUserDto) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  }

  async deleteMe(id: string) {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
    return { status: 'Done', message: 'User deleted successfully' };
  }

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
