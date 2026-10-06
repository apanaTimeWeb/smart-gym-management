'use client';
// DATA FLOW: Invoices page → local tab state + useSuperadminInvoicesPage → child sections.
import { SUPERADMIN_INVOICES_TAB_CODES } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_constants/SuperadminInvoicesConstants';

// RESPONSIBILITY: Owns page-local tab state and completion behavior for the manual-payment modal.
import { useState } from 'react';

import { useSuperadminInvoicesPage } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_hooks/useSuperadminInvoicesPage';

import type { InvoicesTab } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_types/SuperadminInvoicesClientTypes';



/**
 * @description Coordinates Invoice route tab state and the manual-payment completion/close behavior.
 * @dependencies Composes the Invoice page hook and passes validated amounts into the feature mutation boundary.
 * @edge-case If no gym is selected, the save operation returns false and the modal remains available instead of closing optimistically.
 */
export function useSuperadminInvoicesMain() {
  const [activeTab, setActiveTab] = useState<InvoicesTab>(SUPERADMIN_INVOICES_TAB_CODES.ALL);
  const page = useSuperadminInvoicesPage();
  const handleSavePayment = async (amount: number): Promise<boolean> => {
    if (!page.selectedGym) return false;
    const recorded = await page.handleLogManualPayment(page.selectedGym.id, amount, page.selectedGym.plan);
    if (recorded) page.setShowAddModal(false);
    return recorded;
  };
  return { ...page, activeTab, setActiveTab, handleSavePayment };
}
