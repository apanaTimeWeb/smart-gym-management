import { IsString, IsNumber, IsEnum, IsArray, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PlanTier } from '@/modules/plans/utils/plans.enums';

export class CreatePlanDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ enum: PlanTier })
  @IsEnum(PlanTier)
  tier: PlanTier;

  @ApiProperty()
  @IsNumber()
  price1Month: number;

  @ApiProperty()
  @IsNumber()
  price3Month: number;

  @ApiProperty()
  @IsNumber()
  price6Month: number;

  @ApiProperty()
  @IsNumber()
  price12Month: number;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  features: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
