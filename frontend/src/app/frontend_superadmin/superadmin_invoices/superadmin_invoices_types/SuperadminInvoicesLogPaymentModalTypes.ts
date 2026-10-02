// RESPONSIBILITY: Type contract for the documented invoice manual-payment form.
import type { SuperadminInvoicesTenant } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_types/SuperadminInvoicesTypes';

export interface SuperadminInvoicesLogPaymentModalProps {
  onClose: () => void;
  selectedGym: SuperadminInvoicesTenant | undefined;
  isGymDropdownOpen: boolean;
  setIsGymDropdownOpen: (open: boolean) => void;
  gymSearchTerm: string;
  setGymSearchTerm: (term: string) => void;
  filteredTenantsForDropdown: SuperadminInvoicesTenant[];
  handleSelectGym: (id: string) => void;
  onSave: (amount: number) => Promise<boolean>;
  isSaving: boolean;
}
