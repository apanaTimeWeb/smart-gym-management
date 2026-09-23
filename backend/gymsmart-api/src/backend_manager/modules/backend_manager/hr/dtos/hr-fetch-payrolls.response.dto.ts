// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class HrFetchPayrollsResponseDto {
  @ApiProperty({ type: [Object] })
  payrolls?: Array<{ month: string; netPayable: string; paidAmount: number; pendingAmount: number; staff?: { name: string; }; status: string; }>;
}
