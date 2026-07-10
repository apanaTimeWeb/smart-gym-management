import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanDto {
  @ApiProperty({ description: 'Placeholder field for Plan' })
  @IsString()
  @IsOptional()
  name?: string;
}
