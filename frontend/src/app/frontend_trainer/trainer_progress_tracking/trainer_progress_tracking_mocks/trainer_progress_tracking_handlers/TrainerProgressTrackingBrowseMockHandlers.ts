import { env } from '@/config/env';

import { delay, http, HttpResponse } from 'msw';

import { TRAINER_PROGRESS_TRACKING_GOAL_STATUS } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_constants/TrainerProgressTrackingConstants';

import { TRAINER_PROGRESS_TRACKING_URLS } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_url_config';

import { getTrainerProgressTrackingMockProgress } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_mocks/trainer_progress_tracking_handlers/TrainerProgressTrackingMockState';

import { TRAINER_PROGRESS_TRACKING_MOCK_PROGRESS_MEMBERS } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_mocks/trainer_progress_tracking_fixtures/TrainerProgressTrackingMockData';

import type { TrainerProgressTrackingPaginationMeta, TrainerProgressTrackingProgressEntry } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_types/TrainerProgressTrackingTypes';

const BASE = env.NEXT_PUBLIC_API_URL;
const MOCK_DELAY_MS = 300;
const PROGRESS_DEFAULT_LIMIT = 10;

const response = <T,>(data: T, message: string, meta?: TrainerProgressTrackingPaginationMeta) =>
  HttpResponse.json({ success: true, message, data, ...(meta ? { meta } : {}) });

export const TrainerProgressTrackingBrowseMockHandlers = [
  http.get(`${BASE}${TRAINER_PROGRESS_TRACKING_URLS.API.MEMBERS}`, async () => {
    await delay(MOCK_DELAY_MS);
    return response(TRAINER_PROGRESS_TRACKING_MOCK_PROGRESS_MEMBERS, 'Progress members loaded.');
  }),

  http.get(`${BASE}${TRAINER_PROGRESS_TRACKING_URLS.API.ENTRIES(':memberId')}`, async ({ params, request }) => {
    await delay(MOCK_DELAY_MS);
    const url = new URL(request.url);
    const page = Math.max(1, Number(url.searchParams.get('page') ?? '1'));
    const limit = Math.max(1, Number(url.searchParams.get('limit') ?? String(PROGRESS_DEFAULT_LIMIT)));
    const sortBy = url.searchParams.get('sortBy') ?? 'date';
    const sortDirection = url.searchParams.get('sortDirection') === 'asc' ? 'asc' : 'desc';
    const filtered = getTrainerProgressTrackingMockProgress().filter((entry) => entry.memberId === params.memberId);
    filtered.sort((left, right) => {
      const leftValue = left[sortBy as keyof TrainerProgressTrackingProgressEntry];
      const rightValue = right[sortBy as keyof TrainerProgressTrackingProgressEntry];
      const comparison = String(leftValue ?? '').localeCompare(String(rightValue ?? ''), undefined, { numeric: true });
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const safePage = Math.min(page, totalPages);
    const entries = filtered.slice((safePage - 1) * limit, safePage * limit);
    return response({ entries, total, page: safePage, limit }, 'Progress entries loaded.', { total, page: safePage, limit, totalPages, hasNextPage: safePage < totalPages, hasPrevPage: safePage > 1 });
  }),

  http.get(`${BASE}${TRAINER_PROGRESS_TRACKING_URLS.API.SUMMARY(':memberId')}`, async ({ params }) => {
    await delay(MOCK_DELAY_MS);
    const entries = getTrainerProgressTrackingMockProgress().filter((entry) => entry.memberId === params.memberId).sort((a, b) => a.date.localeCompare(b.date));
    const firstEntry = entries[0] || null;
    const latestEntry = entries[entries.length - 1] || null;
    const summary = {
      memberId: params.memberId,
      memberName: TRAINER_PROGRESS_TRACKING_MOCK_PROGRESS_MEMBERS.find((member) => member.id === params.memberId)?.name || 'Unknown',
      totalEntries: entries.length,
      latestEntry,
      firstEntry,
      weightChangeKg: firstEntry && latestEntry ? latestEntry.weightKg - firstEntry.weightKg : 0,
      bmiChange: firstEntry && latestEntry ? latestEntry.bmi - firstEntry.bmi : 0,
      goalStatus: TRAINER_PROGRESS_TRACKING_GOAL_STATUS.ON_TRACK,
    };
    return response(summary, 'Progress summary loaded.');
  }),
];
