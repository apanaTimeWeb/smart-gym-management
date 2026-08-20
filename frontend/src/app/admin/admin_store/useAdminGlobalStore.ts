import { create } from 'zustand';

export interface Branch {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'inactive';
}

// Temporary mock data for branches
export const MOCK_BRANCHES: Branch[] = [
  { id: 'b1', name: 'Downtown Core', location: '123 Main St', status: 'active' },
  { id: 'b2', name: 'Uptown Plaza', location: '456 North Ave', status: 'active' },
  { id: 'b3', name: 'Westside Mall', location: '789 West Blvd', status: 'active' },
];

interface AdminGlobalState {
  selectedBranchId: string; // 'all' means aggregate view
  setSelectedBranchId: (id: string) => void;
  
  branches: Branch[];
  setBranches: (branches: Branch[]) => void;
}

export const useAdminGlobalStore = create<AdminGlobalState>((set) => ({
  selectedBranchId: 'all',
  setSelectedBranchId: (id) => set({ selectedBranchId: id }),
  
  branches: MOCK_BRANCHES,
  setBranches: (branches) => set({ branches }),
}));
