// RESPONSIBILITY: Validates creation payloads at the invoices HTTP boundary.
// FLOW: HTTP JSON -> InvoicesCreateDto -> Invoices service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum InvoicesStatus { FAILED = 'FAILED', OVERDUE = 'OVERDUE', PAID = 'PAID', PENDING = 'PENDING', }
export enum InvoicesPaymentMethod { BankTransfer = 'Bank Transfer', CreditCard = 'Credit Card', UPI = 'UPI', }
export enum InvoicesInvoiceType { ONETIME = 'ONE_TIME', RECURRING = 'RECURRING', SETUPFEE = 'SETUP_FEE', }
export class InvoicesCreateDto {
  @IsString()
  tenantId!: string;
  @IsString()
  tenantName!: string;
  @IsInt()
  @Min(0)
  amount!: number;
  @IsString()
  currency!: string;
  @IsEnum(InvoicesStatus)
  status!: InvoicesStatus;
  @Type(() => Date)
  @IsDate()
  issuedAt!: Date;
  @Type(() => Date)
  @IsDate()
  dueDate!: Date;
  @Type(() => Date)
  @IsDate()
  paidAt!: Date;
  @IsEnum(InvoicesPaymentMethod)
  paymentMethod!: InvoicesPaymentMethod;
  @IsEnum(InvoicesInvoiceType)
  invoiceType!: InvoicesInvoiceType;
  @IsString()
  planName!: string;
  @IsString()
  taxId!: string;
}
