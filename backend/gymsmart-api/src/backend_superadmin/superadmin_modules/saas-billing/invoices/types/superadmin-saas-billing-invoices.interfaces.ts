// RESPONSIBILITY: Defines domain/data transfer shapes for the invoices feature without ORM leakage.
// FLOW: DTO -> InvoicesInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';

export interface SuperadminInvoicesListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string; tenantId?: string;}
export interface SuperadminInvoicesCreateInput {
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
export interface SuperadminInvoicesUpdateInput extends SuperadminInvoicesCreateInput {}

export interface SuperadminInvoicesDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
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
