// RESPONSIBILITY: Defines the feature-flag row returned to the Superadmin frontend.
// FLOW: Feature repository -> mapper -> SuperadminFeaturesFeatureFlagDto -> response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class SuperadminFeaturesFeatureFlagDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() description!: string;
  @ApiProperty() isGlobalEnabled!: boolean;
  @ApiProperty({ type: [String] }) enabledTenantIds!: string[];
}