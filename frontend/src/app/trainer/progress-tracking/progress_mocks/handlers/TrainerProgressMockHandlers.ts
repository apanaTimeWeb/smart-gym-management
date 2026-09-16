import { http, HttpResponse, delay } from 'msw';
import { StatusCodes } from 'http-status-codes';
import { env } from '@/config/env';
import { MOCK_PROGRESS_ENTRIES, MOCK_PROGRESS_MEMBERS } from '@/app/trainer/progress-tracking/progress_fixtures/TrainerProgressMockData';
import { CreateProgressEntrySchema } from '@/app/trainer/progress-tracking/progress_types/TrainerProgress.schema';

const BASE = env.NEXT_PUBLIC_API_URL;

let progressDB = [...MOCK_PROGRESS_ENTRIES];

export const trainerProgressHandlers = [
  http.get(`${BASE}/trainer/progress-tracking/members`, async () => {
    await delay(300);
    return HttpResponse.json({ data: MOCK_PROGRESS_MEMBERS });
  }),

  http.get(`${BASE}/trainer/progress-tracking/:memberId/entries`, async ({ params }) => {
    await delay(300);
    const entries = progressDB.filter(e => e.memberId === params.memberId);
    return HttpResponse.json({ data: entries });
  }),

  http.get(`${BASE}/trainer/progress-tracking/:memberId/summary`, async ({ params }) => {
    await delay(300);
    const entries = progressDB.filter(e => e.memberId === params.memberId).sort((a, b) => a.date.localeCompare(b.date));
    
    const totalEntries = entries.length;
    const firstEntry = entries[0] || null;
    const latestEntry = entries[entries.length - 1] || null;
    const weightChangeKg = firstEntry && latestEntry ? latestEntry.weightKg - firstEntry.weightKg : 0;
    const bmiChange = firstEntry && latestEntry ? latestEntry.bmi - firstEntry.bmi : 0;

    const summary = {
      memberId: params.memberId,
      memberName: MOCK_PROGRESS_MEMBERS.find(m => m.id === params.memberId)?.name || 'Unknown',
      totalEntries,
      latestEntry,
      firstEntry,
      weightChangeKg,
      bmiChange,
      goalStatus: 'On Track',
    };

    return HttpResponse.json({ data: summary });
  }),

  http.post(`${BASE}/trainer/progress-tracking/:memberId/entries`, async ({ params, request }) => {
    await delay(300);
    const parsedBody = CreateProgressEntrySchema.safeParse(await request.json());
    if (!parsedBody.success) return HttpResponse.json({ success: false, message: 'Invalid progress payload.', data: null });
    const body = parsedBody.data;
    const newEntry = {
      id: `prog_${Date.now()}`,
      memberId: params.memberId,
      ...body,
      bmi: Math.round((body.weightKg / Math.pow(body.heightCm / 100, 2)) * 10) / 10,
      recordedBy: 'Current Trainer',
    };
    progressDB = [...progressDB, newEntry];
    return HttpResponse.json({ data: newEntry });
  }),

  http.patch(`${BASE}/trainer/progress-tracking/:memberId/entries/:entryId`, async ({ params, request }) => {
    await delay(300);
    const parsedBody = CreateProgressEntrySchema.partial().safeParse(await request.json());
    if (!parsedBody.success) return HttpResponse.json({ success: false, message: 'Invalid progress update payload.', data: null });
    const body = parsedBody.data;
    const entryIndex = progressDB.findIndex(e => e.id === params.entryId && e.memberId === params.memberId);
    if (entryIndex === -1) {
      return HttpResponse.json({ error: 'Not found' }, { status: StatusCodes.NOT_FOUND });
    }

    const oldEntry = progressDB[entryIndex]!;
    const updatedWeight = body.weightKg ?? oldEntry.weightKg;
    const updatedHeight = body.heightCm ?? oldEntry.heightCm;
    const newBmi = Math.round((updatedWeight / Math.pow(updatedHeight / 100, 2)) * 10) / 10;

    const updatedEntry = {
      ...oldEntry,
      ...body,
      bmi: newBmi,
    };
    
    progressDB[entryIndex] = updatedEntry;
    return HttpResponse.json({ data: updatedEntry });
  }),

  http.delete(`${BASE}/trainer/progress-tracking/:memberId/entries/:entryId`, async ({ params }) => {
    await delay(300);
    progressDB = progressDB.filter(e => !(e.id === params.entryId && e.memberId === params.memberId));
    return HttpResponse.json({ success: true });
  })
];
