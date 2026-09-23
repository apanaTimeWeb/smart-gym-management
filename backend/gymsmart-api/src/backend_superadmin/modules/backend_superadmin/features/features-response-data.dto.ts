// RESPONSIBILITY: Defines the aggregate response contract for the Superadmin feature-flags page.
// FLOW: Feature services -> FeaturesResponseDataDto -> canonical API response envelope.
import { ApiProperty } from '@nestjs/swagger';
import { FeaturesFeatureFlagDto } from '@/backend_superadmin/modules/backend_superadmin/features/features-feature-flag.dto';
import { FeaturesReleaseNoteDto } from '@/backend_superadmin/modules/backend_superadmin/features/features-release-note.dto';

export class FeaturesResponseDataDto {
  @ApiProperty({ type: [FeaturesFeatureFlagDto] }) flags!: FeaturesFeatureFlagDto[];
  @ApiProperty({ type: [FeaturesReleaseNoteDto] }) notes!: FeaturesReleaseNoteDto[];
}