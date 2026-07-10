import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMigrationDto {
  @ApiProperty({ description: 'Placeholder field for Migration' })
  @IsString()
  @IsOptional()
  name?: string;
}
