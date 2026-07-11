import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum } from 'class-validator';
import type {  InvoiceStatus  } from '../invoices.interfaces';

export class CreateSaaSInvoiceDto {
  @IsString()
  @IsOptional()
  tenantName?: string;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsOptional()
  status?: InvoiceStatus;

  @IsDateString()
  @IsOptional()
  date?: Date;

  @IsString()
  @IsOptional()
  planName?: string;


}
