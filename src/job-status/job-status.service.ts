import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewStatusDto } from './dto/new-status.dto';

@Injectable()
export class JobStatusService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllStatus(id: string) {
    try {
      const status = await this.prisma.jobStatus.findMany({
        where: {
          userId: id,
        },
      });
      return { status: true, data: status };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }
  async getStatus(id: string, userId) {
    try {
      await this.prisma.jobStatus.findFirst({
        where: {
          id: id,
          userId: userId,
        },
      });
    } catch (error) {}
  }
  async createStatus(data: NewStatusDto, id: string) {
    try {
      await this.prisma.jobStatus.create({
        data: {
          ...data,
          userId: id,
        },
      });
      return { status: true, message: 'Status created successfully' };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }
  async updateStatus(id: string, data: NewStatusDto) {
    try {
      await this.prisma.jobStatus.update({
        where: {
          id: id,
        },
        data: {
          ...data,
        },
      });
      return { status: true, message: 'Status updated successfully' };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }
  async deleteStatus(id: string) {
    try {
      await this.prisma.jobStatus.delete({
        where: {
          id: id,
        },
      });
      return { status: true, message: 'Status deleted successfully' };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }
}
