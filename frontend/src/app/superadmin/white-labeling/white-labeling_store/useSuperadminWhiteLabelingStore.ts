import { create } from 'zustand';

interface SuperadminWhiteLabelingState {
  searchQuery: string;
  statusFilter: 'all' | 'pending' | 'active' | 'failed';
  selectedDomainId: string | null;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (filter: 'all' | 'pending' | 'active' | 'failed') => void;
  setSelectedDomainId: (id: string | null) => void;
  reset: () => void;
}

export const useSuperadminWhiteLabelingStore = create<SuperadminWhiteLabelingState>((set) => ({
  searchQuery: '',
  statusFilter: 'all',
  selectedDomainId: null,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setStatusFilter: (filter) => set({ statusFilter: filter }),
  setSelectedDomainId: (id) => set({ selectedDomainId: id }),
  reset: () => set({ searchQuery: '', statusFilter: 'all', selectedDomainId: null }),
}));
