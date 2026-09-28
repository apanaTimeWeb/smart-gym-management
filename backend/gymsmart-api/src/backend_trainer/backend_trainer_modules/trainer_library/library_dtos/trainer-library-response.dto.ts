// RESPONSIBILITY: Documents diet-library query and assignment response contracts.
// FLOW: Library query/command services → response DTO contract → canonical API envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


/**
 * Intent: Defines the TrainerLibraryMealResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerLibraryMealResponseDto { @ApiPropertyOptional() name?: string; @ApiPropertyOptional() time?: string; @ApiPropertyOptional() items?: string; @ApiPropertyOptional() description?: string; }

/**
 * Intent: Defines the TrainerLibraryDietPlanResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerLibraryDietPlanResponseDto { @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty() goal!: string; @ApiPropertyOptional() calories?: number; @ApiPropertyOptional() protein?: number; @ApiPropertyOptional() carbs?: number; @ApiPropertyOptional() fats?: number; @ApiPropertyOptional() description?: string; @ApiProperty({ type: [Object] }) meals!: Array<string | TrainerLibraryMealResponseDto>; @ApiProperty() isActive!: boolean; }

/**
 * Intent: Defines the TrainerLibraryDietPlansResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerLibraryDietPlansResponseDto { @ApiProperty({ type: [TrainerLibraryDietPlanResponseDto] }) dietPlans!: TrainerLibraryDietPlanResponseDto[]; @ApiProperty() total!: number; }

/**
 * Intent: Defines the TrainerLibraryAssignedMemberResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerLibraryAssignedMemberResponseDto { @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty({ nullable: true }) assignedDietPlanId!: string | null; }

/**
 * Intent: Defines the TrainerLibraryAssignedMembersResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerLibraryAssignedMembersResponseDto { @ApiProperty({ type: [TrainerLibraryAssignedMemberResponseDto] }) members!: TrainerLibraryAssignedMemberResponseDto[]; }

/**
 * Intent: Defines the TrainerLibraryAssignmentResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerLibraryAssignmentResponseDto { @ApiProperty() memberId!: string; @ApiProperty() dietPlanId!: string; }

/**
 * Intent: Defines the TrainerLibraryMutationResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerLibraryMutationResponseDto { @ApiPropertyOptional() deleted?: boolean; @ApiPropertyOptional() memberId?: string; @ApiPropertyOptional() dietPlanId?: string; }
