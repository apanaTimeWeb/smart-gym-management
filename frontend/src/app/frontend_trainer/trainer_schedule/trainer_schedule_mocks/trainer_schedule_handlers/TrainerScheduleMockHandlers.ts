import { env } from '@/config/env';

import { http, HttpResponse, delay } from 'msw';

import { z } from 'zod';

import { TRAINER_SCHEDULE_STATUS } from '@/app/frontend_trainer/trainer_schedule/trainer_schedule_constants/TrainerScheduleConstants';

import { TRAINER_SCHEDULE_MOCK_AVAILABILITY, TRAINER_SCHEDULE_MOCK_LEAVES } from '@/app/frontend_trainer/trainer_schedule/trainer_schedule_mocks/trainer_schedule_fixtures/TrainerScheduleMockData';

import { TrainerScheduleCreateLeaveDtoSchema } from '@/app/frontend_trainer/trainer_schedule/trainer_schedule_schemas/TrainerScheduleDomainSchemas';

import { TrainerScheduleWeeklyAvailabilitySchema } from '@/app/frontend_trainer/trainer_schedule/trainer_schedule_schemas/TrainerScheduleDomainSchemas';

import { TRAINER_SCHEDULE_URLS } from '@/app/frontend_trainer/trainer_schedule/trainer_schedule_url_config';

const BASE = env.NEXT_PUBLIC_API_URL;
const MOCK_DELAY_MS = 500;

let currentAvailability = [...TRAINER_SCHEDULE_MOCK_AVAILABILITY];
let currentLeaves = [...TRAINER_SCHEDULE_MOCK_LEAVES];

export const TrainerScheduleMockHandlers = [
  http.get(`${BASE}${TRAINER_SCHEDULE_URLS.API.SCHEDULE}`, async () => {
    await delay(MOCK_DELAY_MS);
    return HttpResponse.json({ success: true, message: 'Schedule fetched successfully', data: { availability: currentAvailability, leaves: currentLeaves } });
  }),

  http.put(`${BASE}${TRAINER_SCHEDULE_URLS.API.AVAILABILITY}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const parsedData = z.array(TrainerScheduleWeeklyAvailabilitySchema).safeParse(await request.json());
    if (!parsedData.success) return HttpResponse.json({ success: false, message: 'Invalid availability payload.', data: null });
    const data = parsedData.data;
    currentAvailability = [...data];
    return HttpResponse.json({ success: true, message: 'Availability updated successfully', data: currentAvailability });
  }),

  http.post(`${BASE}${TRAINER_SCHEDULE_URLS.API.LEAVES}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const parsedData = TrainerScheduleCreateLeaveDtoSchema.safeParse(await request.json());
    if (!parsedData.success) return HttpResponse.json({ success: false, message: 'Invalid leave payload.', data: null });
    const data = parsedData.data;
    const newLeave = {
      ...data,
      id: `LR-${Math.floor(Math.random() * 10000)}`,
      trainerId: 'TR-101',
      status: TRAINER_SCHEDULE_STATUS.PENDING,
      createdAt: new Date().toISOString(),
    };
    currentLeaves = [newLeave, ...currentLeaves];
    return HttpResponse.json({ success: true, message: 'Leave request submitted successfully', data: newLeave });
  })
];
