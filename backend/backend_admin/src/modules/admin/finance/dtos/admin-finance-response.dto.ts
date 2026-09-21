// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin finance.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// FLOW: Repository domain → Finance response mapper → ApiResponse<T>.

class AdminPaymentMemberDto {
  @ApiProperty() name!: string;
  @ApiProperty() email!: string;
  @ApiProperty() phone!: string;
}

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
  @ApiPropertyOptional({ enum: ['PAYMENT', 'REFUND', 'ADJUSTMENT'] }) type?: string;
  @ApiProperty() status!: string;
  @ApiPropertyOptional() notes?: string;
  @ApiProperty() invoiceNo!: string;
  @ApiProperty() paidAt!: string;
  @ApiPropertyOptional({ type: AdminPaymentMemberDto }) member?: AdminPaymentMemberDto;
  @ApiPropertyOptional() refundReason?: string;
  @ApiPropertyOptional() receiptNumber?: string;
  @ApiPropertyOptional() discountApplied?: number;
  @ApiPropertyOptional() couponCode?: string;
}

export class AdminFinancePaymentResponseDto {
  @ApiProperty({ type: [AdminFinancePaymentDto] }) payments!: AdminFinancePaymentDto[];
  @ApiProperty() totalPayments!: number;
}

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
}

export class AdminFinanceExpenseResponseDto {
  @ApiProperty({ type: [AdminFinanceExpenseDto] }) expenses!: AdminFinanceExpenseDto[];
  @ApiProperty() totalExpenses!: number;
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
}

export class AdminFinanceSummaryResponseDto {
  @ApiProperty() totalRevenue!: number;
  @ApiProperty() monthlyRevenue!: number;
  @ApiProperty() pendingAmount!: number;
  @ApiProperty() totalPayments!: number;
  @ApiProperty() totalExpenses!: number;
  @ApiProperty() netProfit!: number;
  @ApiProperty({ type: RevenueByMethodDto }) revenueByMethod!: RevenueByMethodDto;
  @ApiProperty({ type: [MonthlyDataDto] }) monthlyData!: MonthlyDataDto[];
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

export class AdminFinancePnlRecordDto {
  @ApiProperty() branchId!: string;
  @ApiProperty() branchName!: string;
  @ApiProperty() location!: string;
  @ApiProperty() revenue!: number;
  @ApiProperty() expenses!: number;
  @ApiProperty() netProfit!: number;
  @ApiProperty() marginPct!: number;
  @ApiProperty({ enum: ['PROFITABLE', 'BREAKEVEN', 'LOSS'] }) status!: string;
  @ApiProperty() momDelta!: number;
  @ApiProperty({ type: BranchRevenueBreakdownDto }) revenueBreakdown!: BranchRevenueBreakdownDto;
  @ApiProperty({ type: BranchExpenseBreakdownDto }) expenseBreakdown!: BranchExpenseBreakdownDto;
}

class BranchPnlAggregatesDto {
  @ApiProperty() totalRevenue!: number;
  @ApiProperty() totalExpenses!: number;
  @ApiProperty() totalNetProfit!: number;
  @ApiProperty() overallMarginPct!: number;
  @ApiProperty() profitableBranches!: number;
  @ApiProperty() lossMakingBranches!: number;
}

export class AdminFinancePnlResponseDto {
  @ApiProperty({ type: [AdminFinancePnlRecordDto] }) records!: AdminFinancePnlRecordDto[];
  @ApiProperty({ type: BranchPnlAggregatesDto }) aggregates!: BranchPnlAggregatesDto;
}
