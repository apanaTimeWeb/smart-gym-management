// RESPONSIBILITY: Defines the feature-flag row returned to the Superadmin frontend.
// FLOW: Feature repository -> mapper -> SuperadminFeaturesFeatureFlagDto -> response envelope.
import { ApiProperty } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminFeaturesFeatureFlagDto as the class-level contract for superadmin-features-feature-flag.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminFeaturesFeatureFlagDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() description!: string;
  @ApiProperty() isGlobalEnabled!: boolean;
  @ApiProperty({ type: [String] }) enabledTenantIds!: string[];
}
