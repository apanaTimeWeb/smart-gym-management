// @ts-nocheck
// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> CommunicationsFetchChurnedMembersResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CommunicationsFetchChurnedMembersResponseDto {
  @ApiProperty({ type: [Object] })
  data: Array<{exitDate?: string; name: string; plan: string; recovered: boolean;}>;

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
