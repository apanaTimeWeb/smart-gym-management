// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class InvoicesRecoveryCenterResponseDto {
  @ApiProperty()
  summary!: { failed: number; inRecovery: number; recoveredIncome: number; unrecoveredIncome: number };
  @ApiProperty()
  recovery!: Array<{ gym: string; invoice: string; amount: number; attempts: number; nextRetry: string; daysLate: number; reason: string }>;
  @ApiProperty()
  reconciliation!: Array<{ type: string; gym: string; amount: number; status: string }>;
  @ApiProperty()
  policy!: { firstRetry: string; secondRetry: string; finalRetry: string; gracePeriod: string; autoSuspend: string };
}
