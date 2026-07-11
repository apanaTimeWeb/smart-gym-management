import {
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsDateString,
  Min,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { InvoiceStatus, SaaSPlanTier } from '../entities/invoices.entity';

export class CreateInvoiceDto {
  @ApiProperty({ description: 'Name of the gym tenant being billed', example: 'Iron Forge Fitness' })
  @IsString()
  @MaxLength(255)
  tenantName: string;

  @ApiPropertyOptional({ description: 'Internal tenant ID for cross-referencing' })
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiProperty({ description: 'Invoice amount', example: 99.00 })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiPropertyOptional({ description: 'Currency code', example: 'USD', default: 'USD' })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  currency?: string;

  @ApiPropertyOptional({ enum: InvoiceStatus, default: InvoiceStatus.PENDING })
  @IsOptional()
  @IsEnum(InvoiceStatus)
  status?: InvoiceStatus;

  @ApiProperty({ description: 'Invoice date (ISO 8601)', example: '2026-07-01T08:00:00Z' })
  @IsDateString()
  date: string;

  @ApiProperty({ enum: SaaSPlanTier, description: 'The plan this invoice is for' })
  @IsEnum(SaaSPlanTier)
  planName: SaaSPlanTier;

  @ApiPropertyOptional({ description: 'Human-readable invoice number', example: 'INV-2026-0881' })
  @IsOptional()
  @IsString()
  invoiceNumber?: string;
}
