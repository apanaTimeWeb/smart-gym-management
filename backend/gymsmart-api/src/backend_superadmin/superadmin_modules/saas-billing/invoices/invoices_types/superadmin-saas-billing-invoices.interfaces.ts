// RESPONSIBILITY: Defines domain/data transfer shapes for the invoices feature without ORM leakage.
// FLOW: DTO -> InvoicesInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';

/**
 * Primary Intent: Defines SuperadminInvoicesListQuery as the interface-level contract for superadmin-saas-billing-invoices.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminInvoicesListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string; tenantId?: string;}
/**
 * Primary Intent: Defines the SuperadminInvoicesCreateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
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
/**
 * Primary Intent: Defines SuperadminInvoicesUpdateInput as the interface-level contract for superadmin-saas-billing-invoices.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminInvoicesUpdateInput extends SuperadminInvoicesCreateInput {}

/**
 * Primary Intent: Defines the SuperadminInvoicesDomainModel type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
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

/**
 * Primary Intent: Defines the SuperadminInvoicesManualPaymentResult type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminInvoicesManualPaymentResult { id: string; amount: number; currency: string; tenantId: string; planName: string; }
