// RESPONSIBILITY: TypeScript types for the Manager PT (Personal Training) module.

export type PtSessionStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'MISSED';

export interface PtPackage {
  id: string;
  name: string;
  sessionCount: number;
  durationDays: number;
  price: number;
  description: string;
}

export interface PtAssignment {
  id: string;
  memberId: string;
  memberName: string;
  trainerId: string;
  trainerName: string;
  packageId: string;
  packageName: string;
  totalSessions: number;
  completedSessions: number;
  startDate: string;
  endDate: string;
}

export interface CreatePtAssignmentPayload {
  memberId: string;
  trainerId: string;
  packageId: string;
  startDate: string;
}

export type PtActiveTab = 'packages' | 'schedule' | 'assign' | 'track';
export type PtFetchState = 'idle' | 'loading' | 'success' | 'error';

export const PT_TAB_OPTIONS: { id: PtActiveTab; label: string }[] = [
  { id: 'packages', label: 'View PT Packages' },
  { id: 'schedule', label: 'Schedule Sessions' },
  { id: 'assign', label: 'Assign Trainer' },
  { id: 'track', label: 'Track Progress' },
];
