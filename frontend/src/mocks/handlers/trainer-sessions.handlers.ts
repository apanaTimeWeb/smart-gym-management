import { http, HttpResponse, delay } from 'msw';
import { env } from '@/config/env';
import { MOCK_TRAINER_SESSIONS } from '@/app/trainer/sessions/sessions_fixtures/TrainerSessionsMockData';

const BASE = env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

let sessionsDB = [...MOCK_TRAINER_SESSIONS];

export const trainerSessionsHandlers = [
  http.get(`${BASE}/trainer/sessions`, async ({ request }) => {
    await delay(600);
    const url = new URL(request.url);
    const date = url.searchParams.get('date');
    let filtered = [...sessionsDB];
    if (date) {
      filtered = filtered.filter(s => s.sessionDate === date);
    }
    return HttpResponse.json({ data: filtered });
  }),

  http.post(`${BASE}/trainer/sessions`, async ({ request }) => {
    await delay(600);
    const body = (await request.json()) as any;
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
    return HttpResponse.json({ data: newSession });
  }),

  http.patch(`${BASE}/trainer/sessions/:id`, async ({ params, request }) => {
    await delay(600);
    const body = (await request.json()) as any;
    const idx = sessionsDB.findIndex(s => s.id === params.id);
    if (idx === -1) return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    sessionsDB[idx] = { ...sessionsDB[idx], ...body } as typeof sessionsDB[0];
    return HttpResponse.json({ data: sessionsDB[idx] });
  }),

  http.delete(`${BASE}/trainer/sessions/:id`, async ({ params }) => {
    await delay(600);
    sessionsDB = sessionsDB.filter(s => s.id !== params.id);
    return HttpResponse.json({ success: true });
  }),

  http.post(`${BASE}/trainer/sessions/:id/attendance`, async ({ params }) => {
    await delay(600);
    return HttpResponse.json({ success: true });
  })
];
