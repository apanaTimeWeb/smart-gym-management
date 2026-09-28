// RESPONSIBILITY: Validates notifications request shape at the edge and contains no business logic.
// FLOW: HTTP body/query → TrainerNotificationsUpdatePreferencesDto → service.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

/**
 * Intent: Defines the TrainerNotificationsUpdatePreferencesDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerNotificationsUpdatePreferencesDto {
    @ApiPropertyOptional({ type: Boolean })
@IsOptional() @IsBoolean() email?:boolean; @ApiPropertyOptional({ type: Boolean })
@IsOptional() @IsBoolean() push?:boolean; @ApiPropertyOptional({ type: Boolean })
@IsOptional() @IsBoolean() sms?:boolean; @ApiPropertyOptional({ type: Boolean })
@IsOptional() @IsBoolean() sessionReminders?:boolean; @ApiPropertyOptional({ type: Boolean })
@IsOptional() @IsBoolean() memberUpdates?:boolean;
}
