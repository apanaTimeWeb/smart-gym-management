
import { env } from '@/config/env';

import { http, HttpResponse, delay } from 'msw';

import { TRAINER_SESSIONS_ALL_SESSION_FILTER, TRAINER_SESSIONS_SESSION_STATUS, TRAINER_SESSIONS_SESSION_TYPE } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_constants/TrainerSessionsConstants';

import { TRAINER_SESSIONS_HTTP_STATUS_CODES } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_constants/TrainerSessionsHttpStatusCodes';

import { TRAINER_SESSIONS_MOCK_TRAINER_SESSIONS, TRAINER_SESSIONS_MOCK_TRAINER_SESSION_MEMBERS } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_mocks/trainer_sessions_fixtures/TrainerSessionsMockData';

import { TrainerSessionsCreateSessionDtoSchema } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_schemas/TrainerSessionsDomainSchemas';

import { TRAINER_SESSIONS_URLS } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_url_config';

;

const BASE = env.NEXT_PUBLIC_API_URL;
const MOCK_DELAY_MS = 300;
const createInitialSessionsDB = () => TRAINER_SESSIONS_MOCK_TRAINER_SESSIONS.map((session) => ({ ...session, enrolledMembers: session.enrolledMembers ? session.enrolledMembers.map((member) => ({ ...member })) : [] }));
let sessionsDB = createInitialSessionsDB();

/** Resets mutable fixture state between isolated tests without affecting in-flow mutation behavior. */
export function resetTrainerSessionsMockData(): void {
  sessionsDB = createInitialSessionsDB();
}

export const TrainerSessionsMockHandlers = [
  http.get(`${BASE}${TRAINER_SESSIONS_URLS.API.MEMBERS}`, async () => { await delay(250); return HttpResponse.json({ success: true, message: 'Session members loaded.', data: TRAINER_SESSIONS_MOCK_TRAINER_SESSION_MEMBERS }); }),
  http.get(`${BASE}${TRAINER_SESSIONS_URLS.API.LIST}`, async ({ request }) => { await delay(300); const params = new URL(request.url).searchParams; const date = params.get('date'); const filter = params.get('filter'); const filtered = sessionsDB.filter((session) => (date ? session.sessionDate === date : true) && (filter && filter !== TRAINER_SESSIONS_ALL_SESSION_FILTER ? session.type === filter : true)); return HttpResponse.json({ success: true, message: 'Sessions loaded.', data: filtered }); }),
  http.post(`${BASE}${TRAINER_SESSIONS_URLS.API.LIST}`, async ({ request }) => { await delay(400); const parsed = TrainerSessionsCreateSessionDtoSchema.safeParse(await request.json()); if (!parsed.success) return HttpResponse.json({ success: false, message: 'Invalid session payload.', data: null }, { status: TRAINER_SESSIONS_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY }); const dto = parsed.data; const newSession = { id: `s-${Date.now()}`, title: dto.type === 'PT' ? 'PT Session' : 'Group Session', type: dto.type, sessionDate: dto.date, time: dto.time, duration: dto.duration, status: TRAINER_SESSIONS_SESSION_STATUS.UPCOMING, attendees: 0, isOnline: false, member: dto.memberId || undefined, location: dto.location, room: dto.room, enrolledMembers: dto.type === TRAINER_SESSIONS_SESSION_TYPE.GROUP ? [...TRAINER_SESSIONS_MOCK_TRAINER_SESSION_MEMBERS] : TRAINER_SESSIONS_MOCK_TRAINER_SESSION_MEMBERS.filter((member) => member.id === dto.memberId) }; sessionsDB = [...sessionsDB, newSession]; return HttpResponse.json({ success: true, message: 'Session created.', data: newSession }); }),
  http.patch(`${BASE}${TRAINER_SESSIONS_URLS.API.UPDATE(':id')}`, async ({ params, request }) => { await delay(350); const index = sessionsDB.findIndex(s => s.id === params.id); if (index === -1) return HttpResponse.json({ success: false, message: 'Session not found.', data: null }, { status: TRAINER_SESSIONS_HTTP_STATUS_CODES.NOT_FOUND }); const current = sessionsDB[index]!; const body = await request.json() as any; sessionsDB[index] = { ...current, ...body, sessionDate: body.date ?? current.sessionDate, member: body.memberId ?? current.member }; return HttpResponse.json({ success: true, message: 'Session updated.', data: sessionsDB[index] }); }),
  http.delete(`${BASE}${TRAINER_SESSIONS_URLS.API.CANCEL(':id')}`, async ({ params }) => {
    await delay(MOCK_DELAY_MS);
    const index = sessionsDB.findIndex((s) => s.id === params.id);
    if (index === -1) return HttpResponse.json({ success: false, message: 'Session not found', data: null }, { status: TRAINER_SESSIONS_HTTP_STATUS_CODES.NOT_FOUND });
    sessionsDB = sessionsDB.filter((s) => s.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Session cancelled successfully', data: null });
  }),
  http.post(`${BASE}${TRAINER_SESSIONS_URLS.API.MARK_ATTENDANCE(':id')}`, async ({ params, request }) => {
    await delay(300);
    const index = sessionsDB.findIndex((s) => s.id === params.id);
    if (index === -1) return HttpResponse.json({ success: false, message: 'Session not found.', data: null }, { status: TRAINER_SESSIONS_HTTP_STATUS_CODES.NOT_FOUND });

    const rawBody = await request.text();
    if (!rawBody.trim()) {
      sessionsDB[index] = { ...sessionsDB[index]!, status: TRAINER_SESSIONS_SESSION_STATUS.NO_SHOW };
      return HttpResponse.json({ success: true, message: 'Session marked as No Show successfully', data: null });
    }

    let body: { memberIds?: unknown };
    try {
      body = JSON.parse(rawBody) as { memberIds?: unknown };
    } catch {
      return HttpResponse.json({ success: false, message: 'Invalid attendance payload.', data: null }, { status: TRAINER_SESSIONS_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY });
    }

    if (!Array.isArray(body.memberIds) || body.memberIds.some((memberId) => typeof memberId !== 'string')) {
      return HttpResponse.json({ success: false, message: 'Invalid attendance payload.', data: null }, { status: TRAINER_SESSIONS_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY });
    }

    const memberIds = body.memberIds as string[];
    const enrolled = sessionsDB[index]!.enrolledMembers ?? [];
    const checked = enrolled.filter((member) => memberIds.includes(member.id));
    sessionsDB[index] = { ...sessionsDB[index]!, attendees: checked.length, enrolledMembers: enrolled };
    return HttpResponse.json({ success: true, message: 'Attendance marked.', data: null });
  }),
];
