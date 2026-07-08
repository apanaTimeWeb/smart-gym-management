"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { attendanceApi, membersApi, hrApi, type Attendance, type Member, type Staff } from '@/lib/api';
import type { ToastType } from '@/app/(erp)/erp_components/ErpToast';
import { EMPTY_ATTENDANCE_FORM, type AttendanceTab } from '../attendance_utils/AttendanceSharedConstants';

interface AttendanceContextType {
  records: Attendance[];
  todayStats: { totalCheckIns: number; memberCheckIns: number; staffCheckIns: number };
  members: Member[];
  staff: Staff[];
  loading: boolean;
  saving: boolean;
  toast: { message: string; type: ToastType } | null;
  
  tab: AttendanceTab;
  setTab: (t: AttendanceTab) => void;
  
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  
  form: typeof EMPTY_ATTENDANCE_FORM;
  setForm: React.Dispatch<React.SetStateAction<typeof EMPTY_ATTENDANCE_FORM>>;
  
  showToast: (msg: string, t: ToastType) => void;
  hideToast: () => void;
  
  loadAll: () => Promise<void>;
  markAttendance: (e: React.FormEvent) => Promise<void>;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export function AttendanceProvider({ children }: { children: React.ReactNode }) {
  const [records, setRecords] = useState<Attendance[]>([]);
  const [todayStats, setTodayStats] = useState({ totalCheckIns: 0, memberCheckIns: 0, staffCheckIns: 0 });
  const [members, setMembers] = useState<Member[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  
  const [tab, setTab] = useState<AttendanceTab>('All');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_ATTENDANCE_FORM);

  const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
  const hideToast = useCallback(() => setToast(null), []);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [attRes, statsRes, memRes, staffRes] = await Promise.all([
        attendanceApi.getAll(),
        attendanceApi.getTodayStats(),
        membersApi.getAll({ limit: '200' }),
        hrApi.getStaff(),
      ]);
      setRecords(attRes.data);
      setTodayStats(statsRes.data);
      setMembers(memRes.data.members);
      setStaff(staffRes.data);
    } catch (e) { 
      showToast((e as Error).message, 'error'); 
    } finally { 
      setLoading(false); 
    }
  }, [showToast]);

  useEffect(() => { loadAll(); }, [loadAll]);

  const markAttendance = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const dateTime = new Date(`${form.date}T${form.checkIn}:00`);
      const payload: any = { type: form.type, date: dateTime.toISOString(), checkIn: dateTime.toISOString() };
      
      if (form.type === 'MEMBER') {
        payload.memberId = Number(form.memberId);
      } else {
        payload.staffId = Number(form.staffId);
      }
      
      await attendanceApi.mark(payload);
      showToast('Attendance marked!', 'success');
      setShowModal(false);
      setForm(EMPTY_ATTENDANCE_FORM);
      await loadAll();
    } catch (err) { 
      showToast((err as Error).message, 'error'); 
    } finally { 
      setSaving(false); 
    }
  }, [form, loadAll, showToast]);

  const value = useMemo(() => ({
    records, todayStats, members, staff,
    loading, saving, toast,
    tab, setTab,
    showModal, setShowModal,
    form, setForm,
    showToast, hideToast,
    loadAll, markAttendance
  }), [
    records, todayStats, members, staff, loading, saving, toast,
    tab, showModal, form, showToast, hideToast, loadAll, markAttendance
  ]);

  return (
    <AttendanceContext.Provider value={value}>
      {children}
    </AttendanceContext.Provider>
  );
}

export function useAttendanceContext() {
  const context = useContext(AttendanceContext);
  if (context === undefined) {
    throw new Error('useAttendanceContext must be used within an AttendanceProvider');
  }
  return context;
}
