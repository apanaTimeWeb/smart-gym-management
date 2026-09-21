// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin subscriptions.
import { ApiProperty } from '@nestjs/swagger';

// FLOW: Repository domain → Subscriptions response mapper → ApiResponse<T>.

export class AdminSubscriptionsResponseDto {
  id!: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: createdAt' })
  createdAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: updatedAt' })
  updatedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: planId' })
  planId?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: planName' })
  planName?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: tier' })
  tier?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: monthlyPrice' })
  monthlyPrice?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: annualPrice' })
  annualPrice?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: billingCycle' })
  billingCycle?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: status' })
  status?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: currentPeriodStart' })
  currentPeriodStart?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: currentPeriodEnd' })
  currentPeriodEnd?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: nextBillingDate' })
  nextBillingDate?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: autoRenew' })
  autoRenew?: boolean;
  @ApiProperty({ required: false, description: 'Frontend contract field: gymCount' })
  gymCount?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: memberLimit' })
  memberLimit?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: staffLimit' })
  staffLimit?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: storageGb' })
  storageGb?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: plans' })
  plans?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: invoices' })
  invoices?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: paymentMethods' })
  paymentMethods?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: kpi' })
  kpi?: Record<string, unknown>;
}
