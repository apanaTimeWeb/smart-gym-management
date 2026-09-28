// RESPONSIBILITY: Defines the exact frontend-consumed response contract for the owning Manager feature.
// FLOW: Repository/domain projection -> canonical response DTO -> HTTP envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class ManagerInquiriesUpdateInquiryResponseDto {
 @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty() phone!: string; @ApiPropertyOptional() email?: string; @ApiProperty() interest!: string; @ApiProperty() status!: string; @ApiPropertyOptional() source?: string; @ApiPropertyOptional() notes?: string; @ApiPropertyOptional() followUpDate?: string; @ApiProperty() createdAt!: string; @ApiPropertyOptional({type:[Object]}) followUpLogs?: Array<{date:string;note:string}>;
}
export { ManagerInquiriesUpdateInquiryResponseDto as InquiriesUpdateInquiryResponseDto };
