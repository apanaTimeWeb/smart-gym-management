import { IsString, IsNotEmpty, IsNumber, IsOptional, IsEnum, Min } from 'class-validator';
import { SalesStatus } from '../sales.interfaces';

export class CreateSalesDto {
  @IsString()
  @IsNotEmpty()
  memberId: string;

  @IsString()
  @IsOptional()
  planId?: string;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsEnum(SalesStatus)
  @IsOptional()
  status?: SalesStatus;

  @IsString()
  @IsOptional()
  paymentMethod?: string;

  @IsString()
  @IsOptional()
  transactionId?: string;
}
