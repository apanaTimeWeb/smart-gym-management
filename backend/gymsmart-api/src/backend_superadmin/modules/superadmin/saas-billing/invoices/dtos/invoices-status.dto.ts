// RESPONSIBILITY: Validates InvoicesStatusDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsEnum } from 'class-validator';
import { InvoicesStatus } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/dtos/invoices-update.dto';

export class InvoicesStatusDto {
  @IsEnum(InvoicesStatus)
  status!: InvoicesStatus;
}