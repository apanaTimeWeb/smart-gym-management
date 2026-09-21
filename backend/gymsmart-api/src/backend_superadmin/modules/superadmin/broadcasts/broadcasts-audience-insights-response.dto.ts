// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class BroadcastsAudienceInsightsResponseDto {
  @ApiProperty()
  segments!: Array<{ name: string; count: number; description: string }>;
  @ApiProperty()
  channels!: Array<{ name: string; sent: number; delivered: number; opened: number; clicked: number }>;
  @ApiProperty()
  templates!: string[];
}
