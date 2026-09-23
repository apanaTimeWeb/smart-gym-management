// RESPONSIBILITY: Defines the frozen response returned after a WhatsApp campaign is queued.
// FLOW: Messaging campaign service -> response DTO -> canonical ApiResponse envelope.
import { ApiProperty } from '@nestjs/swagger';

export class MessagingWhatsappCampaignResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() audienceLabel!: string;
  @ApiProperty() templateName!: string;
  @ApiProperty() totalRecipients!: number;
  @ApiProperty() sentCount!: number;
  @ApiProperty() skippedCount!: number;
  @ApiProperty({ enum: ['READY', 'RUNNING', 'COMPLETED', 'PAUSED'] }) status!: 'READY' | 'RUNNING' | 'COMPLETED' | 'PAUSED';
  @ApiProperty() createdAt!: string;
}