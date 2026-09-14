import { http, HttpResponse, delay } from 'msw';
import { env } from '@/config/env';
import { MOCK_EARNINGS_DATA } from '@/app/trainer/earnings/earnings_fixtures/TrainerEarningsMockData';

const BASE = env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const trainerEarningsHandlers = [
  http.get(`${BASE}/trainer/earnings`, async () => {
    await delay(600);
    return HttpResponse.json(MOCK_EARNINGS_DATA);
  })
];
