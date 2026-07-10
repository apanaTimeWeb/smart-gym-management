import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
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
  @IsOptional()
  calories?: number;

  @ApiProperty({ description: 'Protein (g)', example: 150 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  protein?: number;

  @ApiProperty({ description: 'Carbs (g)', example: 200 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  carbs?: number;

  @ApiProperty({ description: 'Fats (g)', example: 70 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  fats?: number;

  @ApiProperty({ description: 'Description', example: 'High protein diet' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Meals', example: ['Oatmeal', 'Chicken Rice'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  meals?: string[];

  @ApiProperty({ description: 'Is active', default: true, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
