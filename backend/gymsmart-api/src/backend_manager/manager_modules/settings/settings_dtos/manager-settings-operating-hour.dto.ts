// RESPONSIBILITY: Owns the Manager settings request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates one Manager operating-hour entry.
// FLOW: Request payload -> strict DTO validation -> Settings update use case.
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

import { SettingsDay } from '@/backend_manager/manager_modules/settings/manager-settings.constants';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

export class ManagerSettingsOperatingHourDto extends CoreRequestDto {
  @IsEnum(SettingsDay)
  @ApiProperty()
  day!: SettingsDay;

  @IsBoolean()
  @ApiProperty()
  isOpen!: boolean;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  openTime?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  closeTime?: string;
}

export { ManagerSettingsOperatingHourDto as SettingsOperatingHourDto };
