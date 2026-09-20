// DATA FLOW: Inputs enter useSuperadminWhiteLabelingStore, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns UI-only White-labeling selection state. Search/filter state belongs to the URL.
'use client';
import { create } from 'zustand';

interface SuperadminWhiteLabelingState {
  selectedDomainId: string | null;
  setSelectedDomainId: (id: string | null) => void;
}

export const useSuperadminWhiteLabelingStore = create<SuperadminWhiteLabelingState>((set) => ({
  selectedDomainId: null,
  setSelectedDomainId: (selectedDomainId) => set({ selectedDomainId }),
}));
