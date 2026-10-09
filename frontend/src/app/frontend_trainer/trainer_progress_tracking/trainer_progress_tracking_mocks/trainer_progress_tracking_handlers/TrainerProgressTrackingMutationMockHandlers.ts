import { env } from '@/config/env';

import { delay, http, HttpResponse } from 'msw';

import { TRAINER_PROGRESS_TRACKING_HTTP_STATUS_CODES } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_constants/TrainerProgressTrackingHttpStatusCodes';

import { TrainerProgressTrackingCreateProgressEntrySchema } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_schemas/TrainerProgressTrackingDomainSchemas';

import { TRAINER_PROGRESS_TRACKING_URLS } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_url_config';

import { getTrainerProgressTrackingMockProgress, replaceTrainerProgressTrackingMockProgress } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_mocks/trainer_progress_tracking_handlers/TrainerProgressTrackingMockState';

import type { TrainerProgressTrackingProgressEntry } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_types/TrainerProgressTrackingTypes';

const BASE = env.NEXT_PUBLIC_API_URL;
const MOCK_DELAY_MS = 300;

const response = <T,>(data: T, message: string) => HttpResponse.json({ success: true, message, data });

export const TrainerProgressTrackingMutationMockHandlers = [
  http.post(`${BASE}${TRAINER_PROGRESS_TRACKING_URLS.API.ENTRIES(':memberId')}`, async ({ params, request }) => {
    await delay(MOCK_DELAY_MS);
    const parsedBody = TrainerProgressTrackingCreateProgressEntrySchema.safeParse(await request.json());
    if (!parsedBody.success) return HttpResponse.json({ success: false, message: 'Invalid progress payload.', data: null }, { status: TRAINER_PROGRESS_TRACKING_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY });
    const body = parsedBody.data;
    const newEntry: TrainerProgressTrackingProgressEntry = {
      id: `prog_${Date.now()}`,
      memberId: params.memberId as string,
      ...body,
      bmi: Math.round((body.weightKg / Math.pow(body.heightCm / 100, 2)) * 10) / 10,
      recordedBy: 'Current Trainer',
    };
    replaceTrainerProgressTrackingMockProgress([...getTrainerProgressTrackingMockProgress(), newEntry]);
    return response(newEntry, 'Progress entry created.');
  }),

  http.patch(`${BASE}${TRAINER_PROGRESS_TRACKING_URLS.API.ENTRY_DETAIL(':memberId', ':entryId')}`, async ({ params, request }) => {
    await delay(MOCK_DELAY_MS);
    const parsedBody = TrainerProgressTrackingCreateProgressEntrySchema.partial().safeParse(await request.json());
    if (!parsedBody.success) return HttpResponse.json({ success: false, message: 'Invalid progress update payload.', data: null }, { status: TRAINER_PROGRESS_TRACKING_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY });
    const currentEntries = getTrainerProgressTrackingMockProgress();
    const entryIndex = currentEntries.findIndex((entry) => entry.id === params.entryId && entry.memberId === params.memberId);
    if (entryIndex === -1) return HttpResponse.json({ success: false, message: 'Progress entry not found.', data: null }, { status: TRAINER_PROGRESS_TRACKING_HTTP_STATUS_CODES.NOT_FOUND });
    const oldEntry = currentEntries[entryIndex]!;
    const updatedWeight = parsedBody.data.weightKg ?? oldEntry.weightKg;
    const updatedHeight = parsedBody.data.heightCm ?? oldEntry.heightCm;
    const updatedEntry = { ...oldEntry, ...parsedBody.data, bmi: Math.round((updatedWeight / Math.pow(updatedHeight / 100, 2)) * 10) / 10 };
    const nextEntries = [...currentEntries];
    nextEntries[entryIndex] = updatedEntry;
    replaceTrainerProgressTrackingMockProgress(nextEntries);
    return response(updatedEntry, 'Progress entry updated.');
  }),

  http.delete(`${BASE}${TRAINER_PROGRESS_TRACKING_URLS.API.ENTRY_DETAIL(':memberId', ':entryId')}`, async ({ params }) => {
    await delay(MOCK_DELAY_MS);
    const currentEntries = getTrainerProgressTrackingMockProgress();
    const exists = currentEntries.some((entry) => entry.id === params.entryId && entry.memberId === params.memberId);
    if (!exists) return HttpResponse.json({ success: false, message: 'Progress entry not found.', data: null }, { status: TRAINER_PROGRESS_TRACKING_HTTP_STATUS_CODES.NOT_FOUND });
    replaceTrainerProgressTrackingMockProgress(currentEntries.filter((entry) => !(entry.id === params.entryId && entry.memberId === params.memberId)));
    return response(null, 'Progress entry deleted.');
  }),
];
