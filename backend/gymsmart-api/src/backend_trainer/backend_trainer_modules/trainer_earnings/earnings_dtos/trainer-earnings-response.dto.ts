// RESPONSIBILITY: Documents the complete Trainer Earnings overview, KPI, payout, and history response contracts.
// FLOW: Earnings query service → response DTO contract → canonical API envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


/**
 * Intent: Defines the TrainerEarningsKpisResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerEarningsKpisResponseDto { @ApiProperty({ pattern: '^[A-Z]{3}$', example: 'INR' }) currency!: string; @ApiProperty() totalEarnings!: number; @ApiProperty() pendingPayouts!: number; @ApiProperty() sessionsCompleted!: number; @ApiProperty() commissionRate!: number; @ApiProperty() taxDeduction!: number; @ApiPropertyOptional() bankAccount?: string; @ApiPropertyOptional() commissionTier?: string; }

/**
 * Intent: Defines the TrainerEarningsPendingPayoutResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerEarningsPendingPayoutResponseDto { @ApiProperty({ pattern: '^[A-Z]{3}$', example: 'INR' }) currency!: string; @ApiProperty() id!: string; @ApiProperty() period!: string; @ApiProperty() amount!: number; @ApiProperty({ enum: ['pending', 'processing', 'settled'] }) status!: string; @ApiProperty() dueDate!: string; }

/**
 * Intent: Defines the TrainerEarningsHistoryRowResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerEarningsHistoryRowResponseDto { @ApiProperty({ pattern: '^[A-Z]{3}$', example: 'INR' }) currency!: string; @ApiProperty() id!: string; @ApiProperty() date!: string; @ApiProperty({ enum: ['Session', 'Bonus', 'Commission'] }) type!: string; @ApiProperty() description!: string; @ApiProperty() amount!: number; @ApiProperty({ enum: ['pending', 'processing', 'settled'] }) status!: string; @ApiPropertyOptional() sessionId?: string; @ApiPropertyOptional() tdsDeducted?: number; @ApiPropertyOptional() netPayout?: number; @ApiPropertyOptional() invoiceNumber?: string; }

/**
 * Intent: Defines the TrainerEarningsHistoryResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerEarningsHistoryResponseDto { @ApiProperty({ type: [TrainerEarningsHistoryRowResponseDto] }) history!: TrainerEarningsHistoryRowResponseDto[]; @ApiProperty() historyTotal!: number; @ApiProperty() historyPage!: number; @ApiProperty() historyLimit!: number; @ApiProperty({ type: Object }) pagination!: { total: number; page: number; limit: number; totalPages: number; hasNextPage: boolean; hasPrevPage: boolean }; }

/**
 * Intent: Defines the TrainerEarningsOverviewResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerEarningsOverviewResponseDto { @ApiProperty({ type: TrainerEarningsKpisResponseDto }) kpis!: TrainerEarningsKpisResponseDto; @ApiProperty({ type: [TrainerEarningsPendingPayoutResponseDto] }) pendingPayouts!: TrainerEarningsPendingPayoutResponseDto[]; @ApiProperty({ type: [TrainerEarningsHistoryRowResponseDto] }) history!: TrainerEarningsHistoryRowResponseDto[]; @ApiProperty() historyTotal!: number; @ApiProperty() historyPage!: number; @ApiProperty() historyLimit!: number; @ApiProperty({ type: Object }) pagination!: { total: number; page: number; limit: number; totalPages: number; hasNextPage: boolean; hasPrevPage: boolean }; }
