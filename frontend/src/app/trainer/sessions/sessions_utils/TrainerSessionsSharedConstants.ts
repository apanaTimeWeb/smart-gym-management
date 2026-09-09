// RESPONSIBILITY: Centralized constants for the Trainer Sessions module.
// Move mock data here so it can be replaced by a single API call tomorrow.

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

/** Dev-only fallback — replace with API call before production */
export const MOCK_SESSIONS: TrainerSession[] = [
  { id: '1', title: 'Morning HIIT', type: 'Group', time: '07:00 AM', duration: '45m', status: 'Completed', attendees: 12, maxAttendees: 15, isOnline: false, enrolledMembers: [{id: 'm1', name: 'John Doe'}, {id: 'm2', name: 'Jane Smith'}] },
  { id: '2', title: 'PT with Rahul', type: 'PT', time: '09:00 AM', duration: '60m', status: 'Completed', attendees: 1, member: 'Rahul Sharma', isOnline: true, enrolledMembers: [{id: 'm3', name: 'Rahul Sharma'}] },
  { id: '3', title: 'Strength Training', type: 'PT', time: '11:30 AM', duration: '60m', status: 'Upcoming', attendees: 1, member: 'Priya Patel', isOnline: true, enrolledMembers: [{id: 'm4', name: 'Priya Patel'}] },
  { id: '4', title: 'Evening Yoga', type: 'Group', time: '06:00 PM', duration: '60m', status: 'Upcoming', attendees: 8, maxAttendees: 20, isOnline: true, enrolledMembers: [{id: 'm5', name: 'Amit Kumar'}, {id: 'm6', name: 'Sara Khan'}, {id: 'm7', name: 'Vikram Singh'}] },
  { id: '5', title: 'PT with Amit', type: 'PT', time: '07:30 PM', duration: '45m', status: 'Cancelled', attendees: 0, member: 'Amit Kumar', isOnline: false },
];

export const MOCK_MEMBERS_FOR_SCHEDULE = [
  { id: '1', name: 'Rahul Sharma' },
  { id: '2', name: 'Priya Patel' },
  { id: '3', name: 'Amit Kumar' },
];

export const DURATION_OPTIONS = [
  { value: '30m', label: '30 Minutes' },
  { value: '45m', label: '45 Minutes' },
  { value: '60m', label: '60 Minutes' },
];
