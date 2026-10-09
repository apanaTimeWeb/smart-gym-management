import { z } from 'zod';

import { apiFetch } from '@/lib/api';

import { TrainerInfrastructureApiResponseSchema } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_schemas/TrainerInfrastructureApiResponseSchema';

import { TRAINER_SESSIONS_ALL_SESSION_FILTER } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_constants/TrainerSessionsConstants';

import { TrainerSessionsTrainerSessionSchema } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_schemas/TrainerSessionsDomainSchemas';

import { TRAINER_SESSIONS_URLS } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_url_config';

import type { TrainerSessionsTrainerSession, TrainerSessionsTrainerSessionMember, TrainerSessionsCreateSessionDto, TrainerSessionsSessionFilter } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_types/TrainerSessionsTypes';

import type { ApiResponse } from '@/lib/api';

/**
 * @description Owns fetchTrainerSessionsTrainerSessionMembers behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
export async function fetchTrainerSessionsTrainerSessionMembers(): Promise<TrainerSessionsTrainerSessionMember[]> {
  const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_SESSIONS_URLS.API.MEMBERS);
  return z.array(z.object({ id: z.string(), name: z.string() })).parse(TrainerInfrastructureApiResponseSchema(z.array(z.object({ id: z.string(), name: z.string() }))).parse(raw).data);
}

/**
 * @description Owns fetchTrainerSessions behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
export async function fetchTrainerSessions(date: string, filter: TrainerSessionsSessionFilter = TRAINER_SESSIONS_ALL_SESSION_FILTER): Promise<TrainerSessionsTrainerSession[]> {
  const params = new URLSearchParams({ date });
  if (filter !== TRAINER_SESSIONS_ALL_SESSION_FILTER) params.set('filter', filter);
  const raw = await apiFetch<ApiResponse<unknown>>(`${TRAINER_SESSIONS_URLS.API.LIST}?${params.toString()}`);
  return z.array(TrainerSessionsTrainerSessionSchema).parse(TrainerInfrastructureApiResponseSchema(z.array(TrainerSessionsTrainerSessionSchema)).parse(raw).data);
}

/**
 * @description Owns createTrainerSessionsTrainerSession behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
export async function createTrainerSessionsTrainerSession(dto: TrainerSessionsCreateSessionDto, idempotencyKey: string): Promise<{ data: TrainerSessionsTrainerSession; message: string }> {
  const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_SESSIONS_URLS.API.CREATE, {
    method: 'POST',
    body: JSON.stringify(dto), headers: { 'Idempotency-Key': idempotencyKey }
});
  const response = TrainerInfrastructureApiResponseSchema(TrainerSessionsTrainerSessionSchema).parse(raw);
  if (!response.data) throw new Error(response.message);
  return { data: response.data, message: response.message };
}

/**
 * @description Owns updateTrainerSessionsTrainerSession behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
export async function updateTrainerSessionsTrainerSession(id: string, dto: Partial<TrainerSessionsCreateSessionDto>, idempotencyKey: string): Promise<{ data: TrainerSessionsTrainerSession; message: string }> {
  const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_SESSIONS_URLS.API.UPDATE(id), {
    method: 'PATCH',
    body: JSON.stringify(dto), headers: { 'Idempotency-Key': idempotencyKey }
});
  const response = TrainerInfrastructureApiResponseSchema(TrainerSessionsTrainerSessionSchema).parse(raw);
  if (!response.data) throw new Error(response.message);
  return { data: response.data, message: response.message };
}

/**
 * @description Cancels a scheduled Trainer session through the documented destructive-session endpoint.
 * @dependencies Uses the module URL contract and canonical API response schema.
 * @edge-cases Sends the idempotency key unchanged so retries represent the same cancellation intent.
 */
export async function cancelTrainerSessionsTrainerSession(id: string, idempotencyKey: string): Promise<{ message: string }> {
  const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_SESSIONS_URLS.API.CANCEL(id), {
    method: 'DELETE',
    headers: { 'Idempotency-Key': idempotencyKey },
  });
  const response = TrainerInfrastructureApiResponseSchema(z.null()).parse(raw);
  return { message: response.message };
}

/**
 * @description Owns markTrainerSessionsTrainerSessionNoShow behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
export async function markTrainerSessionsTrainerSessionNoShow(id: string, idempotencyKey: string): Promise<{ message: string }> {
  const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_SESSIONS_URLS.API.MARK_NO_SHOW(id), { method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }
});
  const response = TrainerInfrastructureApiResponseSchema(z.null()).parse(raw);
  return { message: response.message };
}

/**
 * @description Owns markTrainerSessionsTrainerSessionAttendance behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
export async function markTrainerSessionsTrainerSessionAttendance(id: string, memberIds: string[], idempotencyKey: string): Promise<{ message: string }> {
  const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_SESSIONS_URLS.API.MARK_ATTENDANCE(id), { method: 'POST', body: JSON.stringify({ memberIds }), headers: { 'Idempotency-Key': idempotencyKey }
});
  const response = TrainerInfrastructureApiResponseSchema(z.null()).parse(raw);
  return { message: response.message };
}
