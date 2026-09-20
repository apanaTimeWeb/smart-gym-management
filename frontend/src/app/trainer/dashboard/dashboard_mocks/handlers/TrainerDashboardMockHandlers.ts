import { http, HttpResponse, delay } from 'msw';
import { env } from '@/config/env';
import { MOCK_DASHBOARD_STATS } from '@/app/trainer/dashboard/dashboard_fixtures/TrainerDashboardMockData';
import { DashboardUrlConfig } from '@/app/trainer/dashboard/dashboard_url_config';

const BASE = env.NEXT_PUBLIC_API_URL;

export const trainerDashboardHandlers = [
  http.get(`${BASE}${DashboardUrlConfig.BACKEND_API.STATS}`, async ({ request }) => {
    await delay(600);
    const url = new URL(request.url);
    const range = url.searchParams.get('range') ?? 'this_month';
    const adjustments: Record<string, number> = { this_month: 1, last_month: 0.92, last_3_months: 1.08, last_6_months: 1.15, this_year: 1.25, custom: 0.96 };
    const factor = adjustments[range] ?? 1;
    const data = {
      ...MOCK_DASHBOARD_STATS,
      todaysSessions: Math.max(0, Math.round(MOCK_DASHBOARD_STATS.todaysSessions * factor)),
      completedSessions: Math.max(0, Math.round(MOCK_DASHBOARD_STATS.completedSessions * factor)),
      pendingSessions: Math.max(0, Math.round(MOCK_DASHBOARD_STATS.pendingSessions * factor)),
      myMembersCount: Math.max(0, Math.round(MOCK_DASHBOARD_STATS.myMembersCount * factor)),
      todaysAttendance: Math.max(0, Math.round(MOCK_DASHBOARD_STATS.todaysAttendance * factor)),
      memberGoalCompletionRate: Math.min(100, Math.max(0, Math.round(MOCK_DASHBOARD_STATS.memberGoalCompletionRate * factor))),
    };
    return HttpResponse.json({ success: true, message: 'Dashboard data fetched successfully', data });
  }),
];
