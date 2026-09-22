// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> InquiriesDeleteInquiryResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InquiriesDeleteInquiryResponseDto {
  @ApiProperty({ type: [Object] })
  followUpLogs?: Array<{ note: string; }>;

}
