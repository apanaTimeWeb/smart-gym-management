// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class InvoicesRecoveryCenterResponseDto {
  @ApiProperty({ example: 'INR' })
  currency!: string;

  @ApiProperty()
  summary!: { failed: number; inRecovery: number; recoveredIncome: number; unrecoveredIncome: number; currency: string };
  @ApiProperty()
  recovery!: Array<{ gym: string; invoice: string; amount: number; currency: string; attempts: number; nextRetry: string; daysLate: number; reason: string }>;
  @ApiProperty()
  reconciliation!: Array<{ type: string; gym: string; amount: number; currency: string; status: string }>;
  @ApiProperty()
  policy!: { firstRetry: string; secondRetry: string; finalRetry: string; gracePeriod: string; autoSuspend: string };
}