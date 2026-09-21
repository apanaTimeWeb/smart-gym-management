// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class TicketsServiceInsightsResponseDto {
  @ApiProperty()
  summary!: { open: number; urgent: number; nearTarget: number; overTarget: number; averageFirstResponseMinutes: number; averageResolutionHours: number; satisfaction: number };
  @ApiProperty()
  agents!: Array<{ name: string; open: number; urgent: number; overTarget: number; averageHours: number }>;
  @ApiProperty()
  aging!: Array<{ bucket: string; count: number }>;
  @ApiProperty()
  categories!: Array<{ name: string; count: number }>;
}
