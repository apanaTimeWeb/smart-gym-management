// RESPONSIBILITY: Owns the Manager library request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

import type { LibraryDietMeal } from '@/backend_manager/manager_modules/library/library_types/manager-library.types';

export class ManagerLibraryCreateDietPlanRequestDto extends CoreRequestDto {
  @IsString()
  @ApiProperty()
  name!: string;

  @IsString()
  @ApiProperty()
  goal!: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional()
  calories!: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional()
  protein!: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional()
  carbs!: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional()
  fats!: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  description!: string;

  @IsArray()
  @ApiProperty()
  meals!: (string | LibraryDietMeal)[];

  @IsBoolean()
  @ApiProperty()
  isActive!: boolean;

}

export { ManagerLibraryCreateDietPlanRequestDto as LibraryCreateDietPlanRequestDto };
