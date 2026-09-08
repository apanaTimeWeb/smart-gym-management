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

export interface PtTrainerWorkload {
  trainerId: string;
  trainerName: string;
  activeClients: number;
  totalSessionsConducted: number;
  rating: number;
  status: 'Available' | 'Fully Booked';
}

export interface PtDashboardKpis {
  totalActiveAssignments: number;
  sessionsScheduledToday: number;
  packagesExpiringSoon: number;
  monthlyPtRevenue: number;
}

export interface CreatePtAssignmentPayload {
  memberId: string;
  trainerId: string;
  packageId: string;
  startDate: string;
}

export type PtActiveTab = 'dashboard' | 'assignments' | 'packages' | 'workload';
export type PtFetchState = 'idle' | 'loading' | 'success' | 'error';

export const PT_TAB_OPTIONS: { id: PtActiveTab; label: string }[] = [
  { id: 'dashboard', label: 'PT Dashboard' },
  { id: 'assignments', label: 'Active Assignments' },
  { id: 'workload', label: 'Trainer Workload' },
  { id: 'packages', label: 'PT Packages' },
];
