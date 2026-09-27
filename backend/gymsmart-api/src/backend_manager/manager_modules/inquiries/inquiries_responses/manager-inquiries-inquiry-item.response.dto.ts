// RESPONSIBILITY: Defines the complete inquiry response item used by Manager inquiry APIs.
// FLOW: Inquiry domain projection -> explicit response fields -> collection/detail DTO.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ManagerInquiriesFollowUpLogResponseDto } from '@/backend_manager/manager_modules/inquiries/inquiries_responses/manager-inquiries-follow-up-log.response.dto';

export class ManagerInquiriesInquiryItemResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() email!: string;
  @ApiProperty() followUpDate!: string;
  @ApiProperty() interest!: string;
  @ApiProperty() name!: string;
  @ApiProperty() phone!: string;
  @ApiProperty() source!: string;
  @ApiProperty() status!: string;
  @ApiPropertyOptional({ type: [ManagerInquiriesFollowUpLogResponseDto] }) followUpLogs?: ManagerInquiriesFollowUpLogResponseDto[];
  @ApiProperty({ example: 'INR' }) currency!: string;
}

export { ManagerInquiriesInquiryItemResponseDto as InquiriesInquiryItemResponseDto };
