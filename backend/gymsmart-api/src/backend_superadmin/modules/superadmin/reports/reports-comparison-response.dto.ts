// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class ReportsComparisonResponseDto {
  @ApiProperty()
  periods!: Array<{ key: string; label: string }>;
  @ApiProperty()
  segments!: Array<{ key: string; label: string }>;
  @ApiProperty()
  metrics!: Array<{ name: string; current: number; previous: number; change: number }>;
  @ApiProperty()
  planComparison!: Array<{ name: string; income: number; gyms: number }>;
  @ApiProperty()
  regionComparison!: Array<{ name: string; current: number; previous: number }>;
  @ApiProperty()
  comparisonSets!: Array<{ periodKey: string; segmentKey: string; metrics: Array<{ name: string; current: number; previous: number; change: number }> }>;
}
