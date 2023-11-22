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
  constructor(private jonStatusService: JobStatusService) {}
  @Get('/all')
  async findAll(@Req() req: any) {
    return await this.jonStatusService.getAllStatus(req.user.id);
  }
  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.jonStatusService.getStatus(id, req.user.id);
  }
  @Post('/new')
  createOne(@Req() req: any, @Body() data: NewStatusDto) {
    return this.jonStatusService.createStatus(data, req.user.id);
  }
  @Put('/edit/:id')
  editOne(@Param('id') id: string, @Body() data: NewStatusDto) {
    return this.jonStatusService.updateStatus(id, data);
  }
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return await this.jonStatusService.deleteStatus(id);
  }
}
