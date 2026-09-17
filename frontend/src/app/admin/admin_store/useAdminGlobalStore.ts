// RESPONSIBILITY: Core data logic hook for the admin module.
// DATA FLOW: Centralized store/hook logic mapping API mutations and query state to UI props.
import { create } from 'zustand';



interface AdminGlobalState {
  selectedBranchId: string; // 'all' means aggregate view
  setSelectedBranchId: (id: string) => void;
}

export const useAdminGlobalStore = create<AdminGlobalState>((set) => ({
  selectedBranchId: 'all',
  setSelectedBranchId: (id) => set({ selectedBranchId: id }),
}));

