import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for PATCH /api/v1/manager/settings.
// FLOW: HTTP payload -> SettingsUpdateSettingsRequestDto validation -> write use case -> orchestrator.

import { IsArray, IsOptional, IsString } from 'class-validator';

export class SettingsUpdateSettingsRequestDto extends CoreRequestDto {
  @IsString()
  preferences!: any;

  @IsString()
  gymProfile!: any;

  @IsString()
  operatingHours!: any;

  @IsString()
  membershipSettings!: any;

  @IsArray()
  notificationTemplates!: any[];

}
