import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RenewMemberDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  planId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  billingCycle?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  durationMonths?: number;
}
