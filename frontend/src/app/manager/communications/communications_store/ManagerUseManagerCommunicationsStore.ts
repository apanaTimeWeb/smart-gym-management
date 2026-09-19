// DATA FLOW: Manager Communications transient UI state → owning feature components.
// RESPONSIBILITY: Stores only composer selections and churn-composer visibility; URL owns navigation/filter state.
import { create } from 'zustand';
import type { CommSegment, CommChannel } from '@/app/manager/communications/communications_types/ManagerCommunications_types';

interface ManagerCommunicationsStore {
  selectedSegment: CommSegment;
  setSelectedSegment: (segment: CommSegment) => void;
  selectedChannel: CommChannel;
  setSelectedChannel: (channel: CommChannel) => void;
  resetComposer: () => void;
  isChurnComposerOpen: boolean;
  selectedChurnedMemberId: string | null;
  openChurnComposer: (memberId: string) => void;
  closeChurnComposer: () => void;
}

export const useManagerCommunicationsStore = create<ManagerCommunicationsStore>((set) => ({
  selectedSegment: 'expiring_7_days',
  setSelectedSegment: (selectedSegment) => set({ selectedSegment }),
  selectedChannel: 'whatsapp',
  setSelectedChannel: (selectedChannel) => set({ selectedChannel }),
  resetComposer: () => set({ selectedSegment: 'expiring_7_days', selectedChannel: 'whatsapp' }),
  isChurnComposerOpen: false,
  selectedChurnedMemberId: null,
  openChurnComposer: (memberId) => set({ isChurnComposerOpen: true, selectedChurnedMemberId: memberId }),
  closeChurnComposer: () => set({ isChurnComposerOpen: false, selectedChurnedMemberId: null }),
}));
