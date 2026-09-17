import { http, HttpResponse, delay } from 'msw';
import { env } from '@/config/env';
import { MOCK_DASHBOARD_STATS } from '@/app/trainer/dashboard/dashboard_fixtures/TrainerDashboardMockData';

const BASE = env.NEXT_PUBLIC_API_URL;

export const trainerDashboardHandlers = [
  http.get(`${BASE}/trainer/dashboard/stats`, async () => {
    await delay(600);
    return HttpResponse.json({ success: true, message: 'Dashboard data fetched successfully', data: MOCK_DASHBOARD_STATS });
  }),
];
