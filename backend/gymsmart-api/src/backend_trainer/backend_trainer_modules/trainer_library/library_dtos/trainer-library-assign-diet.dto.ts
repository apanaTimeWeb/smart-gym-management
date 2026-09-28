// RESPONSIBILITY: Validates library request shape at the edge and contains no business logic.
// FLOW: HTTP body/query → TrainerLibraryAssignDietDto → service.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

/**
 * Intent: Defines the TrainerLibraryAssignDietDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerLibraryAssignDietDto {
    @ApiProperty({ type: String })
@IsUUID() dietPlanId!:string;
}
