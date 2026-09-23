// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class HrFetchHrSummaryResponseDto {
  @ApiProperty({ type: Number }) totalSalaryThisMonth!: number;
  @ApiProperty({ type: Number }) totalSalaryPaid!: number;
  @ApiProperty({ type: Number }) totalSalaryDue!: number;
  @ApiProperty({ type: Number }) totalAdvanceGiven!: number;
  @ApiProperty({ type: Number }) pendingPaymentsCount!: number;
  @ApiProperty({ type: Number }) totalStaff!: number;
  @ApiProperty({ type: Number }) activeStaff!: number;
  @ApiProperty({ type: Number }) totalPayrollThisMonth!: number;
  @ApiProperty({ type: Number }) paidCount!: number;
}
