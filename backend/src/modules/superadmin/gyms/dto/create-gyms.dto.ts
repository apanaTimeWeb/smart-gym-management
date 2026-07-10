import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGymDto {
  @ApiProperty({ description: 'Placeholder field for Gym' })
  @IsString()
  @IsOptional()
  name?: string;
}
