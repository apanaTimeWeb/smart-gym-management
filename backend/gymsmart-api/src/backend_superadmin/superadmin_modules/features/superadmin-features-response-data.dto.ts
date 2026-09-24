// RESPONSIBILITY: Defines the aggregate response contract for the Superadmin feature-flags page.
// FLOW: Feature services -> SuperadminFeaturesResponseDataDto -> canonical API response envelope.
import { ApiProperty } from '@nestjs/swagger';
import { SuperadminFeaturesFeatureFlagDto } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-feature-flag.dto';
import { SuperadminFeaturesReleaseNoteDto } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-release-note.dto';

/**
 * Primary Intent: Defines SuperadminFeaturesResponseDataDto as the class-level contract for superadmin-features-response-data.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminFeaturesResponseDataDto {
  @ApiProperty({ type: [SuperadminFeaturesFeatureFlagDto] }) flags!: SuperadminFeaturesFeatureFlagDto[];
  @ApiProperty({ type: [SuperadminFeaturesReleaseNoteDto] }) notes!: SuperadminFeaturesReleaseNoteDto[];
}
