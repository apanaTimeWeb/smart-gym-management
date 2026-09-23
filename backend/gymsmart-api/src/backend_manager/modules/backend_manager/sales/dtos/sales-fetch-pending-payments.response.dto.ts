// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class SalesFetchPendingPaymentsResponseDto {
  @ApiProperty({ type: [Object] })
  members?: Array<{ expiryDate: string; name: string; pendingAmount: number; }>;
}
