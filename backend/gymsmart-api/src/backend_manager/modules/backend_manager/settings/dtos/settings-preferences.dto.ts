// RESPONSIBILITY: Validates Manager locale, timezone, and notification preferences.
// FLOW: Request payload -> strict DTO validation -> Settings update use case.
import { IsBoolean, IsString } from 'class-validator';

export class SettingsPreferencesDto {
  @IsString()
  language!: string;

  @IsString()
  timezone!: string;

  @IsBoolean()
  pushNotificationsEnabled!: boolean;

  @IsBoolean()
  emailDailyReports!: boolean;
}
