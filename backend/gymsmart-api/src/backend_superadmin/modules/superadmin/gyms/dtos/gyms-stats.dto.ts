// RESPONSIBILITY: Documents the aggregate Gym statistics returned to the Superadmin frontend.
// FLOW: Gyms stats query -> repository aggregate -> GymsStatsResponseDto -> envelope.
import { ApiProperty } from '@nestjs/swagger';
export class GymsStatsResponseDto {
  @ApiProperty() totalActive!: number;
  @ApiProperty() totalSuspended!: number;
  @ApiProperty() mrrContribution!: number;
}
