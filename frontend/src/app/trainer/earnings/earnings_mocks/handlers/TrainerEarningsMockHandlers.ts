// RESPONSIBILITY: Provides feature-owned mutable/read mock behavior for earnings queries and server-side ledger filters.
import { http, HttpResponse, delay } from 'msw';
import { env } from '@/config/env';
import { MOCK_EARNINGS_DATA } from '@/app/trainer/earnings/earnings_fixtures/TrainerEarningsMockData';
import { EarningsUrlConfig } from '@/app/trainer/earnings/earnings_url_config';

const BASE = env.NEXT_PUBLIC_API_URL;

export const trainerEarningsHandlers = [
  http.get(`${BASE}${EarningsUrlConfig.BACKEND_API.DATA}`, async ({ request }) => {
    await delay(600);
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.trim().toLowerCase() ?? '';
    const startDate = url.searchParams.get('startDate') ?? '';
    const endDate = url.searchParams.get('endDate') ?? '';
    const page = Math.max(1, Number(url.searchParams.get('page') ?? '1'));
    const limit = Math.max(1, Number(url.searchParams.get('limit') ?? '10'));

    const filteredHistory = MOCK_EARNINGS_DATA.history.filter((row) => {
      const matchesSearch = !search || row.description.toLowerCase().includes(search);
      const matchesStart = !startDate || row.date >= startDate;
      const matchesEnd = !endDate || row.date <= endDate;
      return matchesSearch && matchesStart && matchesEnd;
    });

    const offset = (page - 1) * limit;
    const history = filteredHistory.slice(offset, offset + limit);
    return HttpResponse.json({
      success: true,
      message: 'Earnings data fetched successfully',
      data: {
        ...MOCK_EARNINGS_DATA,
        history,
        historyTotal: filteredHistory.length,
        historyPage: page,
        historyLimit: limit,
      },
    });
  }),
];
