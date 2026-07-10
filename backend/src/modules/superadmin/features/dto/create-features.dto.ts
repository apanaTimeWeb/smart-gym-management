import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeatureDto {
  @ApiProperty({ description: 'Placeholder field for Feature' })
  @IsString()
  @IsOptional()
  name?: string;
}
