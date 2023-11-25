import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update.user.dto';

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
}
