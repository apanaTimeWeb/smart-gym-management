// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class HrFetchLedgerResponseDto {
  @ApiProperty({ type: [Object] })
  ledger?: Array<{ balance: number; credit: number; date: string; debit: number; type: string; }>;

}
