// RESPONSIBILITY: Validates Manager membership-policy settings.
// FLOW: Request payload -> strict DTO validation -> Settings update use case.
import { IsBoolean, Min, IsInt } from 'class-validator';

export class SettingsMembershipSettingsDto {
  @IsInt()
  @Min(0)
  gracePeriodDays!: number;

  @IsBoolean()
  autoSuspendOnExpiry!: boolean;

  @IsInt()
  @Min(0)
  autoSuspendAfterDays!: number;

  @IsBoolean()
  allowFreeze!: boolean;

  @IsInt()
  @Min(0)
  maxFreezeDaysPerYear!: number;

  @IsInt()
  @Min(0)
  reminderDaysBefore!: number;
}
