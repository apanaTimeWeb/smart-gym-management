// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class MembersDeleteMemberResponseDto {
  @ApiProperty({ type: Object })
  dietPlan?: { name: string; };

  @ApiProperty({ type: [Object] })
  recentPayments?: Array<{ amount: number; }>;

  @ApiProperty({ type: Object })
  workoutPlan?: { name: string; };

}
