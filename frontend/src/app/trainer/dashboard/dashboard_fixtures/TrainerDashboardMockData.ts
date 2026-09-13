// RESPONSIBILITY: Mock data for Trainer Dashboard to prevent 'undefined' crashes.
import type { DashboardStats } from '@/app/trainer/dashboard/dashboard_types/dashboard_types';

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  todaysSessions: 8,
  completedSessions: 5,
  pendingSessions: 3,
  myMembersCount: 42,
  todaysAttendance: 35,
  pendingWorkoutPlans: 4,
  monthlyEarnings: 15400,
  memberGoalCompletionRate: 78,
  goalCompletionTrend: [
    { month: 'Jan', rate: 65 },
    { month: 'Feb', rate: 70 },
    { month: 'Mar', rate: 78 },
  ],
  recentMemberProgress: [
    { id: '1', name: 'John Doe', detail: 'Hit new PR on Bench Press (100kg)', time: '2h ago' },
    { id: '2', name: 'Sarah Smith', detail: 'Completed 1-month consistency challenge', time: '5h ago' },
  ],
  upcomingSessions: [
    { id: '1', name: 'John Doe', time: '14:00', type: 'PT' },
    { id: '2', name: 'Evening HIIT', time: '18:00', type: 'Group' },
  ],
  membersByPlan: [
    { plan: 'Premium', count: 20 },
    { plan: 'Gold', count: 15 },
    { plan: 'Basic', count: 7 },
  ],
  recentMembers: [
    { id: '1', name: 'Alex Johnson', plan: 'Premium', status: 'ACTIVE', joinDate: '2023-10-12', paidAmount: 5000 },
    { id: '2', name: 'Maria Garcia', plan: 'Gold', status: 'ACTIVE', joinDate: '2023-10-10', paidAmount: 3500 },
    { id: '3', name: 'James Wilson', plan: 'Basic', status: 'PENDING', joinDate: '2023-10-09', paidAmount: 1500 },
  ],
  trainerProfile: {
    name: 'Michael Trainer',
    shiftStart: '06:00',
    shiftEnd: '14:00',
    rating: 4.8,
  },
  totalPTRevenue: 12000,
  weeklySessionsCompleted: 24,
  avgSessionRating: 4.9,
  activeClientsCount: 38,
  attendanceRate: 92,
  nextSessionTime: '14:00',
};
