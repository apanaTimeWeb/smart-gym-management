// RESPONSIBILITY: Defines the exact frontend-consumed response contract for the owning Manager feature.
// FLOW: Repository/domain projection -> canonical response DTO -> HTTP envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ManagerInquiriesFollowUpLogResponseDto } from '@/backend_manager/manager_modules/inquiries/inquiries_responses/manager-inquiries-follow-up-log.response.dto';
export class ManagerInquiriesCreateInquiryResponseDto {
 @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty() phone!: string; @ApiPropertyOptional() email?: string; @ApiProperty() interest!: string;
 @ApiProperty() status!: string; @ApiPropertyOptional() source?: string; @ApiPropertyOptional() notes?: string; @ApiPropertyOptional() followUpDate?: string; @ApiProperty() createdAt!: string;
 @ApiPropertyOptional({type:[ManagerInquiriesFollowUpLogResponseDto]}) followUpLogs?: ManagerInquiriesFollowUpLogResponseDto[];
}
export { ManagerInquiriesCreateInquiryResponseDto as InquiriesCreateInquiryResponseDto };
