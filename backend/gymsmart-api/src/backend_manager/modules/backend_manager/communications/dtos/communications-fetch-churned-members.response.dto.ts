// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CommunicationsFetchChurnedMembersResponseDto {
  @ApiProperty({ type: [Object] })
  data!: Array<{exitDate?: string; name: string; plan: string; recovered: boolean;}>;

  @ApiProperty({ type: Number })
  daysSinceExit!: number;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  exitDate!: string;

  @ApiPropertyOptional()
  lastContactedAt!: string | null;

  @ApiProperty({ type: Number })
  lifetimeValue!: number;

  @ApiProperty()
  memberId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  phone!: string;

  @ApiProperty()
  plan!: string;

  @ApiProperty({ type: Boolean })
  recovered!: boolean;

}
