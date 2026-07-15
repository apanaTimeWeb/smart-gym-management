import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDashboardDto {
  @ApiProperty({ description: 'Placeholder field for Dashboard' })
  @IsString()
  name: string;
}
