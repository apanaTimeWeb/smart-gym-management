// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class InquiriesFetchInquiriesResponseDto {
  @ApiProperty({ type: [Object] })
  inquiries?: Array<{ createdAt: string; email: string; followUpDate: number; interest: string; name: string; phone: string; source: string; status: string; }>;

}
