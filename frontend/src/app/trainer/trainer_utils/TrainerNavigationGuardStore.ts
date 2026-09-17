'use client';
// RESPONSIBILITY: Owns only the Trainer shell's module-scoped dirty-form registry used to protect in-app navigation.
import { create } from 'zustand';

interface TrainerNavigationGuardStoreState {
  dirtySources: Record<string, true>;
  setSourceDirty: (sourceId: string, isDirty: boolean) => void;
  hasDirtySources: () => boolean;
}

export const useTrainerNavigationGuardStore = create<TrainerNavigationGuardStoreState>((set, get) => ({
  dirtySources: {},
  setSourceDirty: (sourceId, isDirty) => set((state) => {
    const next = { ...state.dirtySources };
    if (isDirty) next[sourceId] = true;
    else delete next[sourceId];
    return { dirtySources: next };
  }),
  hasDirtySources: () => Object.keys(get().dirtySources).length > 0,
}));
