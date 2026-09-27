// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class ManagerMembersFetchMemberPlansResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  tier!: string;

  @ApiProperty({ type: Number })
  price12Month!: number;

  @ApiProperty({ type: Number })
  price1Month!: number;

  @ApiProperty({ type: Number })
  price3Month!: number;

  @ApiProperty({ type: Number })
  price6Month!: number;

  @ApiProperty({ required: false })
  priceCustom?: number;

  @ApiProperty({ example: 'INR' })
  currency!: string;

}

export { ManagerMembersFetchMemberPlansResponseDto as MembersFetchMemberPlansResponseDto };
