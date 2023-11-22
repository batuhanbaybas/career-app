import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update.user.dto';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
  @Post('reset-password')
  async resetPassword(
    @Param('id') id: string,
    @Body() data: { password: string },
  ) {
    return await this.userService.resetPassword(data, id);
  }
  @Put(':id')
  editMe(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.updateMe(id, data);
  }

  @Delete(':id')
  deleteMe(@Param('id') id: string) {
    return this.userService.deleteMe(id);
  }
}
