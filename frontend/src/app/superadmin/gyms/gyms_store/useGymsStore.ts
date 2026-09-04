/**
 * RESPONSIBILITY: Zustand store that manages all async data, UI state (modals, search), and actions for the Gyms module.
 * DATA FLOW: API (superadminApi) <-> useGymsStore.ts <-> UI Components (GymsTable, GymEditModal, etc.)
 * 
 * Provides centralized state management for the Superadmin Gyms (Tenants) module,
 * ensuring UI components remain purely presentational.
 */

import { create } from 'zustand';
import toast from 'react-hot-toast';

import { gymsApi } from '@/app/superadmin/gyms/gyms_api/gyms_api';
import type { Tenant, FetchState, TenantStatus } from '@/app/superadmin/gyms/gyms_types/gyms_types';

interface GymsState {
  // Data State
  gyms: Tenant[] | null;
  fetchState: FetchState;
  error: string | null;
  actionLoadingId: string | null;
  
  // UI State
  search: string;
  selectedGym: Tenant | null;
  isEditModalOpen: boolean;
  isWhatsappModalOpen: boolean;
  isDeleteModalOpen: boolean;
  gymToDelete: Tenant | null;

  // Actions
  setSearch: (search: string) => void;
  openEditModal: (gym: Tenant) => void;
  closeEditModal: () => void;
  openWhatsappModal: (gym: Tenant) => void;
  closeWhatsappModal: () => void;
  openDeleteModal: (gym: Tenant) => void;
  closeDeleteModal: () => void;
  
  // Async Actions
  fetchGyms: (searchQuery?: string) => Promise<void>;
  handleGhostLogin: (id: string, name: string) => Promise<void>;
  handleSuspend: (id: string, name: string, currentStatus: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  handleEditGym: (id: string, data: Partial<Tenant>) => Promise<void>;
  handleWhatsappOwner: (id: string, data: { subject: string; message: string; [key: string]: unknown }) => Promise<void>;
  addGym: (gym: Tenant) => void;
}

export const useGymsStore = create<GymsState>((set, get) => ({
  gyms: null,
  fetchState: 'idle',
  error: null,
  actionLoadingId: null,
  search: '',
  selectedGym: null,
  isEditModalOpen: false,
  isWhatsappModalOpen: false,
  isDeleteModalOpen: false,
  gymToDelete: null,

  setSearch: (search) => {
    set({ search });
    // In a real app, we'd debounce this and call fetchGyms.
    // For now, we'll just update the string. 
    // To strictly follow server-side filtering, we'd fire fetchGyms(search) via a debounced effect in the component.
  },

  addGym: (gym) => {
    const { gyms } = get();
    set({ gyms: [gym, ...(gyms || [])] });
  },

  openEditModal: (gym) => set({ selectedGym: gym, isEditModalOpen: true }),
  
  closeEditModal: () => {
    set({ isEditModalOpen: false });
    setTimeout(() => set({ selectedGym: null }), 200);
  },

  openWhatsappModal: (gym) => set({ selectedGym: gym, isWhatsappModalOpen: true }),
  
  closeWhatsappModal: () => {
    set({ isWhatsappModalOpen: false });
    setTimeout(() => set({ selectedGym: null }), 200);
  },

  openDeleteModal: (gym) => set({ gymToDelete: gym, isDeleteModalOpen: true }),
  
  closeDeleteModal: () => {
    set({ isDeleteModalOpen: false });
    setTimeout(() => set({ gymToDelete: null }), 200);
  },

  fetchGyms: async (searchQuery = '') => {
    set({ fetchState: 'loading', error: null });
    try {
      const currentGyms = get().gyms;
      const baseGyms = currentGyms || [
        { id: '1', name: 'Golds Gym', ownerName: 'Arnold S.', adminEmail: 'admin@golds.com', phone: '1234567890', plan: 'Pro', status: 'ACTIVE', memberCount: 120, monthlyRevenue: 5000, databaseVersion: 'v1.2.0', createdAt: new Date().toISOString() },
        { id: '2', name: 'Planet Fitness', ownerName: 'John D.', adminEmail: 'john@planet.com', phone: '0987654321', plan: 'Starter', status: 'TRIAL', memberCount: 45, monthlyRevenue: 1000, databaseVersion: 'v1.1.0', createdAt: new Date().toISOString() },
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
      toast.success(`Ghost login initiated for ${name}.`); // Mock response for now
    } finally {
      set({ actionLoadingId: null });
    }
  },

  handleSuspend: async (id, name, currentStatus) => {
    const newStatus = currentStatus === 'SUSPENDED' ? 'ACTIVE' : 'SUSPENDED';
    set({ actionLoadingId: id });
    try {
      // Mocking suspend success
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
      // Mocking delete success
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
      // Mocking edit success
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
        const waText = `*${data.subject}*\n\n${data.message}`;
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
}));
