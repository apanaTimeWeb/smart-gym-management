// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class FinanceFetchPaymentsResponseDto {
  @ApiProperty({ type: [Object] })
  payments?: Array<{ amount: number; invoiceNumber: string; member?: { email: string; name: string; plan?: { name: string; }; }; method: string; paidAt: string; status: string; }>;
}
