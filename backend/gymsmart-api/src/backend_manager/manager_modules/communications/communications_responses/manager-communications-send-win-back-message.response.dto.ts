// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { CommChannel } from '@/backend_manager/manager_modules/communications/manager-communications.constants';
import { CommStatus } from '@/backend_manager/manager_modules/communications/manager-communications.constants';

export class ManagerCommunicationsSendWinBackMessageResponseDto {
  @ApiProperty()
  channel!: CommChannel;

  @ApiProperty({ type: Number })
  deliveredCount!: number;

  @ApiProperty({ type: Number })
  failedCount!: number;

  @ApiProperty()
  id!: string;

  @ApiProperty()
  message!: string;

  @ApiProperty({ type: Number })
  recipientCount!: number;

  @ApiProperty()
  segmentLabel!: string;

  @ApiProperty()
  sentAt!: string;

  @ApiProperty()
  sentBy!: string;

  @ApiProperty({ type: Number })
  sentCount!: number;

  @ApiProperty()
  status!: CommStatus;

  @ApiProperty()
  title!: string;

}

export { ManagerCommunicationsSendWinBackMessageResponseDto as CommunicationsSendWinBackMessageResponseDto };
