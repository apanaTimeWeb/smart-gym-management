// RESPONSIBILITY: Owns the Manager store request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { Type } from 'class-transformer';
import {IsBoolean, IsInt, IsNumber, IsOptional, IsString, Matches, Min} from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

export class ManagerStoreCreateProductRequestDto extends CoreRequestDto {
  @Matches(/^[A-Z]{3}$/)
  @ApiProperty()
  currency!: string;


  @IsString()
  @ApiProperty()
  name!: string;

  @IsString()
  @ApiProperty()
  category!: string;

  @IsInt()
  @Min(0)
  @ApiProperty()
  price!: number;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty()
  stock!: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  description!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  imageUrl!: string;

  @IsBoolean()
  @ApiProperty()
  isActive!: boolean;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  unit!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  sku!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  barcode!: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiPropertyOptional()
  costPrice!: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional()
  reorderThreshold!: number;
}

export { ManagerStoreCreateProductRequestDto as StoreCreateProductRequestDto };
