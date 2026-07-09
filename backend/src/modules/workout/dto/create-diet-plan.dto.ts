import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  Min,
} from 'class-validator';

export class CreateDietPlanDto {
  @ApiProperty({ description: 'Plan name', example: 'Bulking Phase 1' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Goal', example: 'Muscle Gain' })
  @IsString()
  goal: string;

  @ApiProperty({ description: 'Daily calories', example: 3000 })
  @IsNumber()
  @Min(0)
  calories: number;

  @ApiProperty({ description: 'Is active', default: true, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
