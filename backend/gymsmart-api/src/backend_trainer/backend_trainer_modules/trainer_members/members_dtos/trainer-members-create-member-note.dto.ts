// RESPONSIBILITY: Validates members request shape at the edge and contains no business logic.
// FLOW: HTTP body/query → TrainerMembersCreateMemberNoteDto → service.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

/**
 * Intent: Defines the TrainerMembersCreateMemberNoteDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerMembersCreateMemberNoteDto {
    @ApiProperty({ type: String })
@IsString() @MinLength(1) @MaxLength(2000) text!:string;
}
