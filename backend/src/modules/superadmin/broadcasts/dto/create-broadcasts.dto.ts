import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBroadcastDto {
  @ApiProperty({ description: 'Placeholder field for Broadcast' })
  @IsString()
  @IsOptional()
  name?: string;
}
