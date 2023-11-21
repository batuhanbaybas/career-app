import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewJobDto } from './dto/new-job.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async getAllJobs(page = 1) {
    const jobs = await this.prisma.jobs.findMany({
      skip: (page - 1) * 10,
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
      },
    });
    try {
      return {
        success: true,
        data: jobs,
      };
    } catch (error) {
      return { status: 'Error', message: error.message };
    }
  }
  async createJob(data, id: string) {
    try {
      await this.prisma.jobs.create({
        data: {
          ...data,
          user: {
            connect: {
              id,
            },
          },
        },
      });
      return { success: true, message: 'Job created successfully' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  async updateJob(id: string, data: NewJobDto) {
    try {
      await this.prisma.jobs.update({
        where: {
          id,
        },
        data: {
          ...data,
        },
      });
      return { status: 'Done', message: 'Job updated successfully' };
    } catch (error) {
      return { status: 'Error', message: error.message };
    }
  }
  async deleteJob(id: string) {
    try {
      await this.prisma.jobs.delete({
        where: {
          id,
        },
      });
      return { status: 'Done', message: 'Job deleted successfully' };
    } catch (error) {
      return { status: 'Error', message: error.message };
    }
  }
}
