// RESPONSIBILITY: Defines nested sales response DTOs separately from endpoint envelopes to preserve AI file-size limits.
// FLOW: Sales mapper -> nested data objects -> endpoint response DTOs.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AdminSalesStatus } from '@/backend_admin/admin_modules/admin_sales/admin-sales.constants.js';

/**
 * @description Defines the OverviewDataPointDto boundary for the admin_sales backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class OverviewDataPointDto { @ApiProperty() date!: string; @ApiProperty() revenue!: number; @ApiProperty() newMembers!: number; @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' }) currency!: string; }
/**
 * @description Defines the ReferralDataPointDto boundary for the admin_sales backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class ReferralDataPointDto { @ApiProperty() source!: string; @ApiProperty() revenue!: number; @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' }) currency!: string; }
/**
 * @description Defines the MembershipReportItemDto boundary for the admin_sales backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class MembershipReportItemDto { @ApiPropertyOptional() id?: number; @ApiPropertyOptional() name?: string; @ApiPropertyOptional() totalMembers?: number; @ApiPropertyOptional() activeMembers?: number; @ApiPropertyOptional() revenue?: number; @ApiPropertyOptional() plan?: string; @ApiPropertyOptional() receivable?: number; @ApiPropertyOptional() received?: number; @ApiPropertyOptional() remaining?: number; @ApiPropertyOptional() refund?: number; @ApiPropertyOptional() referralSource?: string; @ApiPropertyOptional() couponCode?: string; @ApiPropertyOptional() renewalCount?: number; @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' }) currency!: string; }
/**
 * @description Defines the MembershipTotalsDto boundary for the admin_sales backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class MembershipTotalsDto { @ApiPropertyOptional() activeCount?: number; @ApiPropertyOptional() revenue?: number; @ApiPropertyOptional() totalReceivable?: number; @ApiPropertyOptional() totalReceived?: number; @ApiPropertyOptional() remaining?: number; @ApiPropertyOptional() refunds?: number; @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' }) currency!: string; }
/**
 * @description Defines the PendingPaymentMemberDto boundary for the admin_sales backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class PendingPaymentMemberDto { @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty() email!: string; @ApiProperty() phone!: string; @ApiProperty() gender!: string; @ApiPropertyOptional() address?: string; @ApiProperty() branch!: string; @ApiProperty() planId!: string; @ApiPropertyOptional() plan?: string; @ApiProperty() billingCycle!: string; @ApiProperty() status!: AdminSalesStatus; @ApiProperty() joinDate!: string; @ApiProperty() expiryDate!: string; @ApiProperty() paidAmount!: number; @ApiPropertyOptional() pendingAmount?: number; @ApiPropertyOptional() daysOverdue?: number; @ApiPropertyOptional() photo?: string; @ApiProperty() createdAt!: string; @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' }) currency!: string; }
/**
 * @description Defines the MemberPlanDto boundary for the admin_sales backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class MemberPlanDto { @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty() tier!: string; }
/**
 * @description Defines the MemberDto boundary for the admin_sales backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class MemberDto { @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty() email!: string; @ApiProperty() phone!: string; @ApiProperty() gender!: string; @ApiPropertyOptional() address?: string; @ApiProperty() branch!: string; @ApiProperty() planId!: string; @ApiPropertyOptional({ type: MemberPlanDto }) plan?: MemberPlanDto; @ApiProperty() billingCycle!: string; @ApiProperty() status!: AdminSalesStatus; @ApiProperty() joinDate!: string; @ApiProperty() expiryDate!: string; @ApiProperty() paidAmount!: number; @ApiProperty() pendingAmount!: number; @ApiPropertyOptional() photo?: string; @ApiProperty() createdAt!: string; @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' }) currency!: string; }
/**
 * @description Defines the StoreProductDto boundary for the admin_sales backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class StoreProductDto { @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty() category!: string; @ApiProperty() price!: number; @ApiProperty() stock!: number; @ApiPropertyOptional() description?: string; @ApiPropertyOptional() imageUrl?: string; @ApiProperty() isActive!: boolean; @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' }) currency!: string; }
/**
 * @description Defines the StoreOrderProductDto boundary for the admin_sales backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class StoreOrderProductDto { @ApiProperty() name!: string; }
/**
 * @description Defines the StoreOrderItemDto boundary for the admin_sales backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class StoreOrderItemDto { @ApiProperty() id!: string; @ApiProperty() qty!: number; @ApiProperty() price!: number; @ApiProperty({ type: StoreOrderProductDto }) product!: StoreOrderProductDto; @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' }) currency!: string; }
/**
 * @description Defines the StoreOrderDto boundary for the admin_sales backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class StoreOrderDto { @ApiProperty() id!: string; @ApiProperty() total!: number; @ApiProperty() method!: string; @ApiProperty() status!: AdminSalesStatus; @ApiPropertyOptional() notes?: string; @ApiProperty() createdAt!: string; @ApiPropertyOptional({ type: [StoreOrderItemDto] }) items?: StoreOrderItemDto[]; }
/**
 * @description Defines the StoreSummaryDto boundary for the admin_sales backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class StoreSummaryDto { @ApiProperty() totalProducts!: number; @ApiProperty() totalOrders!: number; @ApiProperty() totalRevenue!: number; @ApiProperty({ type: [StoreProductDto] }) lowStockProducts!: StoreProductDto[]; @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' }) currency!: string; }
