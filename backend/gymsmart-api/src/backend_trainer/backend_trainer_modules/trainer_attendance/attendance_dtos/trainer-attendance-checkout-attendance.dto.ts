// RESPONSIBILITY: Validates the Trainer attendance checkout request shape only.
// FLOW: HTTP body → TrainerAttendanceCheckoutAttendanceDto → TrainerAttendanceCheckoutService.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsISO8601, IsOptional, IsString } from 'class-validator';


/**
 * Intent: Defines the TrainerAttendanceCheckoutAttendanceDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerAttendanceCheckoutAttendanceDto {
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsISO8601() checkoutAt?: string;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsISO8601() checkOutTime?: string;
}
