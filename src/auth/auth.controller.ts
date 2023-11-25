import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() data: AuthDto, @Res() res) {
    await this.authService.register(data).then((token) => {
      res.cookie('token', token.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
    });
    res.send({
      message: 'User created successfully',
    });
  }

  @Post('login')
  async login(@Body() data: AuthDto, @Res() res) {
    return await this.authService.login(data).then((token) => {
      return res.cookie('token', token.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
      });
    });
  }
}
