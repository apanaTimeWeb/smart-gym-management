/**
 * RESPONSIBILITY: Zustand store that manages all async data, UI state (modals, search), and actions for the Gyms module.
 * DATA FLOW: API (superadminApi) <-> useGymsStore.ts <-> UI Components (GymsTable, GymEditModal, etc.)
 * 
 * Split into slices (gyms_ui_slice and gyms_data_slice) to comply with the 180-line maximum rule.
 */

// DATA FLOW: Component -> useGymsStore.ts -> API/Store
import { create } from 'zustand';
import { GymsUISlice, createGymsUISlice } from '@/app/superadmin/gyms/gyms_store/gyms_ui_slice';
import { GymsDataSlice, createGymsDataSlice } from '@/app/superadmin/gyms/gyms_store/gyms_data_slice';

export type GymsState = GymsUISlice & GymsDataSlice;

export const useGymsStore = create<GymsState>((...a) => ({
  ...createGymsUISlice(...a),
  ...createGymsDataSlice(...a),
}));
