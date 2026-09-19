// RESPONSIBILITY: URL contracts owned exclusively by the Trainer Progress Tracking feature.
export const ProgressUrlConfig = {
  PAGES: { LIST: '/trainer/progress-tracking' },
  BACKEND_API: {
    MEMBERS: '/trainer/progress-tracking/members',
    ENTRIES: (memberId: string) => `/trainer/progress-tracking/${memberId}/entries`,
    ENTRY_DETAIL: (memberId: string, entryId: string) => `/trainer/progress-tracking/${memberId}/entries/${entryId}`,
    SUMMARY: (memberId: string) => `/trainer/progress-tracking/${memberId}/summary`,
  },
} as const;
