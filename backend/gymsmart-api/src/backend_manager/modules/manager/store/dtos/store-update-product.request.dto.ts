import { CoreRequestDto } from '@/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for PATCH /api/v1/manager/store/products/:id.
// FLOW: HTTP payload -> StoreUpdateProductRequestDto validation -> write use case -> orchestrator.

import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class StoreUpdateProductRequestDto extends CoreRequestDto {
  @IsString()
  name!: string;

  @IsString()
  category!: StoreCategory;

  @IsNumber()
  @Type(() => Number)
  price!: number;

  @IsNumber()
  @Type(() => Number)
  stock!: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsBoolean()
  isActive!: boolean;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsString()
  barcode?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  costPrice?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  reorderThreshold?: number;

}
