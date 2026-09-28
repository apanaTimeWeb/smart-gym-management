// RESPONSIBILITY: Validates profile request shape at the edge and contains no business logic.
// FLOW: HTTP body/query → TrainerProfileUpdateTrainerProfileDto → service.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsString, MaxLength, MinLength } from 'class-validator';

/**
 * Intent: Defines the TrainerProfileUpdateTrainerProfileDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerProfileUpdateTrainerProfileDto {
    @ApiProperty({ type: String })
@IsString() @MinLength(1) @MaxLength(160) name!:string; @ApiProperty({ type: String })
@IsString() @MaxLength(30) phone!:string; @ApiProperty({ type: [String] })
@IsArray() @ArrayMaxSize(10) specialization!:string[];
}
