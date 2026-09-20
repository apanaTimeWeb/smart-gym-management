import { http, HttpResponse, delay } from 'msw';
import { z } from 'zod';
import { env } from '@/config/env';
import { MOCK_AVAILABILITY, MOCK_LEAVES } from '@/app/trainer/schedule/schedule_mocks/fixtures/TrainerScheduleMockData';
import { WeeklyAvailabilitySchema, CreateLeaveDtoSchema } from '@/app/trainer/schedule/schedule_types/TrainerScheduleTypes';
import { ScheduleUrlConfig } from '@/app/trainer/schedule/schedule_url_config';

const BASE = env.NEXT_PUBLIC_API_URL;
const MOCK_DELAY_MS = 500;

let currentAvailability = [...MOCK_AVAILABILITY];
let currentLeaves = [...MOCK_LEAVES];

export const trainerScheduleHandlers = [
  http.get(`${BASE}${ScheduleUrlConfig.BACKEND_API.SCHEDULE}`, async () => {
    await delay(MOCK_DELAY_MS);
    return HttpResponse.json({ success: true, message: 'Schedule fetched successfully', data: { availability: currentAvailability, leaves: currentLeaves } });
  }),

  http.put(`${BASE}${ScheduleUrlConfig.BACKEND_API.AVAILABILITY}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const parsedData = z.array(WeeklyAvailabilitySchema).safeParse(await request.json());
    if (!parsedData.success) return HttpResponse.json({ success: false, message: 'Invalid availability payload.', data: null });
    const data = parsedData.data;
    currentAvailability = [...data];
    return HttpResponse.json({ success: true, message: 'Availability updated successfully', data: currentAvailability });
  }),

  http.post(`${BASE}${ScheduleUrlConfig.BACKEND_API.LEAVES}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const parsedData = CreateLeaveDtoSchema.safeParse(await request.json());
    if (!parsedData.success) return HttpResponse.json({ success: false, message: 'Invalid leave payload.', data: null });
    const data = parsedData.data;
    const newLeave = {
      ...data,
      id: `LR-${Math.floor(Math.random() * 10000)}`,
      trainerId: 'TR-101',
      status: 'PENDING' as const,
      createdAt: new Date().toISOString(),
    };
    currentLeaves = [newLeave, ...currentLeaves];
    return HttpResponse.json({ success: true, message: 'Leave request submitted successfully', data: newLeave });
  })
];
