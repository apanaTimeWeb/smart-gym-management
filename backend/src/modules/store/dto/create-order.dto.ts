import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  @ApiProperty({ description: 'Payment method', example: 'Credit Card' })
  @IsString()
  method: string;

  @ApiPropertyOptional({
    description: 'Order notes',
    example: 'Deliver to front desk',
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
