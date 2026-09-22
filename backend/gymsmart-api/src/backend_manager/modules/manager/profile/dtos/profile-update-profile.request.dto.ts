import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for PATCH /api/v1/manager/profile.
// FLOW: HTTP payload -> ProfileUpdateProfileRequestDto validation -> write use case -> orchestrator.

import { IsOptional, IsString } from 'class-validator';

export class ProfileUpdateProfileRequestDto extends CoreRequestDto {
  @IsString()
  name!: string;

  @IsString()
  phone!: string;

}
