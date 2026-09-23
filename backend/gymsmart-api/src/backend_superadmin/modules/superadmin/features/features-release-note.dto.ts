// RESPONSIBILITY: Defines the release-note row returned to the Superadmin frontend.
// FLOW: Release-note repository -> mapper -> FeaturesReleaseNoteDto -> response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class FeaturesReleaseNoteDto {
  @ApiProperty() id!: string;
  @ApiProperty() version!: string;
  @ApiProperty() title!: string;
  @ApiProperty() content!: string;
  @ApiProperty() date!: string;
  @ApiProperty() isPublished!: boolean;
}