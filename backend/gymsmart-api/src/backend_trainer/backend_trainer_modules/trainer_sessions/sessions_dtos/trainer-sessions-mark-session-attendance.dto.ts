// RESPONSIBILITY: Validates the frontend member attendance selection for one trainer session.
// FLOW: HTTP body → TrainerSessionsMarkSessionAttendanceDto → TrainerSessionsCommandService.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsUUID } from 'class-validator';


/**
 * Intent: Defines the TrainerSessionsMarkSessionAttendanceDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerSessionsMarkSessionAttendanceDto {
  @ApiProperty({ type: [String] })
@IsArray() @ArrayMaxSize(100) @IsUUID('4', { each: true }) memberIds!: string[];
}
