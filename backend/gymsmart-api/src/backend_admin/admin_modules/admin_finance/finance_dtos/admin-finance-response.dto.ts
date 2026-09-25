// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin finance.
// FLOW: Repository domain â†’ Finance response mapper â†’ ApiResponse<T>.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AdminFinanceStatus } from '@/backend_admin/admin_modules/admin_finance/admin-finance.constants'

class AdminPaymentMemberDto {
  @ApiProperty() name!: string;
  @ApiProperty() email!: string;
  @ApiProperty() phone!: string;
}

/**
 * @description Defines the AdminFinancePaymentDto boundary for the admin_finance backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminFinancePaymentDto {
  @ApiProperty() id!: string;
  @ApiProperty() memberId!: string;
  @ApiProperty() amount!: number;
  @ApiProperty() method!: string;
  @ApiPropertyOptional({ enum: ['CASH', 'UPI', 'CARD', 'ONLINE'] }) paymentMode?: string;
  @ApiPropertyOptional() gstAmount?: number;
  @ApiPropertyOptional() taxRate?: number;
  @ApiPropertyOptional() invoiceNumber?: string;
  @ApiPropertyOptional() hsn_code?: string;
  @ApiPropertyOptional() planId?: string;
  @ApiPropertyOptional({ enum: ['PAYMENT', 'REFUND', 'ADJUSTMENT'] }) type?: string = undefined;
  @ApiProperty() status!: AdminFinanceStatus;
  @ApiPropertyOptional() notes?: string;
  @ApiProperty() invoiceNo!: string;
  @ApiProperty() paidAt!: string;
  @ApiPropertyOptional({ type: AdminPaymentMemberDto }) member?: AdminPaymentMemberDto;
  @ApiPropertyOptional() refundReason?: string;
  @ApiPropertyOptional() receiptNumber?: string;
  @ApiPropertyOptional() discountApplied?: number;
  @ApiPropertyOptional() couponCode?: string;
  @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' })
  currency!: string;
}

/**
 * @description Defines the AdminFinancePaymentResponseDto boundary for the admin_finance backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminFinancePaymentResponseDto {
  @ApiProperty({ type: [AdminFinancePaymentDto] }) payments!: AdminFinancePaymentDto[];
  @ApiProperty() total!: number;
}

/**
 * @description Defines the AdminFinanceExpenseDto boundary for the admin_finance backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminFinanceExpenseDto {
  @ApiProperty() id!: string;
  @ApiProperty() amount!: number;
  @ApiProperty() category!: string;
  @ApiProperty() branchId!: string;
  @ApiPropertyOptional() branchName?: string;
  @ApiProperty() date!: string;
  @ApiPropertyOptional() notes?: string;
  @ApiProperty() recordedBy!: string;
  @ApiPropertyOptional() vendor?: string;
  @ApiPropertyOptional() billNumber?: string;
  @ApiPropertyOptional() approvedBy?: string;
  @ApiPropertyOptional() receiptUrl?: string;
  @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' })
  currency!: string;
}

/**
 * @description Defines the AdminFinanceExpenseResponseDto boundary for the admin_finance backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminFinanceExpenseResponseDto {
  @ApiProperty({ type: [AdminFinanceExpenseDto] }) expenses!: AdminFinanceExpenseDto[];
  @ApiProperty() total!: number;
  @ApiProperty() totalAmount!: number;
  @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' })
  currency!: string;
}

class RevenueByMethodDto {
  @ApiProperty() UPI!: number;
  @ApiProperty() Cash!: number;
  @ApiProperty() Card!: number;
  @ApiProperty() NetBanking!: number;
}

class MonthlyDataDto {
  @ApiProperty() month!: string;
  @ApiProperty() revenue!: number;
  @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' })
  currency!: string;
}

/**
 * @description Defines the AdminFinanceSummaryResponseDto boundary for the admin_finance backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminFinanceSummaryResponseDto {
  @ApiProperty() totalRevenue!: number;
  @ApiProperty() monthlyRevenue!: number;
  @ApiProperty() pendingAmount!: number;
  @ApiProperty() totalPayments!: number;
  @ApiProperty() totalExpenses!: number;
  @ApiProperty() netProfit!: number;
  @ApiProperty({ type: RevenueByMethodDto }) revenueByMethod!: RevenueByMethodDto;
  @ApiProperty({ type: [MonthlyDataDto] }) monthlyData!: MonthlyDataDto[];
  @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' })
  currency!: string;
}

class BranchRevenueBreakdownDto {
  @ApiProperty() memberships!: number;
  @ApiProperty() ptSessions!: number;
  @ApiProperty() products!: number;
  @ApiProperty() other!: number;
}

class BranchExpenseBreakdownDto {
  @ApiProperty() rent!: number;
  @ApiProperty() salaries!: number;
  @ApiProperty() utilities!: number;
  @ApiProperty() maintenance!: number;
  @ApiProperty() marketing!: number;
}

/**
 * @description Defines the AdminFinancePnlRecordDto boundary for the admin_finance backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminFinancePnlRecordDto {
  @ApiProperty() branchId!: string;
  @ApiProperty() branchName!: string;
  @ApiProperty() location!: string;
  @ApiProperty() revenue!: number;
  @ApiProperty() expenses!: number;
  @ApiProperty() netProfit!: number;
  @ApiProperty() marginPct!: number;
  @ApiProperty({ enum: ['PROFITABLE', 'BREAKEVEN', 'LOSS'] }) status!: AdminFinanceStatus;
  @ApiProperty() momDelta!: number;
  @ApiProperty({ type: BranchRevenueBreakdownDto }) revenueBreakdown!: BranchRevenueBreakdownDto;
  @ApiProperty({ type: BranchExpenseBreakdownDto }) expenseBreakdown!: BranchExpenseBreakdownDto;
  @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' })
  currency!: string;
}

