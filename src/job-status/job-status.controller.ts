import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { JobStatusService } from './job-status.service';
import { NewStatusDto } from './dto/new-status.dto';

@UseGuards(JwtAuthGuard)
@Controller('job-status')
export class JobStatusController {
  constructor(private jobStatusService: JobStatusService) {}
  @Get('/all')
  async findAll(@Req() req: any) {
    return await this.jobStatusService.getAllStatus(req.user.id);
  }
  @Get('/:id')
  async findOne(@Req() req: any, @Param('id') id: string) {
    return await this.jobStatusService.getStatus(id, req.user.id);
  }
  @Post('/new')
  async createOne(@Req() req: any, @Body() data: NewStatusDto) {
    return await this.jobStatusService.createStatus(data, req.user.id);
  }
  @Put('/edit/:id')
  async editOne(@Param('id') id: string, @Body() data: NewStatusDto) {
    return await this.jobStatusService.updateStatus(id, data);
  }
  @Delete('/:id')
  async deleteOne(@Param('id') id: string) {
    return await this.jobStatusService.deleteStatus(id);
  }
}
