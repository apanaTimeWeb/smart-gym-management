// RESPONSIBILITY: Provides feature-owned mutable/read mock behavior for earnings queries and server-side ledger filters.
import { env } from '@/config/env';

import { http, HttpResponse, delay } from 'msw';

import { TRAINER_EARNINGS_MOCK_EARNINGS_DATA } from '@/app/frontend_trainer/trainer_earnings/trainer_earnings_mocks/trainer_earnings_fixtures/TrainerEarningsMockData';

import { TRAINER_EARNINGS_URLS } from '@/app/frontend_trainer/trainer_earnings/trainer_earnings_url_config';

const BASE = env.NEXT_PUBLIC_API_URL;

export const TrainerEarningsMockHandlers = [
  http.get(`${BASE}${TRAINER_EARNINGS_URLS.API.DATA}`, async ({ request }) => {
    await delay(600);
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.trim().toLowerCase() ?? '';
    const startDate = url.searchParams.get('startDate') ?? '';
    const endDate = url.searchParams.get('endDate') ?? '';
    const page = Math.max(1, Number(url.searchParams.get('page') ?? '1'));
    const limit = Math.max(1, Number(url.searchParams.get('limit') ?? '10'));
    const sortBy = url.searchParams.get('sortBy') ?? 'date';
    const sortDirection = url.searchParams.get('sortDirection') === 'asc' ? 'asc' : 'desc';

    const filteredHistory = TRAINER_EARNINGS_MOCK_EARNINGS_DATA.history.filter((row) => {
      const matchesSearch = !search || row.description.toLowerCase().includes(search);
      const matchesStart = !startDate || row.date >= startDate;
      const matchesEnd = !endDate || row.date <= endDate;
      return matchesSearch && matchesStart && matchesEnd;
    });

    const sortedHistory = [...filteredHistory].sort((left, right) => {
      const leftValue = left[sortBy as keyof typeof left];
      const rightValue = right[sortBy as keyof typeof right];
      const leftKey = typeof leftValue === 'string' ? leftValue.toLowerCase() : Number(leftValue ?? 0);
      const rightKey = typeof rightValue === 'string' ? rightValue.toLowerCase() : Number(rightValue ?? 0);
      const comparison = leftKey < rightKey ? -1 : leftKey > rightKey ? 1 : 0;
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    const offset = (page - 1) * limit;
    const history = sortedHistory.slice(offset, offset + limit);
    return HttpResponse.json({
      success: true,
      message: 'Earnings data fetched successfully',
      data: {
        ...TRAINER_EARNINGS_MOCK_EARNINGS_DATA,
        history,
        historyTotal: filteredHistory.length,
        historyPage: page,
        historyLimit: limit,
      },
    });
  }),
];
