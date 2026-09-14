export const ProgressUrlConfig = {
  BACKEND_API: {
    MEMBERS: '/trainer/progress-tracking/members',
    ENTRIES: (memberId: string) => `/trainer/progress-tracking/${memberId}/entries`,
    ENTRY_DETAIL: (memberId: string, entryId: string) => `/trainer/progress-tracking/${memberId}/entries/${entryId}`,
    SUMMARY: (memberId: string) => `/trainer/progress-tracking/${memberId}/summary`,
  }
};
