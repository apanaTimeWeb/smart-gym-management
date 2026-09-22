// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> InquiriesFetchInquiryStatsResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InquiriesFetchInquiryStatsResponseDto {
  @ApiProperty({ type: Number })
  converted?: number;

  @ApiProperty({ type: Number })
  followUp?: number;

  @ApiProperty({ type: Number })
  lost?: number;

  @ApiProperty({ type: Number })
  new?: number;

  @ApiProperty({ type: Number })
  total?: number;

}
