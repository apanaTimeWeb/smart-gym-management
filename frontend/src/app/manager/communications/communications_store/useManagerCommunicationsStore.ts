// RESPONSIBILITY: Zustand store for Communications module UI state — composer open/close, active tab, pagination.
import { create } from 'zustand';
import type { CommSegment, CommChannel } from '@/app/manager/communications/communications_types/communications_types';
import { EMPTY_COMM_FORM } from '@/app/manager/communications/communications_utils/ManagerCommunicationsSharedConstants';

export type CommActiveTab = 'compose' | 'history' | 'automations' | 'churn_recovery';

interface ManagerCommunicationsStore {
  activeTab: CommActiveTab;
  setActiveTab: (t: CommActiveTab) => void;

  // Composer state
  selectedSegment: CommSegment;
  setSelectedSegment: (s: CommSegment) => void;
  selectedChannel: CommChannel;
  setSelectedChannel: (c: CommChannel) => void;
  composerTitle: string;
  setComposerTitle: (t: string) => void;
  composerMessage: string;
  setComposerMessage: (m: string) => void;
  composerSubject: string;
  setComposerSubject: (s: string) => void;

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

  selectedSegment: EMPTY_COMM_FORM.segment,
  setSelectedSegment: (s) => set({ selectedSegment: s }),
  selectedChannel: EMPTY_COMM_FORM.channel,
  setSelectedChannel: (c) => set({ selectedChannel: c }),
  composerTitle: EMPTY_COMM_FORM.title,
  setComposerTitle: (t) => set({ composerTitle: t }),
  composerMessage: EMPTY_COMM_FORM.message,
  setComposerMessage: (m) => set({ composerMessage: m }),
  composerSubject: EMPTY_COMM_FORM.subject,
  setComposerSubject: (s) => set({ composerSubject: s }),

  historySearch: '',
  setHistorySearch: (s) => set({ historySearch: s, currentPage: 1 }),
  historyChannelFilter: 'all',
  setHistoryChannelFilter: (c) => set({ historyChannelFilter: c, currentPage: 1 }),
  currentPage: 1,
  setCurrentPage: (p) => set({ currentPage: p }),

  resetComposer: () => set({
    composerTitle: EMPTY_COMM_FORM.title,
    composerMessage: EMPTY_COMM_FORM.message,
    composerSubject: EMPTY_COMM_FORM.subject,
    selectedSegment: EMPTY_COMM_FORM.segment,
    selectedChannel: EMPTY_COMM_FORM.channel,
  }),

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
