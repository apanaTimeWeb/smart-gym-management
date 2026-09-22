import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for POST /api/v1/manager/store/products.
// FLOW: HTTP payload -> StoreCreateProductRequestDto validation -> write use case -> orchestrator.

import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class StoreCreateProductRequestDto extends CoreRequestDto {
  @IsString()
  name!: string;

  @IsString()
  category!: any;

  @IsNumber()
  @Type(() => Number)
  price!: number;

  @IsNumber()
  @Type(() => Number)
  stock!: number;

  @IsOptional()
  @IsString()
  description!: string;

  @IsOptional()
  @IsString()
  imageUrl!: string;

  @IsBoolean()
  isActive!: boolean;

  @IsOptional()
  @IsString()
  unit!: string;

  @IsOptional()
  @IsString()
  sku!: string;

  @IsOptional()
  @IsString()
  barcode!: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  costPrice!: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  reorderThreshold!: number;

}
