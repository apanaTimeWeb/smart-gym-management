// RESPONSIBILITY: Validates one Manager operating-hour entry.
// FLOW: Request payload -> strict DTO validation -> Settings update use case.
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

import { SettingsDay } from '@/backend_manager/modules/backend_manager/settings/settings.constants';

export class SettingsOperatingHourDto {
  @IsEnum(SettingsDay)
  day!: SettingsDay;

  @IsBoolean()
  isOpen!: boolean;

  @IsOptional()
  @IsString()
  openTime?: string;

  @IsOptional()
  @IsString()
  closeTime?: string;
}
