// RESPONSIBILITY: Defines one DTO shape owned by this Manager feature.
// FLOW: Feature API contract -> explicit DTO type -> Swagger serialization.
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, Min, ValidateNested, IsInt } from 'class-validator';
import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

export class StoreCreateOrderStoreOrderItemDto {
  @IsString() productId!: string;
  @IsInt() @Min(1) qty!: number;
  @IsOptional() @IsNumber() @Min(0) price!: number;
}
