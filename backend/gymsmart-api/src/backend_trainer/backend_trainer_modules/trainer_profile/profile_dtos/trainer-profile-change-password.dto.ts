// RESPONSIBILITY: Validates the authenticated Trainer password-change payload only.
// FLOW: HTTP body → TrainerProfileChangePasswordDto → TrainerProfileTrainerPasswordChangeService.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';


/**
 * Intent: Defines the TrainerProfileChangePasswordDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerProfileChangePasswordDto {
  @ApiProperty({ type: String })
@IsString() @MinLength(8) currentPassword!: string;
  @ApiProperty({ type: String })
@IsString() @MinLength(8) newPassword!: string;
  @ApiProperty({ type: String })
@IsString() @MinLength(8) confirmPassword!: string;
}
