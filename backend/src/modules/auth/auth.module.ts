import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@/modules/auth/entities/user.entity';
import { AuthRepository } from '@/modules/auth/auth.repository';
import { AuthLoginController } from '@/modules/auth/controllers/auth-login.controller';
import { AuthRefreshController } from '@/modules/auth/controllers/auth-refresh.controller';
import { AuthLogoutController } from '@/modules/auth/controllers/auth-logout.controller';
import { AuthMeController } from '@/modules/auth/controllers/auth-me.controller';
import { AuthLoginService } from '@/modules/auth/services/auth-login.service';
import { AuthRefreshService } from '@/modules/auth/services/auth-refresh.service';
import { AuthLogoutService } from '@/modules/auth/services/auth-logout.service';
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
          expiresIn: (configService.get<string>('JWT_EXPIRES_IN') ||
            '7d') as `${number}${'s' | 'm' | 'h' | 'd' | 'w' | 'y'}`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    AuthLoginController,
    AuthRefreshController,
    AuthLogoutController,
    AuthMeController,
  ],
  providers: [
    AuthRepository,
    AuthLoginService,
    AuthRefreshService,
    AuthLogoutService,
    AuthMeService,
    JwtStrategy,
  ],
  exports: [
    AuthLoginService,
    AuthRefreshService,
    AuthLogoutService,
    AuthMeService,
    JwtModule,
  ],
})
export class AuthModule {}
