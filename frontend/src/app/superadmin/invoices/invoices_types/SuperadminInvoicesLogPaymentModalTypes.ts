// RESPONSIBILITY: Type contract extracted from SuperadminInvoicesLogPaymentModal.tsx; no business behavior.
import type { SuperadminInvoicesTenant } from '@/app/superadmin/invoices/invoices_types/SuperadminInvoicesTypes';

export interface SuperadminInvoicesLogPaymentModalProps {
    onClose: () => void;
    selectedGym: SuperadminInvoicesTenant | undefined;
    isGymDropdownOpen: boolean;
    setIsGymDropdownOpen: (open: boolean) => void;
    gymSearchTerm: string;
    setGymSearchTerm: (term: string) => void;
    filteredTenantsForDropdown: SuperadminInvoicesTenant[];
    handleSelectGym: (id: string) => void;
    paymentMethod: string;
    setPaymentMethod: (method: string) => void;
    onSave: (amount: number) => void;
}
