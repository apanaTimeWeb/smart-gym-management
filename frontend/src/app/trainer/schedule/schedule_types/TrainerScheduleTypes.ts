// RESPONSIBILITY: Types for Trainer Schedule and Leave management.
export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface WeeklyAvailability {
  day: DayOfWeek;
  isAvailable: boolean;
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
}

export type LeaveStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type LeaveType = 'Sick Leave' | 'Casual Leave' | 'Emergency' | 'Personal' | 'Other';

export const LEAVE_TYPE_OPTIONS: LeaveType[] = ['Sick Leave', 'Casual Leave', 'Emergency', 'Personal', 'Other'];

export interface LeaveRequest {
  id: string;
  trainerId: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  reason: string;
  leaveType: LeaveType;
  status: LeaveStatus;
  managerNotes?: string;
  totalDays?: number;
  attachmentUrl?: string;
  approvedBy?: string;
  rejectedReason?: string;
  createdAt: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  type: string;
  isRecurring?: boolean;
  recurrenceRule?: string;
  meetingLink?: string;
}

export interface TrainerScheduleState {
  availability: WeeklyAvailability[];
  leaveRequests: LeaveRequest[];
  leaveBalance: number;
  fetchState: 'idle' | 'loading' | 'success' | 'error';
  saving: boolean;

  loadSchedule: () => Promise<void>;
  updateAvailability: (availability: WeeklyAvailability[]) => Promise<void>;
  requestLeave: (leave: Partial<LeaveRequest>) => Promise<void>;
}

export interface TrainerScheduleContextType {
  activeTab: 'availability' | 'leaves';
  setActiveTab: (tab: 'availability' | 'leaves') => void;
  showLeaveModal: boolean;
  setShowLeaveModal: (show: boolean) => void;
  toast: { message: string; type: 'success' | 'error' } | null;
  showToast: (msg: string, type: 'success' | 'error') => void;
  hideToast: () => void;
  openLeaveModal: () => void;
  submitLeave: (data: Partial<LeaveRequest>) => Promise<void>;
  saveAvailability: (data: WeeklyAvailability[]) => Promise<void>;
}
