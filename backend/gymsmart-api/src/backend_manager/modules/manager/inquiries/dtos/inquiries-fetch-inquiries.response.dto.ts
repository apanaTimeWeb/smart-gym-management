// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> InquiriesFetchInquiriesResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InquiriesFetchInquiriesResponseDto {
  @ApiProperty({ type: [Object] })
  inquiries?: Array<{ createdAt: string; email: string; followUpDate: number; interest: string; name: string; phone: string; source: string; status: string; }>;

}
