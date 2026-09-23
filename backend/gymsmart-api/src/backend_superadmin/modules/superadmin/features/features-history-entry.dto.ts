// RESPONSIBILITY: Defines one feature-flag history entry returned to the Superadmin frontend.
// FLOW: Feature history query -> FeaturesHistoryEntryDto -> response envelope.
import { ApiProperty } from '@nestjs/swagger';

export class FeaturesHistoryEntryDto {
  @ApiProperty() id!: string;
  @ApiProperty() action!: string;
  @ApiProperty() user!: string;
  @ApiProperty() timestamp!: string;
}