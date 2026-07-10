import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAffiliateDto {
  @ApiProperty({ description: 'Placeholder field for Affiliate' })
  @IsString()
  @IsOptional()
  name?: string;
}
