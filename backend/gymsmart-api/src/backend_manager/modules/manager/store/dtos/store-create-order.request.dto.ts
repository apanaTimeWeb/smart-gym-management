import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';
import { IsArray, IsInt, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class StoreOrderItemDto {
  @IsString() productId!: string;
  @IsInt() @Min(1) qty!: number;
  @IsOptional() @IsNumber() @Min(0) price!: number;
}

export class StoreCreateOrderRequestDto extends CoreRequestDto {
  @IsArray() @ValidateNested({ each: true }) @Type(() => StoreOrderItemDto) items!: any[];
  @IsString() method!: string;
  @IsOptional() @IsString() notes!: string;
  @IsOptional() @IsString() customerName!: string;
  @IsOptional() @IsNumber() @Min(0) total!: number;
  @IsOptional() @IsString() status!: string;
}
