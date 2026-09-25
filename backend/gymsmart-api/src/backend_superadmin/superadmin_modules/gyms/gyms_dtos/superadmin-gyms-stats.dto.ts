// RESPONSIBILITY: Documents the aggregate Gym statistics returned to the Superadmin frontend.
// FLOW: Gyms stats query -> repository aggregate -> SuperadminGymsStatsDto -> envelope.
import { ApiProperty } from '@nestjs/swagger';
/**
 * Primary Intent: Defines SuperadminGymsStatsDto as the class-level contract for superadmin-gyms-stats.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminGymsStatsDto {
  @ApiProperty() totalActive!: number;
  @ApiProperty() totalSuspended!: number;
  @ApiProperty() mrrContribution!: number;
}
