// RESPONSIBILITY: Shared utility helpers for the Superadmin Invoices module.
// Status badge classes and amount formatting — never inline in components.

export type InvoiceStatus = 'PAID' | 'PENDING' | 'FAILED';

/** Returns Tailwind badge classes for a given invoice status. */
export function getInvoiceStatusClasses(status: InvoiceStatus): string {
  const map: Record<InvoiceStatus, string> = {
    PAID: 'bg-success-bg text-success border border-success/20',
    PENDING: 'bg-warning/10 text-warning border border-warning/20',
    FAILED: 'bg-danger-bg text-danger border border-danger/20',
  };
  return map[status] ?? 'bg-input text-secondary border border-border';
}

/** Formats an amount in Indian Numbering System: ₹1,23,456.00 */
export function formatInvoiceAmount(amount: number): string {
  return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
