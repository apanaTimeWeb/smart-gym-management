// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> InquiriesFetchInquiryByIdResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InquiriesFetchInquiryByIdResponseDto {
  @ApiProperty({ type: [Object] })
  followUpLogs?: Array<{ note?: string; }>;

}
