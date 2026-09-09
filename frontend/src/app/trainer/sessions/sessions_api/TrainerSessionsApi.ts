// RESPONSIBILITY: API functions for the Trainer Sessions module. All calls go through apiFetch.
// DATA FLOW: TrainerSessionsApi → sessions_context → TrainerSessionsMain

import { apiFetch } from '@/lib/api';
import type { TrainerSession } from '@/app/trainer/sessions/sessions_types/TrainerSessionsTypes';
import { TRAINER_SESSIONS_API_ROUTES } from '@/app/trainer/sessions/sessions_utils/sessions_url_config';

export interface CreateSessionDto {
  memberId: string;
  date: string;
  time: string;
  duration: string;
  type: 'PT' | 'Group';
}

/**
 * Fetches all sessions for the authenticated trainer on a given date.
 */
export async function fetchTrainerSessions(date: string): Promise<TrainerSession[]> {
  return apiFetch<TrainerSession[]>(`${TRAINER_SESSIONS_API_ROUTES.list}?date=${date}`);
}

/**
 * Creates a new PT session.
 */
export async function createTrainerSession(dto: CreateSessionDto): Promise<TrainerSession> {
  return apiFetch<TrainerSession>(TRAINER_SESSIONS_API_ROUTES.create, {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}

/**
 * Updates an existing session by ID.
 */
export async function updateTrainerSession(id: string, dto: Partial<CreateSessionDto>): Promise<TrainerSession> {
  return apiFetch<TrainerSession>(TRAINER_SESSIONS_API_ROUTES.update(id), {
    method: 'PATCH',
    body: JSON.stringify(dto),
  });
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
