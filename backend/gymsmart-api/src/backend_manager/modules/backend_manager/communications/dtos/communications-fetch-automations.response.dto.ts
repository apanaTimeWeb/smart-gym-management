// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { CommChannel } from '@/backend_manager/modules/backend_manager/communications/communications.constants';
import { CommAutomationType } from '@/backend_manager/modules/backend_manager/communications/communications.constants';

export class CommunicationsFetchAutomationsResponseDto {
  @ApiProperty()
  channel!: CommChannel;

  @ApiProperty()
  description!: string;

  @ApiProperty({ type: Boolean })
  enabled!: boolean;

  @ApiProperty()
  id!: string;

  @ApiProperty()
  messageTemplate!: string;

  @ApiProperty()
  sendTime!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  type!: CommAutomationType;

}
