import type { Member, Staff } from '@/lib/api';
import type { ToastType } from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import type { AttendanceTab, EMPTY_ATTENDANCE_FORM } from '@/app/erp/attendance/attendance_utils/AttendanceSharedConstants';

export interface AttendanceContextType {
 records: Attendance[];
 todayStats: { totalCheckIns: number; memberCheckIns: number; staffCheckIns: number };
 members: Member[];
 staff: Staff[];
 loading: boolean;
 saving: boolean;
 toast: { message: string; type: ToastType } | null;
 
  tab: AttendanceTab;
  setTab: (t: AttendanceTab) => void;
  
  search: string;
  setSearch: (s: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
 
 showModal: boolean;
 setShowModal: (show: boolean) => void;
 
 form: typeof EMPTY_ATTENDANCE_FORM;
 setForm: React.Dispatch<React.SetStateAction<typeof EMPTY_ATTENDANCE_FORM>>;
 
 showToast: (msg: string, t: ToastType) => void;
 hideToast: () => void;
 
 loadAll: () => Promise<void>;
 markAttendance: (e: React.FormEvent) => Promise<void>;
}

export interface Attendance {
  id: number; memberId?: number; staffId?: number;
  date: string; checkIn?: string; checkOut?: string; type: string;
  member?: { name: string }; staff?: { name: string };
}
