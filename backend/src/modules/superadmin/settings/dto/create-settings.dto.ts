import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSettingDto {
  @ApiProperty({ description: 'Placeholder field for Setting' })
  @IsString()
  @IsOptional()
  name?: string;
}
