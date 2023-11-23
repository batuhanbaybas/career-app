import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { JobsModule } from './jobs/jobs.module';
import { JobStatusModule } from './job-status/job-status.module';
import { MailModule } from './mail/mail.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    JobsModule,
    JobStatusModule,
    MailModule,
    ResetPasswordModule,
  ],
  controllers: [],
})
export class AppModule {}
