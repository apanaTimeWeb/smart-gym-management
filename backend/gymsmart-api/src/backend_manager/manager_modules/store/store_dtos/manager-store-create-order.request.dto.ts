// RESPONSIBILITY: Owns the Manager store request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { Type } from 'class-transformer';
import {IsArray, IsInt, IsNumber, IsOptional, IsString, Matches, Min, ValidateNested} from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';import { ManagerStoreCreateOrderStoreOrderItemDto } from '@/backend_manager/manager_modules/store/store_dtos/manager-store-create-order-store-order-item.dto';

export class ManagerStoreCreateOrderRequestDto extends CoreRequestDto {
  @Matches(/^[A-Z]{3}$/)
  @ApiProperty()
  currency!: string;


  @IsArray() @ValidateNested({ each: true }) @Type(() => ManagerStoreCreateOrderStoreOrderItemDto) items!: ManagerStoreCreateOrderStoreOrderItemDto[];
  @IsString() method!: string;
  @IsOptional() @IsString() notes!: string;
  @IsOptional() @IsString() customerName!: string;
  @IsOptional() @IsNumber() @Min(0) total!: number;
  @IsOptional() @IsString() status!: string;
}

export { ManagerStoreCreateOrderRequestDto as StoreCreateOrderRequestDto };
