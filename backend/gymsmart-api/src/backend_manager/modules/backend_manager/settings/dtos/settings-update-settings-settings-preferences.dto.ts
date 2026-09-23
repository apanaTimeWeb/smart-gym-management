// RESPONSIBILITY: Defines one DTO shape owned by this Manager feature.
// FLOW: Feature API contract -> explicit DTO type -> Swagger serialization.
import { ApiProperty } from '@nestjs/swagger';

export class SettingsUpdateSettingsSettingsPreferencesDto {
  @ApiProperty() language!: string;
  @ApiProperty() timezone!: string;
  @ApiProperty({ type: Boolean }) pushNotificationsEnabled!: boolean;
  @ApiProperty({ type: Boolean }) emailDailyReports!: boolean;
}
