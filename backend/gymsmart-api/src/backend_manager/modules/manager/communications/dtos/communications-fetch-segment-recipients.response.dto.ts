// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> CommunicationsFetchSegmentRecipientsResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CommunicationsFetchSegmentRecipientsResponseDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  expiryDate: string;

  @ApiProperty()
  memberId: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: Number })
  pendingAmount: number;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  status: string;

}
