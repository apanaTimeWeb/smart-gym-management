// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { ManagerInquiriesInquiryItemResponseDto } from '@/backend_manager/manager_modules/inquiries/inquiries_responses/manager-inquiries-inquiry-item.response.dto';

export class ManagerInquiriesFetchInquiryByIdResponseDto {
  @ApiProperty({ type: [Object] })
  followUpLogs?: Array<{ note: string; }>;

}

export { ManagerInquiriesFetchInquiryByIdResponseDto as InquiriesFetchInquiryByIdResponseDto };
