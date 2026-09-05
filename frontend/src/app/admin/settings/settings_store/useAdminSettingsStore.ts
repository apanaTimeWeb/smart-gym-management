import { create } from 'zustand';
import { EMPTY_SETTINGS_FORM } from '@/app/admin/settings/settings_utils/AdminSettingsSharedConstants';

interface AdminSettingsStore {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  form: typeof EMPTY_SETTINGS_FORM;
  setForm: (form: typeof EMPTY_SETTINGS_FORM) => void;
}

export const useAdminSettingsStore = create<AdminSettingsStore>((set) => ({
  activeTab: 'Gym Profile',
  setActiveTab: (tab) => set({ activeTab: tab }),
  form: EMPTY_SETTINGS_FORM,
  setForm: (form) => set({ form }),
}));
