// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class FeaturesRolloutInsightsResponseDto {
  @ApiProperty()
  rollouts!: Array<{ feature: string; rollout: number; target: string; status: string; health: number }>;
  @ApiProperty()
  releases!: Array<{ version: string; date: string; summary: string; impact: string }>;
  @ApiProperty()
  rollback!: Array<{ feature: string; lastRollback: string; lastHealthy: string }>;
}
