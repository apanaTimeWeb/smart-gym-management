// RESPONSIBILITY: Defines the backend login data shape consumed server-side by the frontend Auth proxy.
// FLOW: Auth session orchestrator -> mapper -> AuthLoginResponseDto -> canonical response envelope.

import { ApiProperty } from '@nestjs/swagger';

import { AuthUserResponseDto } from '@/backend_auth/auth_modules/auth/auth_dtos/auth-user-response.dto';
export class AuthLoginResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiJ9...' }) accessToken!: string;
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiJ9...' }) refreshToken!: string;
  @ApiProperty({ type: () => AuthUserResponseDto }) user!: AuthUserResponseDto;
}
