import { CoreRequestDto } from '@/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for PATCH /api/v1/manager/profile/password.
// FLOW: HTTP payload -> ProfileUpdatePasswordRequestDto validation -> write use case -> orchestrator.

import { IsOptional, IsString } from 'class-validator';

export class ProfileUpdatePasswordRequestDto extends CoreRequestDto {
  @IsString()
  currentPassword!: string;

  @IsString()
  newPassword!: string;

  @IsString()
  confirmPassword!: string;

}
