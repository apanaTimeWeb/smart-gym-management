// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class MessagingTemplateInsightsResponseDto {
  @ApiProperty()
  templates!: Array<{ name: string; channel: string; uses: number; status: string }>;
  @ApiProperty()
  campaigns!: Array<{ name: string; sent: number; delivered: number; opened: number; responded: number }>;
  @ApiProperty()
  channels!: string[];
}
