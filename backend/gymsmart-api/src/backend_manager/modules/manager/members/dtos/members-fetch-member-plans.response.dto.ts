// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> MembersFetchMemberPlansResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MembersFetchMemberPlansResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty({ type: Number })
  price12Month!: number;

  @ApiProperty({ type: Number })
  price1Month!: number;

  @ApiProperty({ type: Number })
  price3Month!: number;

  @ApiProperty({ type: Number })
  price6Month!: number;

}
