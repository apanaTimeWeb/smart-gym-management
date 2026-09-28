// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { CommChannel } from '@/backend_manager/manager_modules/communications/manager-communications.constants';
import { CommAutomationType } from '@/backend_manager/manager_modules/communications/manager-communications.constants';

export class ManagerCommunicationsFetchAutomationsResponseDto {
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

export { ManagerCommunicationsFetchAutomationsResponseDto as CommunicationsFetchAutomationsResponseDto };
