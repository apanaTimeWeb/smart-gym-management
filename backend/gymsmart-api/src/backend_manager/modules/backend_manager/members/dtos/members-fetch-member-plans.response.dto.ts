// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

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
