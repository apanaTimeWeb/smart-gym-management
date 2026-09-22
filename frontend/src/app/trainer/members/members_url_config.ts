// RESPONSIBILITY: URL contracts owned exclusively by the Trainer Members feature.
export const MembersUrlConfig = {
  PAGES: { LIST: '/trainer/members', ADD: '/trainer/members' },
  BACKEND_API: {
    BASE: '/trainer/members',
    STATS: '/trainer/members/stats',
    GET_ONE: (id: string) => `/trainer/members/${id}`,
    UPDATE: (id: string) => `/trainer/members/${id}`,
    NOTES: (id: string) => `/trainer/members/${id}/notes`,
    ATTENDANCE: (id: string) => `/trainer/members/${id}/attendance`,
    DIET_PLANS: '/trainer/library/diet-plans',
    WORKOUT_PLANS: '/trainer/workout/workouts',
    PROGRESS_ENTRIES: (id: string) => `/trainer/progress-tracking/${id}/entries`,
    WHATSAPP: (phone: string, message: string) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    MAILTO: (email: string, subject: string, body: string) => `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  },
} as const;
