// RESPONSIBILITY: Provides the Progress module's owned MSW data contract, server-side browse controls, and mutation responses.
import { http, HttpResponse, delay } from 'msw';
import { StatusCodes } from 'http-status-codes';
import { env } from '@/config/env';
import { MOCK_PROGRESS_ENTRIES, MOCK_PROGRESS_MEMBERS } from '@/app/trainer/progress-tracking/progress-tracking_mocks/fixtures/TrainerProgressMockData';
import { CreateProgressEntrySchema } from '@/app/trainer/progress-tracking/progress-tracking_types/TrainerProgress.schema';
import type { ProgressEntry } from '@/app/trainer/progress-tracking/progress-tracking_types/TrainerProgressTypes';
import { ProgressUrlConfig } from '@/app/trainer/progress-tracking/progress-tracking_url_config';

const BASE = env.NEXT_PUBLIC_API_URL;
const MOCK_DELAY_MS = 300;
const PROGRESS_DEFAULT_LIMIT = 10;
let progressDB = [...MOCK_PROGRESS_ENTRIES];

const response = <T,>(data: T, message: string, meta?: { total: number; page: number; limit: number; totalPages: number; hasNextPage: boolean; hasPrevPage: boolean }) =>
  HttpResponse.json({ success: true, message, data, ...(meta ? { meta } : {}) });

export const trainerProgressHandlers = [
  http.get(`${BASE}${ProgressUrlConfig.BACKEND_API.MEMBERS}`, async () => {
    await delay(MOCK_DELAY_MS);
    return response(MOCK_PROGRESS_MEMBERS, 'Progress members loaded.');
  }),

  http.get(`${BASE}${ProgressUrlConfig.BACKEND_API.ENTRIES(':memberId')}`, async ({ params, request }) => {
    await delay(MOCK_DELAY_MS);
    const url = new URL(request.url);
    const page = Math.max(1, Number(url.searchParams.get('page') ?? '1'));
    const limit = Math.max(1, Number(url.searchParams.get('limit') ?? String(PROGRESS_DEFAULT_LIMIT)));
    const sortBy = url.searchParams.get('sortBy') ?? 'date';
    const sortDirection = url.searchParams.get('sortDirection') === 'asc' ? 'asc' : 'desc';
    const filtered = progressDB.filter((entry) => entry.memberId === params.memberId);
    filtered.sort((left, right) => {
      const leftValue = left[sortBy as keyof ProgressEntry];
      const rightValue = right[sortBy as keyof ProgressEntry];
      const leftKey = leftValue == null ? '' : String(leftValue);
      const rightKey = rightValue == null ? '' : String(rightValue);
      const comparison = leftKey.localeCompare(rightKey, undefined, { numeric: true });
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const safePage = Math.min(page, totalPages);
    const entries = filtered.slice((safePage - 1) * limit, safePage * limit);
    return response(
      { entries, total, page: safePage, limit },
      'Progress entries loaded.',
      { total, page: safePage, limit, totalPages, hasNextPage: safePage < totalPages, hasPrevPage: safePage > 1 },
    );
  }),

  http.get(`${BASE}${ProgressUrlConfig.BACKEND_API.SUMMARY(':memberId')}`, async ({ params }) => {
    await delay(MOCK_DELAY_MS);
    const entries = progressDB.filter(e => e.memberId === params.memberId).sort((a, b) => a.date.localeCompare(b.date));
    const firstEntry = entries[0] || null;
    const latestEntry = entries[entries.length - 1] || null;
    const summary = {
      memberId: params.memberId,
      memberName: MOCK_PROGRESS_MEMBERS.find(m => m.id === params.memberId)?.name || 'Unknown',
      totalEntries: entries.length,
      latestEntry,
      firstEntry,
      weightChangeKg: firstEntry && latestEntry ? latestEntry.weightKg - firstEntry.weightKg : 0,
      bmiChange: firstEntry && latestEntry ? latestEntry.bmi - firstEntry.bmi : 0,
      goalStatus: 'On Track',
    };
    return response(summary, 'Progress summary loaded.');
  }),

  http.post(`${BASE}${ProgressUrlConfig.BACKEND_API.ENTRIES(':memberId')}`, async ({ params, request }) => {
    await delay(MOCK_DELAY_MS);
    const parsedBody = CreateProgressEntrySchema.safeParse(await request.json());
    if (!parsedBody.success) return HttpResponse.json({ success: false, message: 'Invalid progress payload.', data: null }, { status: StatusCodes.UNPROCESSABLE_ENTITY });
    const body = parsedBody.data;
    const newEntry: ProgressEntry = {
      id: `prog_${Date.now()}`,
      memberId: params.memberId as string,
      ...body,
      bmi: Math.round((body.weightKg / Math.pow(body.heightCm / 100, 2)) * 10) / 10,
      recordedBy: 'Current Trainer',
    };
    progressDB = [...progressDB, newEntry];
    return response(newEntry, 'Progress entry created.');
  }),

  http.patch(`${BASE}${ProgressUrlConfig.BACKEND_API.ENTRY_DETAIL(':memberId', ':entryId')}`, async ({ params, request }) => {
    await delay(MOCK_DELAY_MS);
    const parsedBody = CreateProgressEntrySchema.partial().safeParse(await request.json());
    if (!parsedBody.success) return HttpResponse.json({ success: false, message: 'Invalid progress update payload.', data: null }, { status: StatusCodes.UNPROCESSABLE_ENTITY });
    const entryIndex = progressDB.findIndex(e => e.id === params.entryId && e.memberId === params.memberId);
    if (entryIndex === -1) return HttpResponse.json({ success: false, message: 'Progress entry not found.', data: null }, { status: StatusCodes.NOT_FOUND });
    const oldEntry = progressDB[entryIndex]!;
    const updatedWeight = parsedBody.data.weightKg ?? oldEntry.weightKg;
    const updatedHeight = parsedBody.data.heightCm ?? oldEntry.heightCm;
    const updatedEntry = { ...oldEntry, ...parsedBody.data, bmi: Math.round((updatedWeight / Math.pow(updatedHeight / 100, 2)) * 10) / 10 };
    progressDB[entryIndex] = updatedEntry;
    return response(updatedEntry, 'Progress entry updated.');
  }),

  http.delete(`${BASE}${ProgressUrlConfig.BACKEND_API.ENTRY_DETAIL(':memberId', ':entryId')}`, async ({ params }) => {
    await delay(MOCK_DELAY_MS);
    const exists = progressDB.some(e => e.id === params.entryId && e.memberId === params.memberId);
    if (!exists) return HttpResponse.json({ success: false, message: 'Progress entry not found.', data: null }, { status: StatusCodes.NOT_FOUND });
    progressDB = progressDB.filter(e => !(e.id === params.entryId && e.memberId === params.memberId));
    return response(null, 'Progress entry deleted.');
  }),
];
