// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class PlansFetchMembershipOverviewResponseDto {
  @ApiProperty({ type: Number })
  activeCount!: number;

  @ApiProperty({ type: Number })
  revenue!: number;

}
