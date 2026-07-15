import { Injectable, Logger } from '@nestjs/common';
import { AuthRepository } from '@/modules/auth/auth.repository';
import type { AuthLogoutResponse } from '@/modules/auth/auth.interfaces';
import { AUTH_MESSAGES } from '@/modules/auth/auth.constants';

@Injectable()
export class AuthLogoutService {
  private readonly logger = new Logger(AuthLogoutService.name);

  constructor(private authRepository: AuthRepository) {}

  async logout(userId: string): Promise<AuthLogoutResponse> {
    await this.authRepository.updateUser(userId, { refreshToken: null });
    this.logger.log(`Logged out user id: ${userId}`);
    return {
      success: true,
      message: AUTH_MESSAGES.LOGOUT_SUCCESS,
    };
  }
}
