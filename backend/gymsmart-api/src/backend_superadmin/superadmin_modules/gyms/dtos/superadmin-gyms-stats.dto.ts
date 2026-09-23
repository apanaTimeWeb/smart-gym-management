// RESPONSIBILITY: Documents the aggregate Gym statistics returned to the Superadmin frontend.
// FLOW: Gyms stats query -> repository aggregate -> SuperadminGymsStatsDto -> envelope.
import { ApiProperty } from '@nestjs/swagger';
export class SuperadminGymsStatsDto {
  @ApiProperty() totalActive!: number;
  @ApiProperty() totalSuspended!: number;
  @ApiProperty() mrrContribution!: number;
}