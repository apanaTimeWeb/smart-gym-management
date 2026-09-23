// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class SalesFetchAllMembershipsResponseDto {
  @ApiProperty({ type: [Object] })
  members?: Array<{ name: string; pendingAmount: number; phone: string; plan: string; status: string; }>;
}
