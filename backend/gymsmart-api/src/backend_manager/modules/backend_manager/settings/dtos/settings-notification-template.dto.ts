// RESPONSIBILITY: Validates Manager notification-template records.
// FLOW: Request payload -> strict DTO validation -> Settings update use case.
import { IsArray, IsBoolean, IsEnum, IsISO8601, IsOptional, IsString, IsUUID } from 'class-validator';

import { SettingsTemplateChannel, SettingsTemplateType } from '@/backend_manager/modules/backend_manager/settings/settings.constants';

export class SettingsNotificationTemplateDto {
  @IsUUID()
  id!: string;

  @IsEnum(SettingsTemplateType)
  type!: SettingsTemplateType;

  @IsEnum(SettingsTemplateChannel)
  channel!: SettingsTemplateChannel;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsString()
  body!: string;

  @IsArray()
  @IsString({ each: true })
  variables!: string[];

  @IsBoolean()
  isActive!: boolean;

  @IsISO8601()
  updatedAt!: string;
}
