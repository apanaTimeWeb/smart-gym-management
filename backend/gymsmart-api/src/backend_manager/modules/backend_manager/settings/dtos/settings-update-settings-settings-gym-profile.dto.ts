// RESPONSIBILITY: Defines one DTO shape owned by this Manager feature.
// FLOW: Feature API contract -> explicit DTO type -> Swagger serialization.
import { ApiProperty } from '@nestjs/swagger';

export class SettingsUpdateSettingsSettingsGymProfileDto {
  @ApiProperty() gymName!: string; @ApiProperty() address!: string; @ApiProperty() city!: string; @ApiProperty() state!: string; @ApiProperty() pincode!: string; @ApiProperty() phone!: string; @ApiProperty() email!: string; @ApiProperty() logoUrl?: string; @ApiProperty() website?: string; @ApiProperty() gstin?: string;
}
