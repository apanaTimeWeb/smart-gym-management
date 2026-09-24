// RESPONSIBILITY: Defines one feature-flag history entry returned to the Superadmin frontend.
// FLOW: Feature history query -> SuperadminFeaturesHistoryEntryDto -> response envelope.
import { ApiProperty } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminFeaturesHistoryEntryDto as the class-level contract for superadmin-features-history-entry.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminFeaturesHistoryEntryDto {
  @ApiProperty() id!: string;
  @ApiProperty() action!: string;
  @ApiProperty() user!: string;
  @ApiProperty() timestamp!: string;
}
