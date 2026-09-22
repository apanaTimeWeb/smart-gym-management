// RESPONSIBILITY: Validates notifications request shape at the edge and contains no business logic.
// FLOW: HTTP body/query → NotificationsUpdatePreferencesDto → service.

import { IsBoolean, IsOptional } from 'class-validator';
export class NotificationsUpdatePreferencesDto {
    @IsOptional() @IsBoolean() email?:boolean; @IsOptional() @IsBoolean() push?:boolean; @IsOptional() @IsBoolean() sms?:boolean; @IsOptional() @IsBoolean() sessionReminders?:boolean; @IsOptional() @IsBoolean() memberUpdates?:boolean;
}
