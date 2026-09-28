// RESPONSIBILITY: Owns the Manager settings request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates Manager locale, timezone, and notification preferences.
// FLOW: Request payload -> strict DTO validation -> Settings update use case.
import { IsBoolean, IsString } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

export class ManagerSettingsPreferencesDto extends CoreRequestDto {
  @IsString()
  @ApiProperty()
  language!: string;

  @IsString()
  @ApiProperty()
  timezone!: string;

  @IsBoolean()
  @ApiProperty()
  pushNotificationsEnabled!: boolean;

  @IsBoolean()
  @ApiProperty()
  emailDailyReports!: boolean;
}

export { ManagerSettingsPreferencesDto as SettingsPreferencesDto };
