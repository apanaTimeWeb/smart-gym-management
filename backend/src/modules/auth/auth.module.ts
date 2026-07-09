import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@/modules/auth/entities/user.entity';
import { AuthRepository } from '@/modules/auth/auth.repository';
import { AuthLoginController } from '@/modules/auth/controllers/auth-login.controller';
import { AuthMeController } from '@/modules/auth/controllers/auth-me.controller';
import { AuthLoginService } from '@/modules/auth/services/auth-login.service';
import { AuthMeService } from '@/modules/auth/services/auth-me.service';
import { JwtStrategy } from '@/modules/auth/auth.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'gymsmart_secret',
        signOptions: {
          expiresIn: (configService.get<string>('JWT_EXPIRES_IN') || '7d') as `${number}${'s' | 'm' | 'h' | 'd' | 'w' | 'y'}`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthLoginController, AuthMeController],
  providers: [AuthRepository, AuthLoginService, AuthMeService, JwtStrategy],
  exports: [AuthLoginService, AuthMeService, JwtModule],
})
export class AuthModule {}
