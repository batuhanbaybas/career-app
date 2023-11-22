import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as argo from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    readonly prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async register(data: AuthDto) {
    // hash password
    const password = await argo.hash(data.password);

    // create user
    try {
      const user = await this.prisma.user.create({
        data: {
          ...data,
          password,
        },
      });
      delete user.password;
      // take access token
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error) {
        console.log(error.code);
        if (error.code === 'P2002') {
          throw new ForbiddenException('User already exists!');
        }
      }
      throw new ForbiddenException('Something went wrong!');
    }
  }
  async login(data: AuthDto) {
    // find user
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('User not found!');
    }
    // compare password
    const isMatch = await argo.verify(user.password, data.password);
    if (!isMatch) {
      throw new ForbiddenException('Password incorrect!');
    }
    delete user.password;
    // take access token
    return this.signToken(user.id, user.email);
  }
  async signToken(
    userID: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: userID, email };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: this.config.get('JWT_SECRET'),
    });
    return {
      access_token: token,
    };
  }

  async forgetPassword() {
    return console.log('forget password');
  }
}
