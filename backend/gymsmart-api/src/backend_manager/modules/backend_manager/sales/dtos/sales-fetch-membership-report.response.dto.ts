// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class SalesFetchMembershipReportResponseDto {
  @ApiProperty({ type: [Object] })
  report?: Array<{ plan: string; refund: string; remaining: string; revenue: number; }>;
}
