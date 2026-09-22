// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> InquiriesUpdateInquiryResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InquiriesUpdateInquiryResponseDto {
  @ApiProperty({ type: [Object] })
  followUpLogs?: Array<{ note: string; }>;

}
