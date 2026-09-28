// RESPONSIBILITY: Validates the complete Manager settings update request envelope.
// FLOW: HTTP payload -> nested DTO validation -> Settings update service.
import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';
import { SettingsGymProfileDto } from '@/backend_manager/manager_modules/settings/settings_dtos/manager-settings-gym-profile.dto';
import { SettingsMembershipSettingsDto } from '@/backend_manager/manager_modules/settings/settings_dtos/manager-settings-membership-settings.dto';
import { SettingsNotificationTemplateDto } from '@/backend_manager/manager_modules/settings/settings_dtos/manager-settings-notification-template.dto';
import { SettingsOperatingHourDto } from '@/backend_manager/manager_modules/settings/settings_dtos/manager-settings-operating-hour.dto';
import { SettingsPreferencesDto } from '@/backend_manager/manager_modules/settings/settings_dtos/manager-settings-preferences.dto';

export class ManagerSettingsUpdateSettingsRequestDto extends CoreRequestDto {
  /** @description Optional preference changes. @returns Nothing. */
  @IsOptional() @ValidateNested() @Type(() => SettingsPreferencesDto) preferences?: SettingsPreferencesDto;
  /** @description Optional gym profile changes. @returns Nothing. */
  @IsOptional() @ValidateNested() @Type(() => SettingsGymProfileDto) gymProfile?: SettingsGymProfileDto;
  /** @description Optional operating-hour replacements. @returns Nothing. */
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => SettingsOperatingHourDto) operatingHours?: SettingsOperatingHourDto[];
  /** @description Optional membership-policy changes. @returns Nothing. */
  @IsOptional() @ValidateNested() @Type(() => SettingsMembershipSettingsDto) membershipSettings?: SettingsMembershipSettingsDto;
  /** @description Optional notification-template replacements. @returns Nothing. */
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => SettingsNotificationTemplateDto) notificationTemplates?: SettingsNotificationTemplateDto[];
}

export { ManagerSettingsUpdateSettingsRequestDto as SettingsUpdateSettingsRequestDto };
