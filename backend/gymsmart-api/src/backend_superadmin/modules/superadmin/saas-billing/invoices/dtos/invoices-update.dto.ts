// RESPONSIBILITY: Validates partial updates at the invoices HTTP boundary.
// FLOW: HTTP JSON -> InvoicesUpdateDto -> Invoices service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum InvoicesStatus { FAILED = 'FAILED', OVERDUE = 'OVERDUE', PAID = 'PAID', PENDING = 'PENDING', }
export enum InvoicesPaymentMethod { BankTransfer = 'Bank Transfer', CreditCard = 'Credit Card', UPI = 'UPI', }
export enum InvoicesInvoiceType { ONETIME = 'ONE_TIME', RECURRING = 'RECURRING', SETUPFEE = 'SETUP_FEE', }
export class InvoicesUpdateDto {
  @IsOptional()
  @IsString()
  tenantId!: string;
  @IsOptional()
  @IsString()
  tenantName!: string;
  @IsOptional()
  @IsInt()
  @Min(0)
  amount!: number;
  @IsOptional()
  @IsString()
  currency!: string;
  @IsOptional()
  @IsEnum(InvoicesStatus)
  status!: InvoicesStatus;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  issuedAt!: Date;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dueDate!: Date;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  paidAt!: Date;
  @IsOptional()
  @IsEnum(InvoicesPaymentMethod)
  paymentMethod!: InvoicesPaymentMethod;
  @IsOptional()
  @IsEnum(InvoicesInvoiceType)
  invoiceType!: InvoicesInvoiceType;
  @IsOptional()
  @IsString()
  planName!: string;
  @IsOptional()
  @IsString()
  taxId!: string;
}
