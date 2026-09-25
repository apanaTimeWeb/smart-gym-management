// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin subscriptions.
// FLOW: Repository domain â†’ Subscriptions response mapper â†’ ApiResponse<T>.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AdminSubscriptionsStatus } from '@/backend_admin/admin_modules/admin_subscriptions/admin-subscriptions.constants'
import { AdminSubscriptionsTier } from '@/backend_admin/admin_modules/admin_subscriptions/admin-subscriptions.constants'

/**
 * @description Defines the AdminCurrentSubscriptionDto boundary for the admin_subscriptions backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCurrentSubscriptionDto {
  @ApiProperty() planId!: string;
  @ApiProperty() planName!: string;
  @ApiProperty({ enum: ['starter', 'growth', 'pro', 'enterprise'] }) tier!: AdminSubscriptionsTier;
  @ApiProperty() monthlyPrice!: number;
  @ApiProperty() annualPrice!: number;
  @ApiProperty({ example: 'INR' }) currency!: string;
  @ApiProperty({ enum: ['monthly', 'annual'] }) billingCycle!: string;
  @ApiProperty({ enum: ['active', 'cancelled', 'past_due'] }) status!: AdminSubscriptionsStatus;
  @ApiProperty() currentPeriodStart!: string;
  @ApiProperty() currentPeriodEnd!: string;
  @ApiProperty() nextBillingDate!: string;
  @ApiProperty() autoRenew!: boolean;
  @ApiProperty() gymCount!: number;
  @ApiProperty() memberLimit!: number;
  @ApiProperty() staffLimit!: number;
  @ApiProperty() storageGb!: number;
}

/**
 * @description Defines the AdminSaaSPlanDto boundary for the admin_subscriptions backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSaaSPlanDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ enum: ['starter', 'growth', 'pro', 'enterprise'] }) tier!: AdminSubscriptionsTier;
  @ApiProperty() monthlyPrice!: number;
  @ApiProperty() annualPrice!: number;
  @ApiProperty({ example: 'INR' }) currency!: string;
  @ApiProperty() gymLimit!: number;
  @ApiProperty() memberLimit!: number;
  @ApiProperty() staffLimit!: number;
  @ApiProperty() storageGb!: number;
  @ApiProperty({ type: [String] }) features!: string[];
  @ApiProperty() isPopular!: boolean;
  @ApiProperty() isCurrent!: boolean;
}

/**
 * @description Defines the AdminInvoiceDto boundary for the admin_subscriptions backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminInvoiceDto {
  @ApiProperty() id!: string;
  @ApiProperty() invoiceNo!: string;
  @ApiProperty() date!: string;
  @ApiProperty() dueDate!: string;
  @ApiProperty() amount!: number;
  @ApiProperty({ example: 'INR' }) currency!: string;
  @ApiProperty({ enum: ['paid', 'pending', 'failed', 'refunded'] }) status!: AdminSubscriptionsStatus;
  @ApiProperty() planName!: string;
  @ApiProperty({ enum: ['monthly', 'annual'] }) billingCycle!: string;
  @ApiProperty() pdfUrl!: string;
  @ApiPropertyOptional() taxAmount?: number;
  @ApiPropertyOptional() gstNumber?: string;
}

/**
 * @description Defines the AdminPaymentMethodDto boundary for the admin_subscriptions backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPaymentMethodDto {
  @ApiProperty() id!: string;
  @ApiProperty({ enum: ['card', 'upi', 'netbanking'] }) type!: string;
  @ApiPropertyOptional() last4?: string;
  @ApiPropertyOptional() brand?: string;
  @ApiPropertyOptional() upiId?: string;
  @ApiPropertyOptional() bankName?: string;
  @ApiPropertyOptional() expiryMonth?: number;
  @ApiPropertyOptional() expiryYear?: number;
  @ApiProperty() isDefault!: boolean;
}

/**
 * @description Defines the AdminSubscriptionKPIDataDto boundary for the admin_subscriptions backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSubscriptionKPIDataDto {
  @ApiProperty() currentPlan!: string;
  @ApiProperty() monthlySpend!: number;
  @ApiProperty({ example: 'INR' }) currency!: string;
  @ApiProperty() totalInvoices!: number;
  @ApiProperty() nextBillingAmount!: number;
  @ApiProperty() daysUntilRenewal!: number;
  @ApiProperty() savedWithAnnual!: number;
}
