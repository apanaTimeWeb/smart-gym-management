import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty({ description: 'Placeholder field for Job' })
  @IsString()
  @IsOptional()
  name?: string;
}
