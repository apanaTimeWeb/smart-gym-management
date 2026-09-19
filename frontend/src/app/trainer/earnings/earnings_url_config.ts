// RESPONSIBILITY: URL contracts owned exclusively by the Trainer Earnings feature.
export const EarningsUrlConfig = {
  PAGES: { LIST: '/trainer/earnings' },
  BACKEND_API: {
    DATA: '/trainer/earnings',
    KPIS: '/trainer/earnings/kpis',
    PENDING: '/trainer/earnings/pending',
    HISTORY: '/trainer/earnings/history',
    EXPORT_CSV: '/trainer/earnings/export?format=csv',
  },
} as const;
