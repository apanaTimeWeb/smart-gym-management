// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

export class StoreCreateProductRequestDto extends CoreRequestDto {
  @IsString()
  name!: string;

  @IsString()
  category!: string;

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
