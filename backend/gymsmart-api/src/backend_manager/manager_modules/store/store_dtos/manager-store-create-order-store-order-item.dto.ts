// RESPONSIBILITY: Defines one DTO shape owned by this Manager feature.
// FLOW: Feature API contract -> explicit DTO type -> Swagger serialization.
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, Min, ValidateNested, IsInt } from 'class-validator';
import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

export class ManagerStoreCreateOrderStoreOrderItemDto extends CoreRequestDto {
  @IsString() productId!: string;
  @IsInt() @Min(1) qty!: number;
  @IsOptional() @IsNumber() @Min(0) price!: number;
  @IsString() currency!: string;
}

export { ManagerStoreCreateOrderStoreOrderItemDto as StoreCreateOrderStoreOrderItemDto };
