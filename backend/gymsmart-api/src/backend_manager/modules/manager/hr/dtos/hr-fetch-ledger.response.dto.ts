// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> HrFetchLedgerResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class HrFetchLedgerResponseDto {
  @ApiProperty({ type: [Object] })
  ledger?: Array<{ balance: number; credit: number; date: string; debit: number; type: string; }>;

}
