// RESPONSIBILITY: Owns the Manager settings request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates Manager membership-policy settings.
// FLOW: Request payload -> strict DTO validation -> Settings update use case.
import { IsBoolean, Min, IsInt } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

export class ManagerSettingsMembershipSettingsDto extends CoreRequestDto {
  @IsInt()
  @Min(0)
  @ApiProperty()
  gracePeriodDays!: number;

  @IsBoolean()
  @ApiProperty()
  autoSuspendOnExpiry!: boolean;

  @IsInt()
  @Min(0)
  @ApiProperty()
  autoSuspendAfterDays!: number;

  @IsBoolean()
  @ApiProperty()
  allowFreeze!: boolean;

  @IsInt()
  @Min(0)
  @ApiProperty()
  maxFreezeDaysPerYear!: number;

  @IsInt()
  @Min(0)
  @ApiProperty()
  reminderDaysBefore!: number;
}

export { ManagerSettingsMembershipSettingsDto as SettingsMembershipSettingsDto };
