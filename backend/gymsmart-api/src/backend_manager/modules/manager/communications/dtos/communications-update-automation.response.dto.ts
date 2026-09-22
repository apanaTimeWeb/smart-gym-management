import { CommChannel } from '@/backend_manager/modules/manager/communications/communications.constants';
import { CommAutomationType } from '@/backend_manager/modules/manager/communications/communications.constants';
// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> CommunicationsUpdateAutomationResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CommunicationsUpdateAutomationResponseDto {
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
