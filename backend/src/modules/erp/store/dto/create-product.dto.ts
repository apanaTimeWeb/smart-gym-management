import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name', example: 'Whey Protein' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'SKU code', example: 'WP-1KG-CHOC' })
  @IsString()
  sku: string;

  @ApiProperty({ description: 'Category', example: 'Supplements' })
  @IsString()
  category: string;

  @ApiProperty({ description: 'Product description', example: 'High quality whey protein' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Price in currency', example: 59.99 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Initial stock quantity', example: 100 })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({
    description: 'Is product active',
    default: true,
    required: false,
  })
  @IsBoolean()
  isActive: boolean;
}
