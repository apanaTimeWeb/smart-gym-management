// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class ExpensesFetchExpensesResponseDto {
  @ApiProperty({ type: [Object] })
  expenses?: Array<{ amount: number; category: string; date: string; id: string; paymentMode: string; status: string; title: string; vendorName: string; }>;
}
