import { create } from 'zustand';

interface TrainerEarningsStore {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  search: string;
  setSearch: (search: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
}

export const useTrainerEarningsStore = create<TrainerEarningsStore>((set) => ({
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  search: '',
  setSearch: (search) => set({ search }),
  startDate: '',
  setStartDate: (date) => set({ startDate: date }),
  endDate: '',
  setEndDate: (date) => set({ endDate: date }),
}));
