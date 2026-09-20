import { http, HttpResponse, delay } from 'msw';
import { StatusCodes } from 'http-status-codes';
import { env } from '@/config/env';
import { MOCK_TRAINER_SESSIONS, MOCK_TRAINER_SESSION_MEMBERS } from '@/app/trainer/sessions/sessions_fixtures/TrainerSessionsMockData';
import { CreateSessionDtoSchema } from '@/app/trainer/sessions/sessions_types/TrainerSessionsTypes';
import { TrainerSessionsUrlConfig } from '@/app/trainer/sessions/sessions_url_config';
const BASE = env.NEXT_PUBLIC_API_URL;
const MOCK_DELAY_MS = 300;
let sessionsDB = MOCK_TRAINER_SESSIONS.map(s => ({ ...s, enrolledMembers: s.enrolledMembers ? [...s.enrolledMembers] : [] }));
export const trainerSessionsHandlers = [
  http.get(`${BASE}${TrainerSessionsUrlConfig.BACKEND_API.MEMBERS}`, async () => { await delay(250); return HttpResponse.json({ success: true, message: 'Session members loaded.', data: MOCK_TRAINER_SESSION_MEMBERS }); }),
  http.get(`${BASE}${TrainerSessionsUrlConfig.BACKEND_API.LIST}`, async ({ request }) => { await delay(300); const date = new URL(request.url).searchParams.get('date'); const filtered = date ? sessionsDB.filter(s => s.sessionDate === date) : sessionsDB; return HttpResponse.json({ success: true, message: 'Sessions loaded.', data: filtered }); }),
  http.post(`${BASE}${TrainerSessionsUrlConfig.BACKEND_API.LIST}`, async ({ request }) => { await delay(400); const parsed = CreateSessionDtoSchema.safeParse(await request.json()); if (!parsed.success) return HttpResponse.json({ success: false, message: 'Invalid session payload.', data: null }, { status: StatusCodes.UNPROCESSABLE_ENTITY }); const dto = parsed.data; const newSession = { id: `s-${Date.now()}`, title: dto.type === 'PT' ? 'PT Session' : 'Group Session', type: dto.type, sessionDate: dto.date, time: dto.time, duration: dto.duration, status: 'Upcoming' as const, attendees: 0, isOnline: false, member: dto.memberId || undefined, location: dto.location, room: dto.room, enrolledMembers: [] }; sessionsDB = [...sessionsDB, newSession]; return HttpResponse.json({ success: true, message: 'Session created.', data: newSession }); }),
  http.patch(`${BASE}${TrainerSessionsUrlConfig.BACKEND_API.UPDATE(':id')}`, async ({ params, request }) => { await delay(350); const index = sessionsDB.findIndex(s => s.id === params.id); if (index === -1) return HttpResponse.json({ success: false, message: 'Session not found.', data: null }, { status: StatusCodes.NOT_FOUND }); const current = sessionsDB[index]!; const parsed = CreateSessionDtoSchema.partial().safeParse(await request.json()); if (!parsed.success) return HttpResponse.json({ success: false, message: 'Invalid session payload.', data: null }, { status: StatusCodes.UNPROCESSABLE_ENTITY }); sessionsDB[index] = { ...current, ...parsed.data, sessionDate: parsed.data.date ?? current.sessionDate, member: parsed.data.memberId ?? current.member }; return HttpResponse.json({ success: true, message: 'Session updated.', data: sessionsDB[index] }); }),
  http.post(`${BASE}${TrainerSessionsUrlConfig.BACKEND_API.CANCEL(':id')}`, async ({ params }) => {
    await delay(MOCK_DELAY_MS);
    const index = sessionsDB.findIndex((s) => s.id === params.id);
    if (index === -1) return HttpResponse.json({ success: false, message: 'Session not found' }, { status: StatusCodes.NOT_FOUND });
    sessionsDB[index] = { ...sessionsDB[index]!, status: 'No Show' as const };
    return HttpResponse.json({ success: true, message: 'Session marked as No Show successfully' });
  }),
  http.post(`${BASE}${TrainerSessionsUrlConfig.BACKEND_API.MARK_ATTENDANCE(':id')}`, async ({ params, request }) => { await delay(300); const index = sessionsDB.findIndex(s => s.id === params.id); if (index === -1) return HttpResponse.json({ success: false, message: 'Session not found.', data: null }, { status: StatusCodes.NOT_FOUND }); const body = await request.json() as { memberIds?: unknown }; if (!Array.isArray(body.memberIds) || body.memberIds.some(id => typeof id !== 'string')) return HttpResponse.json({ success: false, message: 'Invalid attendance payload.', data: null }, { status: StatusCodes.UNPROCESSABLE_ENTITY }); const memberIds = body.memberIds as string[]; const enrolled = sessionsDB[index]!.enrolledMembers ?? []; const checked = enrolled.filter(m => memberIds.includes(m.id)); sessionsDB[index] = { ...sessionsDB[index]!, attendees: checked.length, enrolledMembers: enrolled }; return HttpResponse.json({ success: true, message: 'Attendance marked.', data: sessionsDB[index] }); }),
];
