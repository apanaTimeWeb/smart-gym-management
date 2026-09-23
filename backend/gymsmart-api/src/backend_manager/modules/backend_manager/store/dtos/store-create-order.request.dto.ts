// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';import { StoreCreateOrderStoreOrderItemDto } from '@/backend_manager/modules/backend_manager/store/dtos/store-create-order-store-order-item.dto';

export class StoreCreateOrderRequestDto extends CoreRequestDto {
  @IsArray() @ValidateNested({ each: true }) @Type(() => StoreCreateOrderStoreOrderItemDto) items!: StoreCreateOrderStoreOrderItemDto[];
  @IsString() method!: string;
  @IsOptional() @IsString() notes!: string;
  @IsOptional() @IsString() customerName!: string;
  @IsOptional() @IsNumber() @Min(0) total!: number;
  @IsOptional() @IsString() status!: string;
}
