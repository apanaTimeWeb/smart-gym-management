"use client";
// RESPONSIBILITY: Derives session KPI values from the Trainer Sessions query result. No rendering or API ownership.
// DATA FLOW: Session query data → KPI derivation → display-ready session statistics → Sessions UI.
import { format } from 'date-fns';

import { TRAINER_SESSIONS_SESSION_STATUS } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_constants/TrainerSessionsConstants';

import type { TrainerSessionsKpiValues } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_types/TrainerSessionsKpiValues';

import type { TrainerSessionsTrainerSession } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_types/TrainerSessionsTypes';







/**
 * @description Owns useTrainerSessionsKpis behavior in the Trainer module.
 * @dependencies Session query data → KPI derivation → display-ready session statistics → Sessions UI.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerSessionsKpis state and data flow for the sessions feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented sessions module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerSessionsKpis(sessions: TrainerSessionsTrainerSession[]): TrainerSessionsKpiValues {
  const today = format(new Date(), 'yyyy-MM-dd');
  const todaySessions = sessions.filter((session) => session.sessionDate === today);
  const completedThisWeek = sessions.filter((session) => session.status === TRAINER_SESSIONS_SESSION_STATUS.COMPLETED).length;
  const noShowsThisMonth = sessions.filter((session) => session.status === TRAINER_SESSIONS_SESSION_STATUS.NO_SHOW && session.sessionDate.startsWith(today.slice(0, 7))).length;
  const measurable = sessions.filter((session) => session.maxAttendees && session.maxAttendees > 0);
  const avgAttendanceRate = measurable.length === 0 ? 0 : Math.round((measurable.reduce((sum, session) => sum + (session.attendees / (session.maxAttendees ?? 1)) * 100, 0) / measurable.length) * 10) / 10;
  return { todayCount: todaySessions.length, completedThisWeek, noShowsThisMonth, avgAttendanceRate };
}
