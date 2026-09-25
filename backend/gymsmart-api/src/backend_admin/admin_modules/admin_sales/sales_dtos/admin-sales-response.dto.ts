// RESPONSIBILITY: Defines endpoint-level response envelopes for Admin sales while keeping nested DTOs in a dedicated bounded file.
// FLOW: Sales mapper -> endpoint envelope -> canonical ApiResponse<T>.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { OverviewDataPointDto, ReferralDataPointDto, MembershipReportItemDto, MembershipTotalsDto, PendingPaymentMemberDto, MemberDto, StoreOrderDto, StoreSummaryDto } from '@/backend_admin/admin_modules/admin_sales/sales_dtos/admin-sales-nested-response.dto.js';

export { OverviewDataPointDto, ReferralDataPointDto, MembershipReportItemDto, MembershipTotalsDto, PendingPaymentMemberDto, MemberDto, StoreOrderDto, StoreSummaryDto };

/**
 * @description Defines the AdminSalesOverviewResponseDto boundary for the admin_sales backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSalesOverviewResponseDto { @ApiProperty({ type: [OverviewDataPointDto] }) monthlyRevenue!: OverviewDataPointDto[]; }
/**
 * @description Defines the AdminSalesMembershipReportResponseDto boundary for the admin_sales backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSalesMembershipReportResponseDto { @ApiProperty({ type: [MembershipReportItemDto] }) report!: MembershipReportItemDto[]; @ApiProperty({ type: MembershipTotalsDto }) totals!: MembershipTotalsDto; }
/**
 * @description Defines the AdminSalesPendingPaymentsResponseDto boundary for the admin_sales backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSalesPendingPaymentsResponseDto { @ApiProperty({ type: [PendingPaymentMemberDto] }) members!: PendingPaymentMemberDto[]; @ApiProperty() total!: number; }
/**
 * @description Defines the AdminSalesAllMembershipsResponseDto boundary for the admin_sales backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSalesAllMembershipsResponseDto { @ApiProperty({ type: [MemberDto] }) members!: MemberDto[]; @ApiProperty() total!: number; }
/**
 * @description Defines the AdminSalesStoreOrdersResponseDto boundary for the admin_sales backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSalesStoreOrdersResponseDto { @ApiProperty({ type: [StoreOrderDto] }) orders!: StoreOrderDto[]; @ApiProperty() total!: number; }
/**
 * @description Defines the AdminSalesStoreSummaryResponseDto boundary for the admin_sales backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSalesStoreSummaryResponseDto { @ApiProperty({ type: StoreSummaryDto }) summary!: StoreSummaryDto; }
