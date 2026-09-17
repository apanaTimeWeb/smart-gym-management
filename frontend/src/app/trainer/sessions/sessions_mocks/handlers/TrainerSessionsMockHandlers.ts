import { http, HttpResponse, delay } from 'msw';
import { StatusCodes } from 'http-status-codes';
import { env } from '@/config/env';
import { MOCK_TRAINER_SESSIONS, MOCK_TRAINER_SESSION_MEMBERS } from '@/app/trainer/sessions/sessions_fixtures/TrainerSessionsMockData';
import { CreateSessionDtoSchema } from '@/app/trainer/sessions/sessions_types/TrainerSessionsTypes';

const BASE = env.NEXT_PUBLIC_API_URL;

let sessionsDB = [...MOCK_TRAINER_SESSIONS];

export const trainerSessionsHandlers = [
  http.get(`${BASE}/trainer/sessions/members`, async () => {
    await delay(250);
    return HttpResponse.json({ success: true, message: 'Session members loaded.', data: MOCK_TRAINER_SESSION_MEMBERS });
  }),

  http.get(`${BASE}/trainer/sessions`, async ({ request }) => {
    await delay(600);
    const url = new URL(request.url);
    const date = url.searchParams.get('date');
    let filtered = [...sessionsDB];
    if (date) {
      filtered = filtered.filter(s => s.sessionDate === date);
    }
    return HttpResponse.json({ success: true, message: 'Sessions loaded.', data: filtered });
  }),

  http.post(`${BASE}/trainer/sessions`, async ({ request }) => {
    await delay(600);
    const parsedBody = CreateSessionDtoSchema.safeParse(await request.json());
    if (!parsedBody.success) return HttpResponse.json({ success: false, message: 'Invalid session payload.', data: null }, { status: StatusCodes.UNPROCESSABLE_ENTITY });
    const body = parsedBody.data;
    const newSession = {
      id: `s${Math.random().toString(36).substring(7)}`,
      title: body.type === 'PT' ? 'PT Session' : 'Group Session',
      type: body.type,
      sessionDate: body.date,
      time: body.time,
      duration: body.duration,
      status: 'Upcoming',
      attendees: 0,
      isOnline: false,
      member: body.memberId || undefined,
      location: body.location,
      room: body.room,
    };
    sessionsDB = [...sessionsDB, newSession as typeof sessionsDB[0]];
    return HttpResponse.json({ success: true, message: 'Session created.', data: newSession });
  }),

  http.patch(`${BASE}/trainer/sessions/:id`, async ({ params, request }) => {
    await delay(600);
    const parsedBody = CreateSessionDtoSchema.safeParse(await request.json());
    if (!parsedBody.success) return HttpResponse.json({ success: false, message: 'Invalid session payload.', data: null }, { status: StatusCodes.UNPROCESSABLE_ENTITY });
    const body = parsedBody.data;
    const idx = sessionsDB.findIndex(s => s.id === params.id);
    if (idx === -1) return HttpResponse.json({ success: false, message: 'Session not found.', data: null }, { status: StatusCodes.NOT_FOUND });
    sessionsDB[idx] = { ...sessionsDB[idx], ...body } as typeof sessionsDB[0];
    return HttpResponse.json({ success: true, message: 'Session cancelled.', data: sessionsDB[idx] });
  }),

  http.delete(`${BASE}/trainer/sessions/:id`, async ({ params }) => {
    await delay(600);
    sessionsDB = sessionsDB.filter(s => s.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Session updated.', data: null });
  }),

  http.post(`${BASE}/trainer/sessions/:id/attendance`, async ({ params }) => {
    await delay(600);
    return HttpResponse.json({ success: true, message: 'Session updated.', data: null });
  })
];
