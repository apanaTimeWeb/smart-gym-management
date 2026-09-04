"use client";
// RESPONSIBILITY: State management for the Admin Attendance module.
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { adminAttendanceApi } from "@/app/admin/attendance/attendance_api/admin_attendance_api";
import type { AdminAttendanceRecord, AdminAttendanceStats, AttendanceFilter } from "@/app/admin/attendance/attendance_types/admin_attendance_types";
import { logger } from "@/lib/logger";
import toast from "react-hot-toast";

interface AdminAttendanceContextType {
  records: AdminAttendanceRecord[];
  stats: AdminAttendanceStats | null;
  loading: boolean;
  filter: AttendanceFilter;
  setFilter: (f: AttendanceFilter) => void;
  showModal: boolean;
  setShowModal: (v: boolean) => void;
  markAttendance: (data: unknown) => Promise<void>;
  refresh: () => void;
}
const AdminAttendanceContext = createContext<AdminAttendanceContextType | null>(null);

export function AdminAttendanceProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<AdminAttendanceRecord[]>([]);
  const [stats, setStats] = useState<AdminAttendanceStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<AttendanceFilter>("all");
  const [showModal, setShowModal] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [rec, st] = await Promise.all([adminAttendanceApi.getAll(), adminAttendanceApi.getStats()]);
      if (rec.success) setRecords(rec.data.records);
      if (st.success) setStats(st.data);
    } catch (e) { logger.error("[AdminAttendance] load failed:", e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const markAttendance = async (data: unknown) => {
    try { await adminAttendanceApi.mark(data); toast.success("Attendance marked"); setShowModal(false); void load(); }
    catch (e) { logger.error("[AdminAttendance] mark failed:", e); }
  };

  return (
    <AdminAttendanceContext.Provider value={{ records, stats, loading, filter, setFilter, showModal, setShowModal, markAttendance, refresh: load }}>
      {children}
    </AdminAttendanceContext.Provider>
  );
}
export function useAdminAttendanceContext() {
  const ctx = useContext(AdminAttendanceContext);
  if (!ctx) throw new Error("useAdminAttendanceContext must be within AdminAttendanceProvider");
  return ctx;
}
