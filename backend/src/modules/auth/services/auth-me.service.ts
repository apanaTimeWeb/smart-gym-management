import { Injectable, Logger } from '@nestjs/common';
import { AuthRepository } from '@/modules/auth/auth.repository';
import { UserNotFoundException } from '@/modules/auth/auth.exceptions';
import { AUTH_MESSAGES } from '@/modules/auth/auth.constants';
import type { AuthMeResponse } from '@/modules/auth/auth.interfaces';

@Injectable()
export class AuthMeService {
  private readonly logger = new Logger(AuthMeService.name);

  constructor(private authRepository: AuthRepository) {}

  async getMe(userId: string): Promise<AuthMeResponse> {
    this.logger.log(`Fetching user profile for id: ${userId}`);
    const user = await this.authRepository.findUserByIdForMe(userId);

    if (!user) {
      this.logger.warn(
        `Failed to fetch profile: User not found for id ${userId}`,
      );
      throw new UserNotFoundException();
    }

    return {
      message: AUTH_MESSAGES.USER_FETCHED_SUCCESS,
      data: user as any,
    };
  }
}
