// RESPONSIBILITY: Centralized URL config for the Trainer Progress Tracking module.

export const TRAINER_PROGRESS_ROUTES = {
  index: '/trainer/progress-tracking',
} as const;

export const TRAINER_PROGRESS_API_ROUTES = {
  list: (memberId: string) => `/api/v1/trainer/members/${memberId}/progress`,
  create: (memberId: string) => `/api/v1/trainer/members/${memberId}/progress`,
  update: (memberId: string, entryId: string) => `/api/v1/trainer/members/${memberId}/progress/${entryId}`,
  delete: (memberId: string, entryId: string) => `/api/v1/trainer/members/${memberId}/progress/${entryId}`,
  summary: (memberId: string) => `/api/v1/trainer/members/${memberId}/progress/summary`,
  export: (memberId: string, format: 'pdf' | 'csv' = 'pdf') => `/api/v1/trainer/members/${memberId}/progress/export?format=${format}`,
} as const;
