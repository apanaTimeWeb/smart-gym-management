// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class MembersFetchMemberStatsResponseDto {
  @ApiProperty({ type: Number })
  active!: number;

  @ApiProperty({ type: Number })
  expired!: number;

  @ApiProperty({ type: Number })
  total!: number;

}
