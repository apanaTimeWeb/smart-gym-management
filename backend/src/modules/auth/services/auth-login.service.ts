import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from '@/modules/auth/services/auth.repository';
import { LoginDto } from '@/modules/auth/dto/login.dto';
import { InvalidCredentialsException, AccountDeactivatedException } from '@/modules/auth/auth.exceptions';
import { AUTH_MESSAGES } from '@/modules/auth/auth.constants';
import type { JwtPayload, AuthLoginResponse } from '@/modules/auth/auth.interfaces';

@Injectable()
export class AuthLoginService {
  private readonly logger = new Logger(AuthLoginService.name);

  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthLoginResponse> {
    const { email, password } = loginDto;
    this.logger.log(`Attempting login for email: ${email}`);

    // 1. Find user by email
    const user = await this.authRepository.findUserByEmail(email);

    if (!user) {
      this.logger.warn(`Login failed: User not found for email ${email}`);
      throw new InvalidCredentialsException();
    }

    if (!user.isActive) {
      this.logger.warn(`Login failed: Account deactivated for email ${email}`);
      throw new AccountDeactivatedException();
    }

    // 2. Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      this.logger.warn(`Login failed: Invalid password for email ${email}`);
      throw new InvalidCredentialsException();
    }

    // 3. Generate JWT token
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role as string,
    };

    const accessToken = this.jwtService.sign(payload);
    this.logger.log(`Login successful for user id: ${user.id}`);

    // 4. Return user info + token (exclude password)
    const { password: _password, ...userWithoutPassword } = user;

    return {
      message: AUTH_MESSAGES.LOGIN_SUCCESS,
      data: {
        accessToken,
        user: userWithoutPassword,
      },
    };
  }
}
