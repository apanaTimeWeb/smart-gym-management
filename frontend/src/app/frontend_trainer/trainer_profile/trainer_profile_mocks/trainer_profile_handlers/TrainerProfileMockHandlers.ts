
import { env } from '@/config/env';

import { http, HttpResponse, delay } from 'msw';

import { TRAINER_PROFILE_HTTP_STATUS_CODES } from '@/app/frontend_trainer/trainer_profile/trainer_profile_constants/TrainerProfileHttpStatusCodes';

import { TRAINER_PROFILE_MOCK_TRAINER_PROFILE } from '@/app/frontend_trainer/trainer_profile/trainer_profile_mocks/trainer_profile_fixtures/TrainerProfileMockData';

import { TRAINER_PROFILE_URLS } from '@/app/frontend_trainer/trainer_profile/trainer_profile_url_config';

const BASE = env.NEXT_PUBLIC_API_URL;
let profileDB = { ...TRAINER_PROFILE_MOCK_TRAINER_PROFILE };
export const TrainerProfileMockHandlers = [
  http.get(`${BASE}${TRAINER_PROFILE_URLS.API.PROFILE}`, async () => { await delay(250); return HttpResponse.json({ success: true, message: 'Profile loaded.', data: profileDB }); }),
  http.patch(`${BASE}${TRAINER_PROFILE_URLS.API.PROFILE}`, async ({ request }) => { await delay(350); const body = await request.json() as Partial<typeof profileDB>; profileDB = { ...profileDB, ...body }; return HttpResponse.json({ success: true, message: 'Profile updated.', data: profileDB }); }),
  http.patch(`${BASE}${TRAINER_PROFILE_URLS.API.PASSWORD}`, async ({ request }) => { await delay(350); const body = await request.json() as { currentPassword?: unknown; newPassword?: unknown }; if (typeof body.currentPassword !== 'string' || typeof body.newPassword !== 'string' || body.newPassword.length < 8) return HttpResponse.json({ success: false, message: 'Invalid password payload.', data: null }, { status: TRAINER_PROFILE_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY }); return HttpResponse.json({ success: true, message: 'Password updated.', data: null }); }),
];
