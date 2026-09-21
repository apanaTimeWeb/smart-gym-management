// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class InfrastructureApiHealthResponseDto {
  @ApiProperty()
  summary!: { requestsPerMinute: number; errorsPercent: number; p50: number; p95: number; p99: number };
  @ApiProperty()
  endpoints!: Array<{ name: string; p50: number; p95: number; p99: number; errors: number }>;
  @ApiProperty()
  incidents!: Array<{ title: string; impact: string; started: string; status: string }>;
}
