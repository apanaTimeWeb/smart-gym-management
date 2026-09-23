// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';import { SettingsUpdateSettingsSettingsPreferencesDto } from '@/backend_manager/modules/backend_manager/settings/dtos/settings-update-settings-settings-preferences.dto';
import { SettingsUpdateSettingsSettingsGymProfileDto } from '@/backend_manager/modules/backend_manager/settings/dtos/settings-update-settings-settings-gym-profile.dto';
import { SettingsUpdateSettingsSettingsOperatingHourDto } from '@/backend_manager/modules/backend_manager/settings/dtos/settings-update-settings-settings-operating-hour.dto';
import { SettingsUpdateSettingsSettingsMembershipDto } from '@/backend_manager/modules/backend_manager/settings/dtos/settings-update-settings-settings-membership.dto';
import { SettingsUpdateSettingsSettingsNotificationTemplateDto } from '@/backend_manager/modules/backend_manager/settings/dtos/settings-update-settings-settings-notification-template.dto';

export class SettingsUpdateSettingsResponseDto {
  @ApiProperty({ type: SettingsUpdateSettingsSettingsPreferencesDto }) preferences!: SettingsUpdateSettingsSettingsPreferencesDto;
  @ApiProperty({ type: SettingsUpdateSettingsSettingsGymProfileDto }) gymProfile!: SettingsUpdateSettingsSettingsGymProfileDto;
  @ApiProperty({ type: [SettingsUpdateSettingsSettingsOperatingHourDto] }) operatingHours!: SettingsUpdateSettingsSettingsOperatingHourDto[];
  @ApiProperty({ type: SettingsUpdateSettingsSettingsMembershipDto }) membershipSettings!: SettingsUpdateSettingsSettingsMembershipDto;
  @ApiProperty({ type: [SettingsUpdateSettingsSettingsNotificationTemplateDto] }) notificationTemplates!: SettingsUpdateSettingsSettingsNotificationTemplateDto[];
}
