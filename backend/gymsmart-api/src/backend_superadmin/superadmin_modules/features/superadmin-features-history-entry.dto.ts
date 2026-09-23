// RESPONSIBILITY: Defines one feature-flag history entry returned to the Superadmin frontend.
// FLOW: Feature history query -> SuperadminFeaturesHistoryEntryDto -> response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class SuperadminFeaturesHistoryEntryDto {
  @ApiProperty() id!: string;
  @ApiProperty() action!: string;
  @ApiProperty() user!: string;
  @ApiProperty() timestamp!: string;
}