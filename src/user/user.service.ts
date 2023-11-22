import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update.user.dto';
import * as argo from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
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
      const userId = await argo.hash(id);
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
