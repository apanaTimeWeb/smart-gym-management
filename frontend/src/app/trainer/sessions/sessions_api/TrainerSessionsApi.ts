import { apiFetch } from '@/lib/api';
import { z } from 'zod';
import { TrainerSessionSchema, type TrainerSession, type CreateSessionDto } from '@/app/trainer/sessions/sessions_types/TrainerSessionsTypes';
import { TRAINER_SESSIONS_API_ROUTES } from '@/app/trainer/sessions/sessions_utils/sessions_url_config';

export async function fetchMembersBasicMock(): Promise<{ id: string; name: string }[]> {
  await new Promise(res => setTimeout(res, 300));
  return [
    { id: 'm1', name: 'Rahul Sharma' },
    { id: 'm2', name: 'Neha Gupta' },
    { id: 'm3', name: 'Amit Kumar' }
  ];
}

export async function fetchTrainerSessions(date: string): Promise<TrainerSession[]> {
  const raw = await apiFetch<unknown>(`${TRAINER_SESSIONS_API_ROUTES.BASE}?date=${date}`);
  return z.array(TrainerSessionSchema).parse(raw.data);
}

export async function createTrainerSession(dto: CreateSessionDto): Promise<TrainerSession> {
  const raw = await apiFetch<unknown>(TRAINER_SESSIONS_API_ROUTES.BASE, {
    method: 'POST',
    body: JSON.stringify(dto),
  });
  return TrainerSessionSchema.parse(raw.data);
}

export async function updateTrainerSession(id: string, dto: Partial<CreateSessionDto>): Promise<TrainerSession> {
  const raw = await apiFetch<unknown>(TRAINER_SESSIONS_API_ROUTES.UPDATE(id), {
    method: 'PATCH',
    body: JSON.stringify(dto),
  });
  return TrainerSessionSchema.parse(raw.data);
}

export async function cancelTrainerSession(id: string): Promise<void> {
  await apiFetch<unknown>(TRAINER_SESSIONS_API_ROUTES.CANCEL(id), {
    method: 'DELETE',
  });
}

export async function markTrainerSessionAttendance(id: string, memberIds: string[]): Promise<void> {
  await apiFetch<unknown>(`${TRAINER_SESSIONS_API_ROUTES.BASE}/${id}/attendance`, {
    method: 'POST',
    body: JSON.stringify({ memberIds }),
  });
}
