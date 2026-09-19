'use client';
/** Coordinates the Manager / feature. */
import { create } from 'zustand';
import type { ManagerToastType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes';
import { EMPTY_ATTENDANCE_FORM, type AttendanceFormValues } from '@/app/manager/attendance/attendance_types/ManagerAttendanceFormTypes';
import type { AttendanceTab } from '@/app/manager/attendance/attendance_utils/ManagerAttendanceSharedConstants';

import type { ManagerAttendancePersonType } from '@/app/manager/attendance/attendance_types/ManagerAttendanceTypes';

type CalendarUser = { id: string; name: string; type: ManagerAttendancePersonType } | null;

interface ManagerAttendanceUiState {
  toast: { message: string; type: ManagerToastType } | null;
  saving: boolean;
  showModal: boolean;
  calendarUser: CalendarUser;
  form: AttendanceFormValues;
  setToast: (toast: { message: string; type: ManagerToastType } | null) => void;
  setSaving: (saving: boolean) => void;
  setShowModal: (show: boolean) => void;
  setCalendarUser: (user: CalendarUser) => void;
  setForm: (form: AttendanceFormValues | ((previous: AttendanceFormValues) => AttendanceFormValues)) => void;
  showToast: (message: string, type: ManagerToastType) => void;
  hideToast: () => void;
  resetForAdd: () => void;
}

export const useManagerAttendanceUiStore = create<ManagerAttendanceUiState>((set) => ({
  toast: null,
  saving: false,
  showModal: false,
  calendarUser: null,
  form: EMPTY_ATTENDANCE_FORM,
  setToast: (toast) => set({ toast }),
  setSaving: (saving) => set({ saving }),
  setShowModal: (showModal) => set({ showModal }),
  setCalendarUser: (calendarUser) => set({ calendarUser }),
  setForm: (form) => set((state) => ({ form: typeof form === 'function' ? form(state.form) : form })),
  showToast: (message, type) => set({ toast: { message, type } }),
  hideToast: () => set({ toast: null }),
  resetForAdd: () => set({ form: EMPTY_ATTENDANCE_FORM, calendarUser: null, showModal: true }) }));

export type { AttendanceTab };
