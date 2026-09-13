// RESPONSIBILITY: Zod schemas and TypeScript types for the Trainer Dashboard module.
import { z } from 'zod';

export type FetchState = 'idle' | 'loading' | 'success' | 'error';
export type TimeRange = 'weekly' | 'monthly' | 'yearly' | 'custom';

export const TrainerProfileSummarySchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  shiftStart: z.string().optional(),
  shiftEnd: z.string().optional(),
  rating: z.number().optional(),
});
export type TrainerProfileSummary = z.infer<typeof TrainerProfileSummarySchema>;

export const RecentMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  plan: z.union([z.string(), z.object({ name: z.string() })]),
  status: z.string(),
  joinDate: z.string(),
  paidAmount: z.number(),
});
export type RecentMember = z.infer<typeof RecentMemberSchema>;

export const DashboardStatsSchema = z.object({
  todaysSessions: z.number(),
  completedSessions: z.number(),
  pendingSessions: z.number(),
  myMembersCount: z.number(),
  todaysAttendance: z.number(),
  pendingWorkoutPlans: z.number(),
  monthlyEarnings: z.number(),
  memberGoalCompletionRate: z.number(),
  goalCompletionTrend: z.array(z.object({ month: z.string(), rate: z.number() })).optional(),
  recentMemberProgress: z.array(z.object({ id: z.string(), name: z.string(), detail: z.string(), time: z.string() })),
  upcomingSessions: z.array(z.object({ id: z.string(), name: z.string(), time: z.string(), type: z.string() })),
  membersByPlan: z.array(z.object({ plan: z.string(), count: z.number() })).optional(),
  recentMembers: z.array(RecentMemberSchema).optional(),
  trainerProfile: TrainerProfileSummarySchema.optional(),
  totalPTRevenue: z.number().optional(),
  weeklySessionsCompleted: z.number().optional(),
  avgSessionRating: z.number().optional(),
  activeClientsCount: z.number().optional(),
  attendanceRate: z.number().optional(),
  nextSessionTime: z.string().optional(),
});
export type DashboardStats = z.infer<typeof DashboardStatsSchema>;
