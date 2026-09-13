// RESPONSIBILITY: API functions for the Trainer Sessions module. All calls go through apiFetch.
// DATA FLOW: TrainerSessionsApi → sessions_context → TrainerSessionsMain

import { apiFetch } from '@/lib/api';
import { z } from 'zod';
import { TrainerSessionSchema, type TrainerSession, type CreateSessionDto } from '@/app/trainer/sessions/sessions_types/TrainerSessionsTypes';
import { TRAINER_SESSIONS_API_ROUTES } from '@/app/trainer/sessions/sessions_utils/sessions_url_config';

/**
 * MOCK ONLY: Local fetch of members to replace global trainer_api dependency.
 * Future: replace with actual endpoint.
 */
export async function fetchMembersBasicMock(): Promise<{ id: string; name: string }[]> {
  await new Promise(res => setTimeout(res, 300));
  return [
    { id: 'm1', name: 'Rahul Sharma' },
    { id: 'm2', name: 'Neha Gupta' },
    { id: 'm3', name: 'Amit Kumar' }
  ];
}

/**
 * Fetches all sessions for the authenticated trainer on a given date.
 */
export async function fetchTrainerSessions(date: string): Promise<TrainerSession[]> {
  const data = await apiFetch<unknown>(`${TRAINER_SESSIONS_API_ROUTES.list}?date=${date}`);
  return z.array(TrainerSessionSchema).parse(data);
}

/**
 * Creates a new PT session.
 */
export async function createTrainerSession(dto: CreateSessionDto): Promise<TrainerSession> {
  const data = await apiFetch<unknown>(TRAINER_SESSIONS_API_ROUTES.create, {
    method: 'POST',
    body: JSON.stringify(dto),
  });
  return TrainerSessionSchema.parse(data);
}

/**
 * Updates an existing session by ID.
 */
export async function updateTrainerSession(id: string, dto: Partial<CreateSessionDto>): Promise<TrainerSession> {
  const data = await apiFetch<unknown>(TRAINER_SESSIONS_API_ROUTES.update(id), {
    method: 'PATCH',
    body: JSON.stringify(dto),
  });
  return TrainerSessionSchema.parse(data);
}

/**
 * Cancels a session by ID.
 */
export async function cancelTrainerSession(id: string): Promise<void> {
  return apiFetch<void>(TRAINER_SESSIONS_API_ROUTES.cancel(id), { method: 'PATCH' });
}

/**
 * Marks attendance for a session by ID.
 */
export async function markTrainerSessionAttendance(id: string, memberIds: string[]): Promise<void> {
  return apiFetch<void>(TRAINER_SESSIONS_API_ROUTES.markAttendance(id), { 
    method: 'PATCH',
    body: JSON.stringify({ attendedMemberIds: memberIds }),
  });
}
