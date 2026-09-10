// RESPONSIBILITY: Centralized URL config for the Trainer Progress Tracking module.
// Rule 11: Single URL config file per module. This is the ONLY file for progress routes.
// Bug #4 fix: Merged TrainerProgressUrlConfig.ts (which was unused/orphaned) into this file.
//   The old TrainerProgressUrlConfig.ts has been deleted.

/** Frontend page routes for Progress Tracking module */
export const TRAINER_PROGRESS_ROUTES = {
  index: '/trainer/progress-tracking',
} as const;

/** Backend API routes for Progress Tracking module */
export const TRAINER_PROGRESS_API_ROUTES = {
  // GET /api/v1/trainer/members/:memberId/progress
  list: (memberId: string) => `/api/v1/trainer/members/${memberId}/progress`,
  // POST /api/v1/trainer/members/:memberId/progress
  create: (memberId: string) => `/api/v1/trainer/members/${memberId}/progress`,
  // PATCH /api/v1/trainer/members/:memberId/progress/:entryId
  update: (memberId: string, entryId: string) => `/api/v1/trainer/members/${memberId}/progress/${entryId}`,
  // DELETE /api/v1/trainer/members/:memberId/progress/:entryId
  delete: (memberId: string, entryId: string) => `/api/v1/trainer/members/${memberId}/progress/${entryId}`,
  // GET /api/v1/trainer/members/:memberId/progress/summary
  summary: (memberId: string) => `/api/v1/trainer/members/${memberId}/progress/summary`,
  // GET /api/v1/trainer/members/:memberId/progress/export?format=pdf|csv
  export: (memberId: string, format: 'pdf' | 'csv' = 'pdf') =>
    `/api/v1/trainer/members/${memberId}/progress/export?format=${format}`,
} as const;
