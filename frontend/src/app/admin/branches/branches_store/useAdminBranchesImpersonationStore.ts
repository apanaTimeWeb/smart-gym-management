// DATA FLOW: feature API/schema → hook/context → useAdminBranchesImpersonationStore consumers.
// RESPONSIBILITY: Zustand store for managing the "Login as Manager" branch impersonation session state.
import { create } from 'zustand';

export interface AdminBranchesImpersonatedBranch {
  id: string;
  name: string;
  location: string;
}

interface AdminBranchesImpersonationState {
  impersonatedBranch: AdminBranchesImpersonatedBranch | null;
  startImpersonation: (branch: AdminBranchesImpersonatedBranch) => void;
  stopImpersonation: () => void;
}

export const useAdminBranchesImpersonationStore = create<AdminBranchesImpersonationState>((set) => ({
  impersonatedBranch: null,
  startImpersonation: (branch) => set({ impersonatedBranch: branch }),
  stopImpersonation: () => set({ impersonatedBranch: null }),
}));
