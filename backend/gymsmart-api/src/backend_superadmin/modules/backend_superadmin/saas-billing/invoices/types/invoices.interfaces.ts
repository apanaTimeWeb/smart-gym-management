// RESPONSIBILITY: Defines domain/data transfer shapes for the invoices feature without ORM leakage.
// FLOW: DTO -> InvoicesInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';

export interface InvoicesListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string; tenantId?: string;}
export interface InvoicesCreateInput {
  tenantId?: string;
  tenantName?: string;
  amount?: number;
  currency?: string;
  status?: string;
  issuedAt?: Date;
  dueDate?: Date;
  paidAt?: Date | null;
  paymentMethod?: string;
  invoiceType?: string;
  planName?: string;
  taxId?: string;
}
export interface InvoicesUpdateInput extends InvoicesCreateInput {}

export interface InvoicesDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  tenantId: string;
  tenantName: string;
  amount: number;
  currency: string;
  status: string;
  issuedAt: Date;
  dueDate: Date;
  paidAt: Date | null;
  paymentMethod: string;
  invoiceType: string;
  planName: string;
  taxId: string;
}
