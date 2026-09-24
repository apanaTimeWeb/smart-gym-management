// RESPONSIBILITY: Defines typed business exceptions for invoice resources and resend jobs.
// FLOW: Invoice service/repository/worker -> typed exception -> global exception boundary -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';

/**
 * Primary Intent: Defines SuperadminInvoicesNotFoundException as the class-level contract for superadmin-saas-billing-invoices.exceptions.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminInvoicesNotFoundException extends Error {
  readonly statusCode = HttpStatus.NOT_FOUND;
  readonly errorCode = 'INVOICES.RESOURCE.NOT_FOUND';
  readonly translationKey = 'invoices.ERRORS.NOT_FOUND';
  constructor() { super(''); this.name = 'SuperadminInvoicesNotFoundException'; }
}
/**
 * Primary Intent: Defines SuperadminInvoicesResendJobNotFoundException as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */

export class SuperadminInvoicesResendJobNotFoundException extends Error {
  readonly statusCode = HttpStatus.NOT_FOUND;
  readonly errorCode = 'INVOICES.RESEND.JOB_NOT_FOUND';
  readonly translationKey = 'invoices.ERRORS.NOT_FOUND';
  constructor() { super(''); this.name = 'SuperadminInvoicesResendJobNotFoundException'; }
}

/**
 * Primary Intent: Defines SuperadminInvoicesResourceConflictException as the class-level contract for superadmin-saas-billing-invoices.exceptions.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminInvoicesResourceConflictException extends Error {
  readonly statusCode = HttpStatus.CONFLICT;
  readonly errorCode = 'INVOICES.RESOURCE.CONFLICT';
  readonly translationKey = 'invoices.ERRORS.DELIVERY_FAILED';
  constructor() { super(''); this.name = 'SuperadminInvoicesResourceConflictException'; }
}
