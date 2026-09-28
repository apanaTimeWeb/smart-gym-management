// RESPONSIBILITY: Validates the optional cancellation reason for a trainer-owned session.
// FLOW: HTTP body → TrainerSessionsCancelSessionDto → TrainerSessionsCommandService.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';


/**
 * Intent: Defines the TrainerSessionsCancelSessionDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerSessionsCancelSessionDto {
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() @MinLength(2) @MaxLength(500) reason?: string;
}
