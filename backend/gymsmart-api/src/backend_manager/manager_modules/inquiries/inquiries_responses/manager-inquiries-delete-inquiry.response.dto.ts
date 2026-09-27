// RESPONSIBILITY: Defines the exact frontend-consumed response contract for the owning Manager feature.
// FLOW: Repository/domain projection -> canonical response DTO -> HTTP envelope.
import { ApiProperty } from '@nestjs/swagger';
export class ManagerInquiriesDeleteInquiryResponseDto { @ApiProperty() id!: string; }
export { ManagerInquiriesDeleteInquiryResponseDto as InquiriesDeleteInquiryResponseDto };
