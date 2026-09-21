// RESPONSIBILITY: Defines the exact user object shape consumed by the supplied frontend Auth schema.
// FLOW: Auth domain user -> AuthApiResponseMapper -> AuthUserResponseDto -> API envelope.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AuthRole } from '@/backend_auth/modules/auth/auth.roles.constants';
export class AuthUserResponseDto {
  @ApiProperty({ example: '11111111-1111-4111-8111-111111111111' }) id!: string;
  @ApiProperty({ example: 'Demo Admin' }) name!: string;
  @ApiProperty({ example: 'admin@gymsmart.com' }) email!: string;
  @ApiProperty({ enum: AuthRole, example: AuthRole.ADMIN }) role!: AuthRole;
  @ApiPropertyOptional({ example: '22222222-2222-4222-8222-222222222222' }) tenantId?: string;
}
