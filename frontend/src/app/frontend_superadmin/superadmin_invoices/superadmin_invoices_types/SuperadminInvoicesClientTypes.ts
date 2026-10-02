import type { SUPERADMIN_INVOICES_TAB_CODES } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_constants/SuperadminInvoicesConstants';

// RESPONSIBILITY: Type contract extracted from SuperadminInvoicesMain.tsx; no business behavior.

export type InvoicesTab = keyof typeof SUPERADMIN_INVOICES_TAB_CODES;
