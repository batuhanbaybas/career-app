import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewJobDto } from './dto/new-job.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async getAllJobs(page = 1, id: string) {
    try {
      const jobs = await this.prisma.jobs.findMany({
        where: {
          userID: id,
        },
        skip: (page - 1) * 10,
        take: 10,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: true,
        },
      });

      // delete all user passwords from the response
      await jobs.map((job) => delete job.user.password);
      return {
        success: true,
        data: jobs,
      };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }
  async createJob(data, id: string) {
    try {
      await this.prisma.jobs.create({
        data: {
          ...data,
          userID: id,
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
      return { status: true, message: 'Job updated successfully' };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }
  async deleteJob(id: string) {
    try {
      await this.prisma.jobs.delete({
        where: {
          id,
        },
      });
      return { status: true, message: 'Job deleted successfully' };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }
}
