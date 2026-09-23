// RESPONSIBILITY: Validates SuperadminInvoicesStatusDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsEnum } from 'class-validator';
import { InvoicesStatus } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/dtos/superadmin-saas-billing-invoices-update.dto';

export class SuperadminInvoicesStatusDto {
  @IsEnum(InvoicesStatus)
  status!: InvoicesStatus;
}