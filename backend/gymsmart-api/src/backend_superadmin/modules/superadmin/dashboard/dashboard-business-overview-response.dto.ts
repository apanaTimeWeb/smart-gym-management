// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class DashboardBusinessOverviewResponseDto {
  @ApiProperty()
  openingIncome!: number;
  @ApiProperty()
  newIncome!: number;
  @ApiProperty()
  growthIncome!: number;
  @ApiProperty()
  returningIncome!: number;
  @ApiProperty()
  reducedIncome!: number;
  @ApiProperty()
  lostIncome!: number;
  @ApiProperty()
  endingIncome!: number;
  @ApiProperty()
  existingIncomeRetained!: number;
  @ApiProperty()
  gymRetention!: number;
  @ApiProperty()
  revenueLostPercent!: number;
  @ApiProperty()
  customerChurn!: number;
  @ApiProperty()
  alerts!: Array<{ id: string; level: string; title: string; detail: string; count: number }>;
  @ApiProperty()
  leaderboard!: Array<{ name: string; plan: string; income: number; growth: number; health: number }>;
  @ApiProperty()
  waterfall!: Array<{ label: string; value: number }>;
}
