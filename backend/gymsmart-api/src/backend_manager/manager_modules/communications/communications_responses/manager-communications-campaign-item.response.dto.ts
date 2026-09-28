// RESPONSIBILITY: Defines the complete Manager campaign response contract used by history and send operations.
// FLOW: Persisted campaign projection -> typed response DTO -> canonical ApiResponse envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CommChannel, CommSegment, CommStatus } from '@/backend_manager/manager_modules/communications/manager-communications.constants';

export class ManagerCommunicationsCampaignItemResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() title!: string;
  @ApiProperty() channel!: CommChannel;
  @ApiProperty() segment!: CommSegment;
  @ApiProperty() segmentLabel!: string;
  @ApiProperty() message!: string;
  @ApiPropertyOptional() subject?: string;
  @ApiProperty({ type: Number }) recipientCount!: number;
  @ApiProperty({ type: Number }) sentCount!: number;
  @ApiProperty({ enum: CommStatus }) status!: CommStatus;
  @ApiProperty() sentAt!: string;
  @ApiProperty() sentBy!: string;
  @ApiProperty({ type: Number }) failedCount!: number;
  @ApiProperty({ type: Number }) deliveredCount!: number;
  @ApiPropertyOptional({ type: Number }) openRate?: number;
  @ApiPropertyOptional() scheduledAt?: string;
  @ApiPropertyOptional() deliveryMedium?: string;
  @ApiPropertyOptional() deliveryJobId?: string;
}

export { ManagerCommunicationsCampaignItemResponseDto as CommunicationsCampaignItemResponseDto };
