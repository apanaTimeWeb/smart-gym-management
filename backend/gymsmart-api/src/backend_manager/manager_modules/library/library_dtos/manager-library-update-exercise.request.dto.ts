// RESPONSIBILITY: Owns the Manager library request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

import { LibraryCategory } from '@/backend_manager/manager_modules/library/manager-library.constants';

export class ManagerLibraryUpdateExerciseRequestDto extends CoreRequestDto {
  @IsString()
  @ApiProperty()
  name!: string;

  @IsString()
  @ApiProperty()
  category!: LibraryCategory;

  @IsOptional()
  @IsArray()
  @ApiPropertyOptional()
  muscleGroup!: string[];

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional()
  sets!: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional()
  reps!: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional()
  duration!: number;

  @IsString()
  @ApiProperty()
  difficulty!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  description!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  videoUrl!: string;

  @IsBoolean()
  @ApiProperty()
  isActive!: boolean;

}

export { ManagerLibraryUpdateExerciseRequestDto as LibraryUpdateExerciseRequestDto };
