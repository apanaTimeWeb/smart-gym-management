/**
 * RESPONSIBILITY: Zustand store that manages all async data for the Invoices module.
 * DATA FLOW: API (superadminApi) <-> useSuperadminInvoicesStore.ts <-> UI Components
 */

// DATA FLOW: Component -> useSuperadminInvoicesStore.ts -> API/Store
import { create } from 'zustand';
import toast from 'react-hot-toast';
import { invoicesApi } from '@/app/superadmin/invoices/superadmin_invoices_api/superadmin_invoices_api';
import type { CreateManualPaymentDto } from '@/app/superadmin/invoices/superadmin_invoices_api/superadmin_invoices_api';
import { superadminApi } from '@/app/superadmin/superadmin_api/superadmin_api';
import type { SaaSInvoice } from '@/app/superadmin/invoices/superadmin_invoices_types/superadmin_invoices_types';
import type { Tenant } from '@/app/superadmin/superadmin_types/superadmin_types';
import type { FetchState } from '@/app/superadmin/superadmin_types/superadmin_types';

interface InvoicesState {
  invoices: SaaSInvoice[];
  tenants: Tenant[];
  fetchState: FetchState;
  error: string | null;
  actionLoading: boolean;

  fetchData: () => Promise<void>;
  logManualPayment: (data: { gymId: string, amount: number, planName: string }) => Promise<void>;
}

export const useSuperadminInvoicesStore = create<InvoicesState>((set) => ({
  invoices: [],
  tenants: [],
  fetchState: 'idle',
  error: null,
  actionLoading: false,

  fetchData: async () => {
    set({ fetchState: 'loading', error: null });
    try {
      const [invoicesRes, tenantsRes] = await Promise.all([
        invoicesApi.fetchInvoices(),
        superadminApi.gyms.fetchGyms()
      ]);
      const tenants = tenantsRes.data || [];
      set({
        invoices: invoicesRes.data || [],
        tenants: tenants,
        fetchState: 'success'
      });
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Failed to fetch invoices data';
      set({ error: errMsg, fetchState: 'error' });
      toast.error(errMsg);
    }
  },

  logManualPayment: async (data: { gymId: string, amount: number, planName: string }) => {
    set({ actionLoading: true });
    try {
      const dto: CreateManualPaymentDto = {
        gymId: data.gymId,
        amount: data.amount,
        planName: data.planName,
        currency: 'INR',
      };
      const res = await invoicesApi.createManualPayment(dto);
      if (res.success && res.data) {
        // Pessimistic update: only prepend the invoice confirmed by the backend (Rule 15)
        set(state => ({
          invoices: [res.data!, ...state.invoices],
        }));
        toast.success(res.message || 'Payment logged successfully');
      } else {
        toast.error(res.message || 'Failed to log payment');
      }
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Failed to log payment';
      toast.error(errMsg);
    } finally {
      set({ actionLoading: false });
    }
  }
}));
