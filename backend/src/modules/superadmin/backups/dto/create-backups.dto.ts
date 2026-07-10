import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBackupDto {
  @ApiProperty({ description: 'Placeholder field for Backup' })
  @IsString()
  @IsOptional()
  name?: string;
}
