import { create } from 'zustand';

interface TrainerEarningsStore {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  search: string;
  setSearch: (search: string) => void;
}

export const useTrainerEarningsStore = create<TrainerEarningsStore>((set) => ({
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  search: '',
  setSearch: (search) => set({ search, currentPage: 1 }),
}));
