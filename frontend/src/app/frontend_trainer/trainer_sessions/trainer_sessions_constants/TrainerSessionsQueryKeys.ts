// RESPONSIBILITY: Canonical TanStack Query key registry for Trainer Sessions server state.
import type { TrainerSessionsListQueryParams } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_types/TrainerSessionsListQueryParams';

export const TRAINER_SESSIONS_QUERY_KEYS = {
  all: ['trainer_sessions'] as const,
  lists: () => [...TRAINER_SESSIONS_QUERY_KEYS.all, 'list'] as const,
  list: (params: TrainerSessionsListQueryParams) => [...TRAINER_SESSIONS_QUERY_KEYS.lists(), params] as const,
  members: () => [...TRAINER_SESSIONS_QUERY_KEYS.all, 'membersBasic'] as const,
} as const;
