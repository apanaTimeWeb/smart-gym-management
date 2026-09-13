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

import { MOCK_TRAINER_SESSIONS } from '@/app/trainer/sessions/sessions_fixtures/TrainerSessionsMockData';

/**
 * Fetches all sessions for the authenticated trainer on a given date.
 */
export async function fetchTrainerSessions(date: string): Promise<TrainerSession[]> {
  await new Promise(res => setTimeout(res, 600)); // Simulate latency
  return z.array(TrainerSessionSchema).parse(MOCK_TRAINER_SESSIONS);
}

/**
 * Creates a new PT session.
 */
export async function createTrainerSession(dto: CreateSessionDto): Promise<TrainerSession> {
  await new Promise(res => setTimeout(res, 600));
  const newSession: TrainerSession = {
    id: `s${Math.random().toString(36).substring(7)}`,
    title: dto.type === 'PT' ? 'PT Session' : 'Group Session',
    type: dto.type,
    sessionDate: dto.date,
    time: dto.time,
    duration: dto.duration,
    status: 'Upcoming',
    attendees: 0,
    isOnline: false,
    member: dto.memberId || undefined,
    location: dto.location,
    room: dto.room,
  };
  return TrainerSessionSchema.parse(newSession);
}

/**
 * Updates an existing session by ID.
 */
export async function updateTrainerSession(id: string, dto: Partial<CreateSessionDto>): Promise<TrainerSession> {
  await new Promise(res => setTimeout(res, 600));
  const session = MOCK_TRAINER_SESSIONS.find(s => s.id === id) || MOCK_TRAINER_SESSIONS[0];
  return TrainerSessionSchema.parse({ ...session, ...dto });
}

/**
 * Cancels a session by ID.
 */
export async function cancelTrainerSession(id: string): Promise<void> {
  await new Promise(res => setTimeout(res, 600));
  return;
}

/**
 * Marks attendance for a session by ID.
 */
export async function markTrainerSessionAttendance(id: string, memberIds: string[]): Promise<void> {
  await new Promise(res => setTimeout(res, 600));
  return;
}
