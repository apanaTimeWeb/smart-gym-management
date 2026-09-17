// DATA FLOW: Manager module state/API data → useManagerCommunicationsStore → owning Manager UI components.
// RESPONSIBILITY: Zustand store for Communications module UI state — composer open/close, active tab, pagination.
/** Manages UseCommunicationsStore for the Manager module. */
import { create } from 'zustand';
import type { CommSegment, CommChannel } from '@/app/manager/communications/communications_types/ManagerCommunications_types';

export type CommActiveTab = 'compose' | 'history' | 'automations' | 'churn_recovery';

interface ManagerCommunicationsStore {
  activeTab: CommActiveTab;
  setActiveTab: (t: CommActiveTab) => void;

  // Composer state
  selectedSegment: CommSegment;
  setSelectedSegment: (s: CommSegment) => void;
  selectedChannel: CommChannel;
  setSelectedChannel: (c: CommChannel) => void;

  // History filters
  historySearch: string;
  setHistorySearch: (s: string) => void;
  historyChannelFilter: string;
  setHistoryChannelFilter: (c: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;

  resetComposer: () => void;

  // Churn Recovery UI state
  churnSearch: string;
  setChurnSearch: (s: string) => void;
  churnReasonFilter: string;
  setChurnReasonFilter: (r: string) => void;
  churnCurrentPage: number;
  setChurnCurrentPage: (p: number) => void;
  isChurnComposerOpen: boolean;
  openChurnComposer: (memberId: string) => void;
  closeChurnComposer: () => void;
  selectedChurnedMemberId: string | null;
}

export const useManagerCommunicationsStore = create<ManagerCommunicationsStore>((set) => ({
  activeTab: 'compose',
  setActiveTab: (t) => set({ activeTab: t }),

  selectedSegment: 'expiring_7_days',
  setSelectedSegment: (s) => set({ selectedSegment: s }),
  selectedChannel: 'whatsapp',
  setSelectedChannel: (c) => set({ selectedChannel: c }),

  historySearch: '',
  setHistorySearch: (s) => set({ historySearch: s, currentPage: 1 }),
  historyChannelFilter: 'all',
  setHistoryChannelFilter: (c) => set({ historyChannelFilter: c, currentPage: 1 }),
  currentPage: 1,
  setCurrentPage: (p) => set({ currentPage: p }),

  resetComposer: () => set({ selectedSegment: 'expiring_7_days', selectedChannel: 'whatsapp' }),

  // Churn Recovery
  churnSearch: '',
  setChurnSearch: (s) => set({ churnSearch: s, churnCurrentPage: 1 }),
  churnReasonFilter: 'all',
  setChurnReasonFilter: (r) => set({ churnReasonFilter: r, churnCurrentPage: 1 }),
  churnCurrentPage: 1,
  setChurnCurrentPage: (p) => set({ churnCurrentPage: p }),
  isChurnComposerOpen: false,
  selectedChurnedMemberId: null,
  openChurnComposer: (memberId) => set({ isChurnComposerOpen: true, selectedChurnedMemberId: memberId }),
  closeChurnComposer: () => set({ isChurnComposerOpen: false, selectedChurnedMemberId: null }),
}));
