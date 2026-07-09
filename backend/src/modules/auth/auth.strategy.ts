import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthRepository } from '@/modules/auth/auth.repository';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '@/modules/auth/auth.interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private authRepository: AuthRepository,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'gymsmart_secret',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authRepository.findUserByIdForStrategy(payload.sub);

    if (!user || !user.isActive) {
      this.logger.warn(`JWT validation failed for user id: ${payload.sub}`);
      throw new UnauthorizedException('User not found or account deactivated');
    }

    return user;
  }
}
