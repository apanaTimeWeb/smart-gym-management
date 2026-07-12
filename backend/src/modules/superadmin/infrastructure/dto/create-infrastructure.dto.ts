import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInfrastructureDto {
  @ApiProperty({ description: 'Placeholder field for Infrastructure' })
  @IsString()
  name: string;
}
