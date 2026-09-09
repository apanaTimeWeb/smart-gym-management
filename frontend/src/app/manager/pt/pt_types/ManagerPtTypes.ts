// RESPONSIBILITY: TypeScript types for the Manager PT (Personal Training) module.
// CRITICAL additions: PtSessionLog interface, sessionsRemaining, nextSessionDate,
// paymentStatus, amountPaid, totalAmount on PtAssignment — needed for PT revenue tracking.

export type PtSessionStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'MISSED';
export type PtPaymentStatus = 'PAID' | 'PARTIAL' | 'PENDING';
export type PtFetchState = 'idle' | 'loading' | 'success' | 'error';
export type PtActiveTab = 'dashboard' | 'assignments' | 'packages' | 'workload';

export interface PtPackage {
  id: string;
  name: string;
  sessionCount: number;
  durationDays: number;
  price: number;
  description: string;
}

// CRITICAL — PtSessionLog was entirely missing. PT revenue tracking impossible without this.
export interface PtSessionLog {
  id: string;
  assignmentId: string;
  sessionDate: string;
  status: PtSessionStatus;
  trainerNotes?: string;
  memberFeedback?: string;
  sessionNumber: number;   // 1-based index within the package (e.g. "Session 3 of 10")
  durationMinutes?: number;
  location?: string;
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
  // CRITICAL — missing fields that make PT revenue tracking impossible
  sessionsRemaining: number;
  nextSessionDate?: string;
  paymentStatus: PtPaymentStatus;
  amountPaid: number;
  totalAmount: number;
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

export const PT_TAB_OPTIONS: { id: PtActiveTab; label: string }[] = [
  { id: 'dashboard', label: 'PT Dashboard' },
  { id: 'assignments', label: 'Active Assignments' },
  { id: 'workload', label: 'Trainer Workload' },
  { id: 'packages', label: 'PT Packages' },
];
