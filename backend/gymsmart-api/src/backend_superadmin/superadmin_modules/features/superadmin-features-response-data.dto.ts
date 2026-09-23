// RESPONSIBILITY: Defines the aggregate response contract for the Superadmin feature-flags page.
// FLOW: Feature services -> SuperadminFeaturesResponseDataDto -> canonical API response envelope.
import { ApiProperty } from '@nestjs/swagger';
import { SuperadminFeaturesFeatureFlagDto } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-feature-flag.dto';
import { SuperadminFeaturesReleaseNoteDto } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-release-note.dto';

export class SuperadminFeaturesResponseDataDto {
  @ApiProperty({ type: [SuperadminFeaturesFeatureFlagDto] }) flags!: SuperadminFeaturesFeatureFlagDto[];
  @ApiProperty({ type: [SuperadminFeaturesReleaseNoteDto] }) notes!: SuperadminFeaturesReleaseNoteDto[];
}