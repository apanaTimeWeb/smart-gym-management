// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin sales.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// FLOW: Repository domain → Sales response mapper → ApiResponse<T>.

export class OverviewDataPointDto {
  @ApiProperty() date!: string;
  @ApiProperty() revenue!: number;
  @ApiProperty() newMembers!: number;
}

export class AdminSalesOverviewResponseDto {
  @ApiProperty({ type: [OverviewDataPointDto] }) monthlyRevenue!: OverviewDataPointDto[];
}

export class ReferralDataPointDto {
  @ApiProperty() source!: string;
  @ApiProperty() revenue!: number;
}

export class MembershipReportItemDto {
  @ApiPropertyOptional() id?: number;
  @ApiPropertyOptional() name?: string;
  @ApiPropertyOptional() totalMembers?: number;
  @ApiPropertyOptional() activeMembers?: number;
  @ApiPropertyOptional() revenue?: number;
  @ApiPropertyOptional() plan?: string;
  @ApiPropertyOptional() receivable?: number;
  @ApiPropertyOptional() received?: number;
  @ApiPropertyOptional() remaining?: number;
  @ApiPropertyOptional() refund?: number;
  @ApiPropertyOptional() referralSource?: string;
  @ApiPropertyOptional() couponCode?: string;
  @ApiPropertyOptional() renewalCount?: number;
}

export class MembershipTotalsDto {
  @ApiPropertyOptional() activeCount?: number;
  @ApiPropertyOptional() revenue?: number;
  @ApiPropertyOptional() totalReceivable?: number;
  @ApiPropertyOptional() totalReceived?: number;
  @ApiPropertyOptional() remaining?: number;
  @ApiPropertyOptional() refunds?: number;
}

export class AdminSalesMembershipReportResponseDto {
  @ApiProperty({ type: [MembershipReportItemDto] }) report!: MembershipReportItemDto[];
  @ApiProperty({ type: MembershipTotalsDto }) totals!: MembershipTotalsDto;
}

export class PendingPaymentMemberDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() email!: string;
  @ApiProperty() phone!: string;
  @ApiProperty() gender!: string;
  @ApiPropertyOptional() address?: string;
  @ApiProperty() branch!: string;
  @ApiProperty() planId!: string;
  @ApiPropertyOptional() plan?: string;
  @ApiProperty() billingCycle!: string;
  @ApiProperty() status!: string;
  @ApiProperty() joinDate!: string;
  @ApiProperty() expiryDate!: string;
  @ApiProperty() paidAmount!: number;
  @ApiPropertyOptional() pendingAmount?: number;
  @ApiPropertyOptional() daysOverdue?: number;
  @ApiPropertyOptional() photo?: string;
  @ApiProperty() createdAt!: string;
}

export class AdminSalesPendingPaymentsResponseDto {
  @ApiProperty({ type: [PendingPaymentMemberDto] }) members!: PendingPaymentMemberDto[];
  @ApiProperty() total!: number;
}

class MemberPlanDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() tier!: string;
}

export class MemberDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() email!: string;
  @ApiProperty() phone!: string;
  @ApiProperty() gender!: string;
  @ApiPropertyOptional() address?: string;
  @ApiProperty() branch!: string;
  @ApiProperty() planId!: string;
  @ApiPropertyOptional({ type: MemberPlanDto }) plan?: MemberPlanDto;
  @ApiProperty() billingCycle!: string;
  @ApiProperty() status!: string;
  @ApiProperty() joinDate!: string;
  @ApiProperty() expiryDate!: string;
  @ApiProperty() paidAmount!: number;
  @ApiProperty() pendingAmount!: number;
  @ApiPropertyOptional() photo?: string;
  @ApiProperty() createdAt!: string;
}

export class AdminSalesAllMembershipsResponseDto {
  @ApiProperty({ type: [MemberDto] }) members!: MemberDto[];
  @ApiProperty() total!: number;
}

class StoreProductDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() category!: string;
  @ApiProperty() price!: number;
  @ApiProperty() stock!: number;
  @ApiPropertyOptional() description?: string;
  @ApiPropertyOptional() imageUrl?: string;
  @ApiProperty() isActive!: boolean;
}

class StoreOrderProductDto {
  @ApiProperty() name!: string;
}

class StoreOrderItemDto {
  @ApiProperty() id!: string;
  @ApiProperty() qty!: number;
  @ApiProperty() price!: number;
  @ApiProperty({ type: StoreOrderProductDto }) product!: StoreOrderProductDto;
}

export class StoreOrderDto {
  @ApiProperty() id!: string;
  @ApiProperty() total!: number;
  @ApiProperty() method!: string;
  @ApiProperty() status!: string;
  @ApiPropertyOptional() notes?: string;
  @ApiProperty() createdAt!: string;
  @ApiPropertyOptional({ type: [StoreOrderItemDto] }) items?: StoreOrderItemDto[];
}

export class AdminSalesStoreOrdersResponseDto {
  @ApiProperty({ type: [StoreOrderDto] }) orders!: StoreOrderDto[];
  @ApiProperty() total!: number;
}

export class StoreSummaryDto {
  @ApiProperty() totalProducts!: number;
  @ApiProperty() totalOrders!: number;
  @ApiProperty() totalRevenue!: number;
  @ApiProperty({ type: [StoreProductDto] }) lowStockProducts!: StoreProductDto[];
}

export class AdminSalesStoreSummaryResponseDto {
  @ApiProperty({ type: StoreSummaryDto }) summary!: StoreSummaryDto;
}
