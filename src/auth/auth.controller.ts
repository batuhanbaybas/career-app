import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() data: AuthDto) {
    return await this.authService.register(data);
  }

  @Post('login')
  async login(@Body() data: AuthDto) {
    return await this.authService.login(data);
  }
}
