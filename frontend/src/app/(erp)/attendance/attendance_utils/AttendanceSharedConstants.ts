export const formatDate = (d: string) => 
  new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

export const formatTime = (d?: string) => 
  d ? new Date(d).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '—';

export const ATTENDANCE_TABLE_HEADERS = [
  'Name', 'Type', 'Date', 'Check In', 'Check Out'
];

export const ATTENDANCE_TABS = ['All', 'Members', 'Staff'] as const;
export type AttendanceTab = typeof ATTENDANCE_TABS[number];

export const EMPTY_ATTENDANCE_FORM = { 
  type: 'MEMBER', 
  memberId: '', 
  staffId: '', 
  date: new Date().toISOString().split('T')[0], 
  checkIn: '06:00' 
};
