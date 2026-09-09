// RESPONSIBILITY: Centralized constants for the Trainer Sessions module.
// DATA FLOW: Imported by useTrainerSessionsLogic and TrainerSessionsMain.

export type SessionType = 'PT' | 'Group';
export type SessionStatus = 'Upcoming' | 'Completed' | 'Cancelled';
export type SessionFilter = 'All' | 'PT' | 'Group';

export interface TrainerSession {
  id: string;
  title: string;
  type: SessionType;
  time: string;
  duration: string;
  status: SessionStatus;
  attendees: number;
  maxAttendees?: number;
  member?: string;
  isOnline: boolean;
  enrolledMembers?: { id: string; name: string }[];
  sessionNotes?: string;
  location?: string;
  room?: string;
}

export const SESSION_FILTER_OPTIONS: SessionFilter[] = ['All', 'PT', 'Group'];

export const SESSION_STATUS_STYLES: Record<SessionStatus, string> = {
  Completed: 'bg-success-bg text-success',
  Cancelled: 'bg-danger-bg text-danger',
  Upcoming: 'bg-warning-bg text-warning',
};

export const SESSION_TYPE_STYLES: Record<SessionType, string> = {
  PT: 'bg-info-bg text-info',
  Group: 'bg-purple-bg text-purple',
};

export const DURATION_OPTIONS = [
  { value: '30m', label: '30 Minutes' },
  { value: '45m', label: '45 Minutes' },
  { value: '60m', label: '60 Minutes' },
];

