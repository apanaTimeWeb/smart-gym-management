// RESPONSIBILITY: Defines one DTO shape owned by this Manager feature.
// FLOW: Feature API contract -> explicit DTO type -> Swagger serialization.
import { ApiProperty } from '@nestjs/swagger';

export class SettingsFetchSettingsSettingsNotificationTemplateDto { @ApiProperty() id!: string; @ApiProperty() type!: string; @ApiProperty() channel!: string; @ApiProperty() subject?: string; @ApiProperty() body!: string; @ApiProperty({ type: [String] }) variables!: string[]; @ApiProperty({type:Boolean}) isActive!: boolean; @ApiProperty() updatedAt!: string; }
