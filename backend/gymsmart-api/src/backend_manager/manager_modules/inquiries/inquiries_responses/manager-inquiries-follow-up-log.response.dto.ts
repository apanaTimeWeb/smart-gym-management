// RESPONSIBILITY: Defines one inquiry follow-up log response item.
// FLOW: Inquiry payload -> follow-up log projection -> typed response item.
import { ApiProperty } from '@nestjs/swagger';

export class ManagerInquiriesFollowUpLogResponseDto {
  @ApiProperty() date!: string;
  @ApiProperty() note!: string;
}

export { ManagerInquiriesFollowUpLogResponseDto as InquiriesFollowUpLogResponseDto };
