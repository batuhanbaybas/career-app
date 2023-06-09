import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { JobsService } from './jobs.service';
import { NewJobDto } from './dto/new-job.dto';

@UseGuards(JwtAuthGuard)
@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}
  @Get()
  async getAllJobs(@Query('page') page: number) {
    return await this.jobsService.getAllJobs(page);
  }
  @Post('new')
  async createJob(@Req() req: any, @Body() data: NewJobDto) {
    return await this.jobsService.createJob(data, req.user.id);
  }
  @Patch('edit/:id')
  async updateJob(@Param('id') id: string, @Body() data: NewJobDto) {
    return await this.jobsService.updateJob(id, data);
  }
  @Delete('delete/:id')
  async deleteJob(@Param('id') id: string) {
    return await this.jobsService.deleteJob(id);
  }
}
