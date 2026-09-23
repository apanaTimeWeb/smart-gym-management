// RESPONSIBILITY: Defines the feature-flag row returned to the Superadmin frontend.
// FLOW: Feature repository -> mapper -> FeaturesFeatureFlagDto -> response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class FeaturesFeatureFlagDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() description!: string;
  @ApiProperty() isGlobalEnabled!: boolean;
  @ApiProperty({ type: [String] }) enabledTenantIds!: string[];
}