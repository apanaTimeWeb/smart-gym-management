import { create } from 'zustand';
import type { CommSegment, CommChannel } from '@/app/frontend_manager/manager_communications/manager_communications_types/ManagerCommunicationsTypes';


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

/**
 * @description Coordinates communications feature state and its documented UI/API boundary through useManagerCommunicationsStore.
 * @dependencies Uses ManagerCommunicationsTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerCommunicationsStore owns the communications feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
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
