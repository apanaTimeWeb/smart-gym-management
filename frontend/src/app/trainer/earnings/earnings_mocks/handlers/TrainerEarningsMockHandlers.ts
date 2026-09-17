import { http, HttpResponse, delay } from 'msw';
import { env } from '@/config/env';
import { MOCK_EARNINGS_DATA } from '@/app/trainer/earnings/earnings_fixtures/TrainerEarningsMockData';

const BASE = env.NEXT_PUBLIC_API_URL;

export const trainerEarningsHandlers = [
  http.get(`${BASE}/trainer/earnings`, async () => {
    await delay(600);
    return HttpResponse.json({ success: true, message: 'Earnings data fetched successfully', data: MOCK_EARNINGS_DATA });
  }),
];
