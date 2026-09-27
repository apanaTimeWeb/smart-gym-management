// RESPONSIBILITY: Owns the Manager settings request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates Manager notification-template records.
// FLOW: Request payload -> strict DTO validation -> Settings update use case.
import { IsArray, IsBoolean, IsEnum, IsISO8601, IsOptional, IsString, IsUUID } from 'class-validator';

import { SettingsTemplateChannel, SettingsTemplateType } from '@/backend_manager/manager_modules/settings/manager-settings.constants';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

export class ManagerSettingsNotificationTemplateDto extends CoreRequestDto {
  @IsUUID()
  @ApiProperty()
  id!: string;

  @IsEnum(SettingsTemplateType)
  @ApiProperty()
  type!: SettingsTemplateType;

  @IsEnum(SettingsTemplateChannel)
  @ApiProperty()
  channel!: SettingsTemplateChannel;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  subject?: string;

  @IsString()
  @ApiProperty()
  body!: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty()
  variables!: string[];

  @IsBoolean()
  @ApiProperty()
  isActive!: boolean;

  @IsISO8601()
  @ApiProperty()
  updatedAt!: string;
}

export { ManagerSettingsNotificationTemplateDto as SettingsNotificationTemplateDto };
