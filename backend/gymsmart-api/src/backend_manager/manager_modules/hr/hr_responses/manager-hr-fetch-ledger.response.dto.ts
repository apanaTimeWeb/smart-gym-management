// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { HrLedgerItemResponseDto } from '@/backend_manager/manager_modules/hr/hr_responses/manager-hr-ledger-item.response.dto';

export class ManagerHrFetchLedgerResponseDto {
  @ApiProperty({ type: [HrLedgerItemResponseDto] })
  ledger?: Array<HrLedgerItemResponseDto>;

}

export { ManagerHrFetchLedgerResponseDto as HrFetchLedgerResponseDto };
