// RESPONSIBILITY: Defines the stable response data contract for settings endpoints.
// FLOW: Domain model -> SettingsResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SettingsResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  key!: string;
  @ApiPropertyOptional()
  value!: string;
  @ApiPropertyOptional()
  description!: string;
  @ApiPropertyOptional()
  category!: string;
  @ApiPropertyOptional()
  dataType!: string;
}