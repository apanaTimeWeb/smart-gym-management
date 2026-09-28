// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class ManagerCommunicationsFetchSegmentRecipientsResponseDto {
  @ApiProperty()
  email!: string;

  @ApiProperty()
  expiryDate!: string;

  @ApiProperty()
  memberId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty({ type: Number })
  pendingAmount!: number;

  @ApiProperty()
  phone!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty({ example: 'INR' }) currency!: string;
}

export { ManagerCommunicationsFetchSegmentRecipientsResponseDto as CommunicationsFetchSegmentRecipientsResponseDto };
