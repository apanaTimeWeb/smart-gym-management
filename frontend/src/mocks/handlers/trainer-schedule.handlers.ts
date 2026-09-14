import { http, HttpResponse, delay } from 'msw';
import { env } from '@/config/env';
import { MOCK_AVAILABILITY, MOCK_LEAVES } from '@/app/trainer/schedule/schedule_fixtures/TrainerScheduleMockData';

const BASE = env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

let currentAvailability = [...MOCK_AVAILABILITY];
let currentLeaves = [...MOCK_LEAVES];

export const trainerScheduleHandlers = [
  http.get(`${BASE}/trainer/schedule`, async () => {
    await delay(600);
    return HttpResponse.json({
      availability: currentAvailability,
      leaves: currentLeaves,
    });
  }),

  http.put(`${BASE}/trainer/schedule/availability`, async ({ request }) => {
    await delay(500);
    const data = (await request.json()) as any;
    currentAvailability = [...data];
    return HttpResponse.json({ success: true });
  }),

  http.post(`${BASE}/trainer/schedule/leaves`, async ({ request }) => {
    await delay(500);
    const data = (await request.json()) as any;
    const newLeave = {
      ...data,
      id: `LR-${Math.floor(Math.random() * 10000)}`,
      trainerId: 'TR-101',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    currentLeaves = [newLeave, ...currentLeaves];
    return HttpResponse.json({ success: true, data: newLeave });
  })
];
