// RESPONSIBILITY: Validates Admin login input at the API boundary.
// FLOW: POST /auth/login â†’ AdminCoreAuthLoginDto â†’ AdminCoreAuthService.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsEmail, IsString, MinLength } from 'class-validator';

/**
 * @description Defines the AdminCoreAuthLoginDto boundary for the admin_core_auth backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreAuthLoginDto {
@ApiProperty() @IsEmail()
  email!: string;

@ApiProperty() @IsString()
  @MinLength(8)
  password!: string;
}


/**
 * @description Represents the non-sensitive Admin actor fields returned after authentication.
 * @remarks Never add password hashes, refresh tokens, or credential material to this DTO.
 */
export class AdminCoreAuthUserDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() email!: string;
  @ApiProperty() role!: string;
  @ApiProperty() tenantId!: string;
}

/**
 * @description Represents the canonical login response payload before the global ApiResponse envelope is applied.
 */
export class AdminCoreAuthLoginResponseDto {
  @ApiProperty() accessToken!: string;
  @ApiProperty({ type: AdminCoreAuthUserDto }) user!: AdminCoreAuthUserDto;
}

/**
 * @description Represents the refresh response payload before the global ApiResponse envelope is applied.
 */
export class AdminCoreAuthRefreshResponseDto {
  @ApiProperty() accessToken!: string;
}
