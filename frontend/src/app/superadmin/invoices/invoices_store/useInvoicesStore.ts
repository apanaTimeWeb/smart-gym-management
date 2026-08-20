/**
 * RESPONSIBILITY: Zustand store that manages all async data for the Invoices module.
 * DATA FLOW: API (superadminApi) <-> useInvoicesStore.ts <-> UI Components
 */

import { create } from 'zustand';
import toast from 'react-hot-toast';
import { invoicesApi } from '@/app/superadmin/invoices/invoices_api/invoices_api';
import { gymsApi } from '@/app/superadmin/gyms/gyms_api/gyms_api';
import type { SaaSInvoice } from '@/app/superadmin/invoices/invoices_types/invoices_types';
import type { Tenant } from '@/app/superadmin/gyms/gyms_types/gyms_types';
import type { FetchState } from '@/app/superadmin/superadmin_types/superadmin_types';

interface InvoicesState {
  invoices: SaaSInvoice[];
  tenants: Tenant[];
  fetchState: FetchState;
  error: string | null;
  actionLoading: boolean;

  fetchData: () => Promise<void>;
  logManualPayment: (data: unknown) => Promise<void>;
}

export const useInvoicesStore = create<InvoicesState>((set, get) => ({
  invoices: [],
  tenants: [],
  fetchState: 'idle',
  error: null,
  actionLoading: false,

  fetchData: async () => {
    set({ fetchState: 'loading', error: null });
    try {
      const [invoicesRes, tenantsRes] = await Promise.all([
        invoicesApi.getAll(),
        gymsApi.getAll()
      ]);
      set({ 
        invoices: invoicesRes.data || [], 
        tenants: tenantsRes.data || [], 
        fetchState: 'success' 
      });
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Failed to fetch invoices data';
      set({ error: errMsg, fetchState: 'error' });
      toast.error(errMsg);
    }
  },

  logManualPayment: async (data) => {
    set({ actionLoading: true });
    try {
      // In a real app, this would be an API call
      // await superadminApi.invoices.create(data);
      toast.success('Payment logged successfully');
      await get().fetchData();
    } catch (error: unknown) {
      toast.error('Failed to log payment');
    } finally {
      set({ actionLoading: false });
    }
  }
}));
