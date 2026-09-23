// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';import { SettingsFetchSettingsSettingsPreferencesDto } from '@/backend_manager/modules/backend_manager/settings/dtos/settings-fetch-settings-settings-preferences.dto';
import { SettingsFetchSettingsSettingsGymProfileDto } from '@/backend_manager/modules/backend_manager/settings/dtos/settings-fetch-settings-settings-gym-profile.dto';
import { SettingsFetchSettingsSettingsOperatingHourDto } from '@/backend_manager/modules/backend_manager/settings/dtos/settings-fetch-settings-settings-operating-hour.dto';
import { SettingsFetchSettingsSettingsMembershipDto } from '@/backend_manager/modules/backend_manager/settings/dtos/settings-fetch-settings-settings-membership.dto';
import { SettingsFetchSettingsSettingsNotificationTemplateDto } from '@/backend_manager/modules/backend_manager/settings/dtos/settings-fetch-settings-settings-notification-template.dto';

export class SettingsFetchSettingsResponseDto {
  @ApiProperty({ type: SettingsFetchSettingsSettingsPreferencesDto }) preferences!: SettingsFetchSettingsSettingsPreferencesDto;
  @ApiProperty({ type: SettingsFetchSettingsSettingsGymProfileDto }) gymProfile!: SettingsFetchSettingsSettingsGymProfileDto;
  @ApiProperty({ type: [SettingsFetchSettingsSettingsOperatingHourDto] }) operatingHours!: SettingsFetchSettingsSettingsOperatingHourDto[];
  @ApiProperty({ type: SettingsFetchSettingsSettingsMembershipDto }) membershipSettings!: SettingsFetchSettingsSettingsMembershipDto;
  @ApiProperty({ type: [SettingsFetchSettingsSettingsNotificationTemplateDto] }) notificationTemplates!: SettingsFetchSettingsSettingsNotificationTemplateDto[];
}
