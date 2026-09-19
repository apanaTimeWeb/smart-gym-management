import { http, HttpResponse, delay } from 'msw';
import { StatusCodes } from 'http-status-codes';
import { env } from '@/config/env';
import { MOCK_TRAINER_PROFILE } from '@/app/trainer/profile/profile_fixtures/TrainerProfileMockData';
import { ProfileUrlConfig } from '@/app/trainer/profile/profile_url_config';
const BASE = env.NEXT_PUBLIC_API_URL;
let profileDB = { ...MOCK_TRAINER_PROFILE };
export const trainerProfileHandlers = [
  http.get(`${BASE}${ProfileUrlConfig.BACKEND_API.PROFILE}`, async () => { await delay(250); return HttpResponse.json({ success: true, message: 'Profile loaded.', data: profileDB }); }),
  http.patch(`${BASE}${ProfileUrlConfig.BACKEND_API.PROFILE}`, async ({ request }) => { await delay(350); const body = await request.json() as Partial<typeof profileDB>; profileDB = { ...profileDB, ...body }; return HttpResponse.json({ success: true, message: 'Profile updated.', data: profileDB }); }),
  http.patch(`${BASE}${ProfileUrlConfig.BACKEND_API.PASSWORD}`, async ({ request }) => { await delay(350); const body = await request.json() as { currentPassword?: unknown; newPassword?: unknown }; if (typeof body.currentPassword !== 'string' || typeof body.newPassword !== 'string' || body.newPassword.length < 8) return HttpResponse.json({ success: false, message: 'Invalid password payload.', data: null }, { status: StatusCodes.UNPROCESSABLE_ENTITY }); return HttpResponse.json({ success: true, message: 'Password updated.', data: null }); }),
];
