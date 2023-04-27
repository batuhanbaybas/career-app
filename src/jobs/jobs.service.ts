import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewJobDto } from './dto/new-job.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async getAllJobs(page = 1) {
    return {
      data: await this.prisma.jobs.findMany({
        skip: (page - 1) * 10,
        take: 10,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: true,
        },
      }),
    };
  }
  async createJob(data, id: string) {
    await this.prisma.jobs.create({
      data: { ...data, user: { connect: { id } } },
    });
    return { status: 'Done', message: 'Job created successfully' };
  }
  async updateJob(id: string, data: NewJobDto) {
    await this.prisma.jobs.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
    return { status: 'Done', message: 'Job updated successfully' };
  }
  async deleteJob(id: string) {
    await this.prisma.jobs.delete({
      where: {
        id,
      },
    });
    return { status: 'Done', message: 'Job deleted successfully' };
  }
}
