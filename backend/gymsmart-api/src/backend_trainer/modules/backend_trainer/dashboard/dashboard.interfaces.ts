// RESPONSIBILITY: Defines the exact Trainer Dashboard response contract consumed by the frontend.
// FLOW: DashboardRepository aggregate → DashboardStatsService → DashboardInterfaces → ApiResponse.

export interface DashboardTrendPoint {
  month: string;
  rate: number;
}

export interface DashboardRecentMemberProgress {
  id: string;
  name: string;
  detail: string;
  time: string;
}

export interface DashboardUpcomingSession {
  id: string;
  name: string;
  time: string;
  type: string;
}

export interface DashboardPlanDistribution {
  plan: string;
  count: number;
}

export interface DashboardRecentMember {
  id: string;
  name: string;
  plan: string;
  status: string;
  joinDate: string;
}

export interface DashboardTrainerProfile {
  id?: string;
  name?: string;
  shiftStart?: string;
  shiftEnd?: string;
}

export interface DashboardInterfaces {
  todaysSessions: number;
  completedSessions: number;
  pendingSessions: number;
  myMembersCount: number;
  todaysAttendance: number;
  pendingWorkoutPlans: number;
  memberGoalCompletionRate: number;
  goalCompletionTrend: DashboardTrendPoint[];
  recentMemberProgress: DashboardRecentMemberProgress[];
  upcomingSessions: DashboardUpcomingSession[];
  membersByPlan: DashboardPlanDistribution[];
  recentMembers: DashboardRecentMember[];
  trainerProfile: DashboardTrainerProfile;
}
