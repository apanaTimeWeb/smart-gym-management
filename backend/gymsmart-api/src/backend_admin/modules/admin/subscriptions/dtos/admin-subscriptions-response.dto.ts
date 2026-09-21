// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin subscriptions.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// FLOW: Repository domain → Subscriptions response mapper → ApiResponse<T>.

export class AdminCurrentSubscriptionDto {
  @ApiProperty() planId!: string;
  @ApiProperty() planName!: string;
  @ApiProperty({ enum: ['starter', 'growth', 'pro', 'enterprise'] }) tier!: string;
  @ApiProperty() monthlyPrice!: number;
  @ApiProperty() annualPrice!: number;
  @ApiProperty({ enum: ['monthly', 'annual'] }) billingCycle!: string;
  @ApiProperty({ enum: ['active', 'cancelled', 'past_due'] }) status!: string;
  @ApiProperty() currentPeriodStart!: string;
  @ApiProperty() currentPeriodEnd!: string;
  @ApiProperty() nextBillingDate!: string;
  @ApiProperty() autoRenew!: boolean;
  @ApiProperty() gymCount!: number;
  @ApiProperty() memberLimit!: number;
  @ApiProperty() staffLimit!: number;
  @ApiProperty() storageGb!: number;
}

export class AdminSaaSPlanDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ enum: ['starter', 'growth', 'pro', 'enterprise'] }) tier!: string;
  @ApiProperty() monthlyPrice!: number;
  @ApiProperty() annualPrice!: number;
  @ApiProperty() gymLimit!: number;
  @ApiProperty() memberLimit!: number;
  @ApiProperty() staffLimit!: number;
  @ApiProperty() storageGb!: number;
  @ApiProperty({ type: [String] }) features!: string[];
  @ApiProperty() isPopular!: boolean;
  @ApiProperty() isCurrent!: boolean;
}

export class AdminInvoiceDto {
  @ApiProperty() id!: string;
  @ApiProperty() invoiceNo!: string;
  @ApiProperty() date!: string;
  @ApiProperty() dueDate!: string;
  @ApiProperty() amount!: number;
  @ApiProperty({ enum: ['paid', 'pending', 'failed', 'refunded'] }) status!: string;
  @ApiProperty() planName!: string;
  @ApiProperty({ enum: ['monthly', 'annual'] }) billingCycle!: string;
  @ApiProperty() pdfUrl!: string;
  @ApiPropertyOptional() taxAmount?: number;
  @ApiPropertyOptional() gstNumber?: string;
}

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

export class AdminSubscriptionKPIDataDto {
  @ApiProperty() currentPlan!: string;
  @ApiProperty() monthlySpend!: number;
  @ApiProperty() totalInvoices!: number;
  @ApiProperty() nextBillingAmount!: number;
  @ApiProperty() daysUntilRenewal!: number;
  @ApiProperty() savedWithAnnual!: number;
}
