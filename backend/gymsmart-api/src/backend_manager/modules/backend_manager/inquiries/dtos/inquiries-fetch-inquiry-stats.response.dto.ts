// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class InquiriesFetchInquiryStatsResponseDto {
  @ApiProperty({ type: Number })
  converted!: number;

  @ApiProperty({ type: Number })
  followUp!: number;

  @ApiProperty({ type: Number })
  lost!: number;

  @ApiProperty({ type: Number })
  new!: number;

  @ApiProperty({ type: Number })
  total!: number;

}
