// RESPONSIBILITY: Module-level Zustand store for shared Trainer UI state.
// Holds state shared across 2+ trainer modules (e.g. selected member, active modal).
// Module-specific stores stay inside their own _store/ folders.
// DATA FLOW: TrainerLayout → useTrainerGlobalStore → child modules

import { create } from 'zustand';

interface TrainerGlobalState {
  /** ID of the member currently selected/viewed across trainer modules */
  selectedMemberId: string | null;
  setSelectedMemberId: (id: string | null) => void;
}

export const useTrainerGlobalStore = create<TrainerGlobalState>((set) => ({
  selectedMemberId: null,
  setSelectedMemberId: (id) => set({ selectedMemberId: id }),
}));
