// RESPONSIBILITY: Validates InvoicesManualPaymentDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsISO4217CurrencyCode, IsInt, IsString, Min } from 'class-validator';

export class InvoicesManualPaymentDto {
  @IsString()
  gymId!: string;
  @IsInt()
  @Min(0)
  amount!: number;
  @IsString()
  planName!: string;
  @IsISO4217CurrencyCode()
  currency!: string;
}