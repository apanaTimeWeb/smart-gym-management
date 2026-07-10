import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSystemDto {
  @ApiProperty({ description: 'Placeholder field for System' })
  @IsString()
  @IsOptional()
  name?: string;
}
