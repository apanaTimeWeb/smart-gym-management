// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class AnalyticsRetentionInsightsResponseDto {
  @ApiProperty({ example: 'INR' })
  currency!: string;

  @ApiProperty()
  metrics!: { existingIncomeRetained: number; grossIncomeRetained: number; gymRetention: number; revenueLost: number; customerChurn: number };
  @ApiProperty()
  cohort!: Array<{ month: string; m1: number; m2: number; m3: number; m6: number; m12: number }>;
  @ApiProperty()
  movement!: Array<{ label: string; value: number }>;
  @ApiProperty()
  adoption!: Array<{ feature: string; available: number; active: number; used: number }>;
  @ApiProperty()
  sources!: Array<{ source: string; gyms: number; monthlyIncome: number; churn: number }>;
  @ApiProperty()
  concentration!: Array<{ group: string; share: number }>;
}