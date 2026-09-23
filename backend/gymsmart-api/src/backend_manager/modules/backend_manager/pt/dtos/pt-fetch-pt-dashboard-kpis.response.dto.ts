// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class PtFetchPtDashboardKpisResponseDto {
  @ApiProperty({ type: Number })
  monthlyPtRevenue!: number;

  @ApiProperty({ type: Number })
  packagesExpiringSoon!: number;

  @ApiProperty({ type: Number })
  sessionsScheduledToday!: number;

  @ApiProperty({ type: Number })
  totalActiveAssignments!: number;

}
