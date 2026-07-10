import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuditLogDto {
  @ApiProperty({ description: 'Placeholder field for AuditLog' })
  @IsString()
  @IsOptional()
  name?: string;
}
