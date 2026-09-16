import { apiFetch } from '@/lib/api';
import { z } from 'zod';
import { TrainerSessionSchema, type TrainerSession, type CreateSessionDto } from '@/app/trainer/sessions/sessions_types/TrainerSessionsTypes';
import { TRAINER_SESSIONS_API_ROUTES } from '@/app/trainer/Trainer_url_config';
import { createTrainerApiResponseSchema } from '@/app/trainer/trainer_utils/TrainerApiResponseSchema';

export async function fetchTrainerSessionMembers(): Promise<{ id: string; name: string }[]> {
  const raw = await apiFetch<import('@/lib/api').ApiResponse<unknown>>(TRAINER_SESSIONS_API_ROUTES.members);
  return z.array(z.object({ id: z.string(), name: z.string() })).parse(raw.data);
}

export async function fetchTrainerSessions(date: string): Promise<TrainerSession[]> {
  const raw = await apiFetch<import('@/lib/api').ApiResponse<unknown>>(`${TRAINER_SESSIONS_API_ROUTES.list}?date=${date}`);
  return z.array(TrainerSessionSchema).parse(raw.data);
}

export async function createTrainerSession(dto: CreateSessionDto): Promise<TrainerSession> {
  const raw = await apiFetch<import('@/lib/api').ApiResponse<unknown>>(TRAINER_SESSIONS_API_ROUTES.create, {
    method: 'POST',
    body: JSON.stringify(dto),
  });
  const response = createTrainerApiResponseSchema(TrainerSessionSchema).parse(raw);
  if (!response.data) throw new Error(response.message);
  return response.data;
}

export async function updateTrainerSession(id: string, dto: Partial<CreateSessionDto>): Promise<TrainerSession> {
  const raw = await apiFetch<import('@/lib/api').ApiResponse<unknown>>(TRAINER_SESSIONS_API_ROUTES.update(id), {
    method: 'PATCH',
    body: JSON.stringify(dto),
  });
  const response = createTrainerApiResponseSchema(TrainerSessionSchema).parse(raw);
  if (!response.data) throw new Error(response.message);
  return response.data;
}

export async function cancelTrainerSession(id: string): Promise<void> {
  await apiFetch<import('@/lib/api').ApiResponse<unknown>>(TRAINER_SESSIONS_API_ROUTES.cancel(id), {
    method: 'DELETE',
  });
}

export async function markTrainerSessionAttendance(id: string, memberIds: string[]): Promise<void> {
  await apiFetch<import('@/lib/api').ApiResponse<unknown>>(TRAINER_SESSIONS_API_ROUTES.markAttendance(id), {
    method: 'POST',
    body: JSON.stringify({ memberIds }),
  });
}
