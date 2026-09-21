// RESPONSIBILITY: Defines the rotated access/refresh token data shape used only by the server-side frontend route.
// FLOW: Auth refresh service -> mapper -> AuthRefreshResponseDto -> canonical envelope.

import { ApiProperty } from '@nestjs/swagger';

export class AuthRefreshResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiJ9...' }) accessToken!: string;
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiJ9...' }) refreshToken!: string;
}
