// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class JobsQueueHealthResponseDto {
  @ApiProperty()
  summary!: { waiting: number; running: number; failed24h: number; deadLetter: number; oldestWaitingMinutes: number };
  @ApiProperty()
  queues!: Array<{ name: string; waiting: number; running: number; failed24h: number; deadLetter: number }>;
  @ApiProperty()
  recentFailures!: Array<{ job: string; tenant: string; time: string; reason: string }>;
}
