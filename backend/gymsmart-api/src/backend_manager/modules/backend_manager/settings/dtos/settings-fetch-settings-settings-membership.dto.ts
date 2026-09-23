// RESPONSIBILITY: Defines one DTO shape owned by this Manager feature.
// FLOW: Feature API contract -> explicit DTO type -> Swagger serialization.
import { ApiProperty } from '@nestjs/swagger';

export class SettingsFetchSettingsSettingsMembershipDto { @ApiProperty({type:Number}) gracePeriodDays!: number; @ApiProperty({type:Boolean}) autoSuspendOnExpiry!: boolean; @ApiProperty({type:Number}) autoSuspendAfterDays!: number; @ApiProperty({type:Boolean}) allowFreeze!: boolean; @ApiProperty({type:Number}) maxFreezeDaysPerYear!: number; @ApiProperty({type:Number}) reminderDaysBefore!: number; }
