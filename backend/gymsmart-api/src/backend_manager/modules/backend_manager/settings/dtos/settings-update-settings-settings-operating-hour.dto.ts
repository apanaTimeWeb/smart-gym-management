// RESPONSIBILITY: Defines one DTO shape owned by this Manager feature.
// FLOW: Feature API contract -> explicit DTO type -> Swagger serialization.
import { ApiProperty } from '@nestjs/swagger';

export class SettingsUpdateSettingsSettingsOperatingHourDto { @ApiProperty() day!: string; @ApiProperty({ type: Boolean }) isOpen!: boolean; @ApiProperty() openTime!: string; @ApiProperty() closeTime!: string; }
