import { StateCreator } from 'zustand';
import toast from 'react-hot-toast';
import { gymsApi } from '@/app/superadmin/gyms/gyms_api/gyms_api';
import type { Tenant, FetchState, TenantStatus } from '@/app/superadmin/gyms/gyms_types/gyms_types';
import { WhatsAppFormatter } from '@/lib/whatsapp_formatter';
import type { GymsState } from '@/app/superadmin/gyms/gyms_store/useGymsStore';

export interface GymsDataSlice {
  // Data State
  gyms: Tenant[] | null;
  fetchState: FetchState;
  error: string | null;
  actionLoadingId: string | null;

  // Async Actions
  fetchGyms: (searchQuery?: string) => Promise<void>;
  handleGhostLogin: (id: string, name: string) => Promise<void>;
  handleSuspend: (id: string, name: string, currentStatus: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  handleEditGym: (id: string, data: Partial<Tenant>) => Promise<void>;
  handleWhatsappOwner: (id: string, data: { subject: string; message: string; [key: string]: unknown }) => Promise<void>;
  addGym: (gym: Tenant) => void;
}

export const createGymsDataSlice: StateCreator<GymsState, [], [], GymsDataSlice> = (set, get) => ({
  gyms: null,
  fetchState: 'idle',
  error: null,
  actionLoadingId: null,

  addGym: (gym) => {
    const { gyms } = get();
    set({ gyms: [gym, ...(gyms || [])] });
  },

  fetchGyms: async (searchQuery = '') => {
    set({ fetchState: 'loading', error: null });
    try {
      const currentGyms = get().gyms;
      const baseGyms = currentGyms || [
        { id: '1', name: 'Golds Gym', ownerName: 'Arnold S.', adminEmail: 'admin@golds.com', phone: '7870009099', plan: 'Pro', status: 'ACTIVE', memberCount: 120, monthlyRevenue: 5000, databaseVersion: 'v1.2.0', createdAt: new Date().toISOString() },
        { id: '2', name: 'Planet Fitness', ownerName: 'John D.', adminEmail: 'john@planet.com', phone: '7870009099', plan: 'Starter', status: 'TRIAL', memberCount: 45, monthlyRevenue: 1000, databaseVersion: 'v1.1.0', createdAt: new Date().toISOString() },
      ];
      const filtered = searchQuery ? baseGyms.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase())) : baseGyms;
      set({ gyms: filtered, fetchState: 'success' });
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error) || 'Failed to fetch gyms';
      set({ error: errMsg, fetchState: 'error' });
      toast.error(errMsg);
    }
  },

  handleGhostLogin: async (id, name) => {
    set({ actionLoadingId: id });
    try {
      const res = await gymsApi.impersonateTenant(id);
      if (res.success) {
        toast.success(`Impersonating ${name}...`);
        if (res.data?.token) {
          localStorage.setItem('gymsmart_impersonate_token', res.data.token);
        }
        window.location.href = '/admin/dashboard';
      } else {
        toast.error(res.message || 'Failed to impersonate tenant');
      }
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error) || 'Failed to impersonate tenant';
      toast.error(errMsg);
    } finally {
      set({ actionLoadingId: null });
    }
  },

  handleSuspend: async (id, name, currentStatus) => {
    const newStatus = currentStatus === 'SUSPENDED' ? 'ACTIVE' : 'SUSPENDED';
    set({ actionLoadingId: id });
    try {
      toast.success(`${name} is now ${newStatus}.`);
      const { gyms } = get();
      if (gyms) {
        set({ gyms: gyms.map(gym => gym.id === id ? { ...gym, status: newStatus as TenantStatus } : gym) });
      }
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error) || `Failed to update status for ${name}`;
      toast.error(errMsg);
    } finally {
      set({ actionLoadingId: null });
    }
  },

  handleDelete: async (id) => {
    set({ actionLoadingId: id });
    try {
      toast.success(`Tenant deleted successfully.`);
      const { gyms } = get();
      if (gyms) {
        set({ gyms: gyms.filter(gym => gym.id !== id) });
      }
      get().closeDeleteModal();
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error) || `Failed to delete tenant`;
      toast.error(errMsg);
    } finally {
      set({ actionLoadingId: null });
    }
  },

  handleEditGym: async (id, data) => {
    set({ actionLoadingId: id });
    try {
      toast.success(`Gym details updated successfully.`);
      const { gyms } = get();
      if (gyms) {
        set({ gyms: gyms.map(gym => gym.id === id ? { ...gym, ...data } : gym) });
      }
      get().closeEditModal();
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error) || `Failed to update gym details.`;
      toast.error(errMsg);
    } finally {
      set({ actionLoadingId: null });
    }
  },

  handleWhatsappOwner: async (id, data) => {
    set({ actionLoadingId: id });
    try {
      if (data.phone) {
        const cleanPhone = String(data.phone).replace(/\D/g, '');
        const dateStr = new Intl.DateTimeFormat('en-IN', {
          day: '2-digit', month: 'short', year: 'numeric',
          hour: '2-digit', minute: '2-digit', hour12: true
        }).format(new Date());

        const waText = WhatsAppFormatter.formatReceipt({
          title: 'Smart Gym 360',
          subtitle: String(data.subject),
          date: dateStr,
          customerInfo: {
            Owner: String(data.ownerName || 'Gym Owner'),
            Gym: String(data.gymName || 'Gym')
          },
          sections: [
            {
              title: 'Message',
              items: {
                'Content': String(data.message)
              }
            }
          ],
          footer: 'Powered by Smart Gym 360'
        });
        
        window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(waText)}`, '_blank');
      }

      toast.success('WhatsApp opened successfully.');
      get().closeWhatsappModal();
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error) || 'Failed to send WhatsApp message.';
      toast.error(errMsg);
    } finally {
      set({ actionLoadingId: null });
    }
  },
});
