import { create } from 'zustand';

export interface Branch {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'inactive';
  revenue: number;
  expenses: number;
  studentsCount: number;
  staffCount: number;
}

// Temporary mock data for branches
export const MOCK_BRANCHES: Branch[] = [
  { id: 'b1', name: 'Downtown Core', location: '123 Main St', status: 'active', revenue: 125000, expenses: 45000, studentsCount: 450, staffCount: 12 },
  { id: 'b2', name: 'Uptown Plaza', location: '456 North Ave', status: 'active', revenue: 85000, expenses: 32000, studentsCount: 320, staffCount: 8 },
  { id: 'b3', name: 'Westside Mall', location: '789 West Blvd', status: 'active', revenue: 150000, expenses: 55000, studentsCount: 600, staffCount: 15 },
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
