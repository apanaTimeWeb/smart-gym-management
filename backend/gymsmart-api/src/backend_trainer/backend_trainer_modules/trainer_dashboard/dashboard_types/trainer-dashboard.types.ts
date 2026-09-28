// RESPONSIBILITY: Defines isolated Trainer Dashboard widget contracts consumed by the frontend.
// FLOW: Widget repository → widget service → controller → canonical API response.

export interface DashboardKpis {
  todaysSessions: number;
  completedSessions: number;
  pendingSessions: number;
  myMembersCount: number;
  todaysAttendance: number;
  pendingWorkoutPlans: number;
  memberGoalCompletionRate: number;
}

export interface DashboardTrendPoint { month: string; rate: number; }
export interface DashboardRecentMemberProgress { id: string; name: string; detail: string; time: string; }
export interface DashboardUpcomingSession { id: string; name: string; time: string; type: string; }
export interface DashboardPlanDistribution { plan: string; count: number; }

export interface DashboardInterfaces extends DashboardKpis {
  goalCompletionTrend?: DashboardTrendPoint[];
  recentMemberProgress: DashboardRecentMemberProgress[];
  upcomingSessions: DashboardUpcomingSession[];
  membersByPlan?: DashboardPlanDistribution[];
}
