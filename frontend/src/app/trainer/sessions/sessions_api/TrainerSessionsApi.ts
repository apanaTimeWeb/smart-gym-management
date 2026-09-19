import { apiFetch } from '@/lib/api';
import { z } from 'zod';
import { TrainerSessionSchema, type TrainerSession, type CreateSessionDto } from '@/app/trainer/sessions/sessions_types/TrainerSessionsTypes';
import { TrainerSessionsUrlConfig } from '@/app/trainer/sessions/sessions_url_config';
import { createTrainerApiResponseSchema } from '@/app/trainer/trainer_utils/TrainerApiResponseSchema';

export async function fetchTrainerSessionMembers(): Promise<{ id: string; name: string }[]> {
  const raw = await apiFetch<import('@/lib/api').ApiResponse<unknown>>(TrainerSessionsUrlConfig.BACKEND_API.MEMBERS);
  return z.array(z.object({ id: z.string(), name: z.string() })).parse(createTrainerApiResponseSchema(z.array(z.object({ id: z.string(), name: z.string() }))).parse(raw).data);
}

export async function fetchTrainerSessions(date: string): Promise<TrainerSession[]> {
  const raw = await apiFetch<import('@/lib/api').ApiResponse<unknown>>(`${TrainerSessionsUrlConfig.BACKEND_API.LIST}?date=${date}`);
  return z.array(TrainerSessionSchema).parse(createTrainerApiResponseSchema(z.array(TrainerSessionSchema)).parse(raw).data);
}

export async function createTrainerSession(dto: CreateSessionDto, idempotencyKey?: string): Promise<{ data: TrainerSession; message: string }> {
  const raw = await apiFetch<import('@/lib/api').ApiResponse<unknown>>(TrainerSessionsUrlConfig.BACKEND_API.CREATE, {
    method: 'POST',
    body: JSON.stringify(dto),
    ...(idempotencyKey ? { headers: { 'Idempotency-Key': idempotencyKey } } : {}),
  });
  const response = createTrainerApiResponseSchema(TrainerSessionSchema).parse(raw);
  if (!response.data) throw new Error(response.message);
  return { data: response.data, message: response.message };
}

export async function updateTrainerSession(id: string, dto: Partial<CreateSessionDto>, idempotencyKey?: string): Promise<{ data: TrainerSession; message: string }> {
  const raw = await apiFetch<import('@/lib/api').ApiResponse<unknown>>(TrainerSessionsUrlConfig.BACKEND_API.UPDATE(id), {
    method: 'PATCH',
    body: JSON.stringify(dto),
    ...(idempotencyKey ? { headers: { 'Idempotency-Key': idempotencyKey } } : {}),
  });
  const response = createTrainerApiResponseSchema(TrainerSessionSchema).parse(raw);
  if (!response.data) throw new Error(response.message);
  return { data: response.data, message: response.message };
}

export async function cancelTrainerSession(id: string, idempotencyKey?: string): Promise<{ message: string }> {
  const raw = await apiFetch<import('@/lib/api').ApiResponse<unknown>>(TrainerSessionsUrlConfig.BACKEND_API.CANCEL(id), { method: 'DELETE', ...(idempotencyKey ? { headers: { 'Idempotency-Key': idempotencyKey } } : {}) });
  const response = createTrainerApiResponseSchema(z.null()).parse(raw);
  return { message: response.message };
}

export async function markTrainerSessionAttendance(id: string, memberIds: string[], idempotencyKey?: string): Promise<{ message: string }> {
  const raw = await apiFetch<import('@/lib/api').ApiResponse<unknown>>(TrainerSessionsUrlConfig.BACKEND_API.MARK_ATTENDANCE(id), { method: 'POST', body: JSON.stringify({ memberIds }), ...(idempotencyKey ? { headers: { 'Idempotency-Key': idempotencyKey } } : {}) });
  const response = createTrainerApiResponseSchema(z.null()).parse(raw);
  return { message: response.message };
}
