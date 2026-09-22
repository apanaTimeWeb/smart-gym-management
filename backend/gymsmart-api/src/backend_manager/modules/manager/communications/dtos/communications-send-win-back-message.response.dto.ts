import { CommChannel } from '@/modules/manager/communications/communications.constants';
import { CommStatus } from '@/modules/manager/communications/communications.constants';
// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> CommunicationsSendWinBackMessageResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CommunicationsSendWinBackMessageResponseDto {
  @ApiProperty()
  channel: CommChannel;

  @ApiProperty({ type: Number })
  deliveredCount: number;

  @ApiProperty({ type: Number })
  failedCount: number;

  @ApiProperty()
  id: string;

  @ApiProperty()
  message: string;

  @ApiProperty({ type: Number })
  recipientCount: number;

  @ApiProperty()
  segmentLabel: string;

  @ApiProperty()
  sentAt: string;

  @ApiProperty()
  sentBy: string;

  @ApiProperty({ type: Number })
  sentCount: number;

  @ApiProperty()
  status: CommStatus;

  @ApiProperty()
  title: string;

}
