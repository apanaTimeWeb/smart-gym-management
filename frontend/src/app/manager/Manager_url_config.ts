// RESPONSIBILITY: Single Manager-module URL contract containing all Manager-owned page routes and API endpoints.
// This file is the only Manager URL configuration source; feature code imports the named config object it needs from here.

export const AttendanceUrlConfig = {
  UI: {
    HOME: '/manager/attendance',
  },
  BACKEND_API: {
    BASE: '/manager/attendance',
    STATS: '/manager/attendance/stats'
  }
};

export const CommunicationsUrlConfig = {
  UI: {
    HOME: '/manager/communications',
  },
  BACKEND_API: {
    BASE: '/manager/communications',
    STATS: '/manager/communications/stats'
  }
};

export const DashboardUrlConfig = {
  PAGES: {
    HOME: '/manager/dashboard',
  },
  BACKEND_API: {
    STATS: '/manager/dashboard/stats',
    CHARTS: '/manager/dashboard/charts',
    RECENT: '/manager/dashboard/recent',
  }
};

export const ExpensesUrlConfig = {
  UI: {
    HOME: '/manager/expenses',
  },
  BACKEND_API: {
    BASE: '/manager/expenses',
    STATS: '/manager/expenses/stats'
  }
};

export const FinanceUrlConfig = {
  PAGES: { LIST: '/manager/finance' },
  BACKEND_API: {
    BASE: '/manager/finance',
    PAYMENTS_BASE: '/manager/finance/payments',
    SUMMARY: '/manager/finance/summary',
    PAYMENTS_BY_MEMBER: (memberId: string) => `/manager/finance/payments-by-member/${memberId}`,
    EXPORT: '/manager/finance/transactions/export',
    CHART: '/manager/finance/chart'
  }
};

export const ManagerFinanceUrlConfig = FinanceUrlConfig;

export const HrUrlConfig = {
  PAGES: {
    STAFF_LIST: '/manager/hr',
    PAYROLL: '/manager/hr',
  },
  BACKEND_API: {
    BASE: '/manager/hr',
    STAFF_BASE: '/manager/hr/staff',
    STAFF_GET_ONE: (id: string) => `/manager/hr/staff/${id}`,
    STAFF_UPDATE: (id: string) => `/manager/hr/staff/${id}`,
    STAFF_DELETE: (id: string) => `/manager/hr/staff/${id}`,
    PAYROLLS_BASE: '/manager/hr/payrolls',
    PAYROLL_GENERATE: '/manager/hr/payrolls/generate',
    PAYROLL_STATUS_UPDATE: (id: string) => `/manager/hr/payrolls/${id}/status`,
    SUMMARY: '/manager/hr/summary',
  }
};

export const InquiriesUrlConfig = {
  UI: {
    HOME: '/manager/inquiries',
  },
  BACKEND_API: {
    BASE: '/manager/inquiries',
    STATS: '/manager/inquiries/stats'
  }
};

export const LibraryUrlConfig = {
  PAGES: {
    LIBRARY: '/manager/library',
  },
  BACKEND_API: {
    BASE: '/manager/library',
    EXERCISES_BASE: '/manager/library/exercises',
    EXERCISE_UPDATE: (id: string) => `/manager/library/exercises/${id}`,
    EXERCISE_DELETE: (id: string) => `/manager/library/exercises/${id}`,
    DIET_PLANS_BASE: '/manager/library/diet-plans',
    DIET_PLAN_UPDATE: (id: string) => `/manager/library/diet-plans/${id}`,
    DIET_PLAN_DELETE: (id: string) => `/manager/library/diet-plans/${id}`,
  }
};

export const MembersUrlConfig = {
  PAGES: {
    LIST: '/manager/members',
    ADD: '/manager/members',
  },
  BACKEND_API: {
    BASE: '/manager/members',
    STATS: '/manager/members/stats',
    PLANS_SNAPSHOT: '/manager/members/plans',
    RENEW: (id: string) => `/manager/members/${id}/renew`,
    GET_ONE: (id: string) => `/manager/members/${id}`,
    UPDATE: (id: string) => `/manager/members/${id}`,
    DELETE: (id: string) => `/manager/members/${id}`,
    POST_PAYMENT: (id: string) => `/manager/members/${id}/payments`,
    EXPORT: '/manager/members/export',
    RESEND_WELCOME: (id: string) => `/manager/members/${id}/resend-welcome`,
  }
};

export const NotificationsUrlConfig = {
  UI: {
    HOME: '/manager/notifications',
  },
  BACKEND_API: {
    BASE: '/manager/notifications',
    STATS: '/manager/notifications/stats'
  }
};

export const PlansUrlConfig = {
  PAGES: { LIST: '/manager/plans' },
  BACKEND_API: {
    BASE: '/manager/plans',
    MEMBERSHIP_OVERVIEW: '/manager/plans/membership-overview',
    MEMBERSHIP_ACTIVATE: '/manager/plans/membership-activate',
    MEMBERSHIP_RENEW: '/manager/plans/membership-renew',
    MEMBERSHIP_FREEZE: '/manager/plans/membership-freeze',
    CHANGE_REQUESTS: '/manager/plans/change-requests',
    GET_ONE: (id: string) => `/manager/plans/${id}`,
    UPDATE: (id: string) => `/manager/plans/${id}`,
    DELETE: (id: string) => `/manager/plans/${id}`
  }
};

export const ManagerPlansUrlConfig = PlansUrlConfig;

export const ProfileUrlConfig = {
  UI: {
    HOME: '/manager/profile',
  },
  BACKEND_API: {
    BASE: '/manager/profile',
    STATS: '/manager/profile/stats'
  }
};

export const PtUrlConfig = {
  UI: {
    HOME: '/manager/pt',
  },
  BACKEND_API: {
    BASE: '/manager/pt',
    STATS: '/manager/pt/stats'
  }
};

export const ReferralsUrlConfig = {
  UI: {
    HOME: '/manager/referrals',
  },
  BACKEND_API: {
    BASE: '/manager/referrals',
    STATS: '/manager/referrals/stats'
  }
};

export const ManagerReportsUrlConfig = {
  PAGES: { LIST: '/manager/reports' },
  BACKEND_API: {
    BASE: '/manager/reports',
    SUMMARY: '/manager/reports/summary',
    REVENUE: '/manager/reports/revenue',
    ATTENDANCE: '/manager/reports/attendance',
    MEMBERS: '/manager/reports/members',
    EXPENSES: '/manager/reports/expenses',
    EXPORT: '/manager/reports/export',
  },
};

export const SalesUrlConfig = {
  UI: {
    HOME: '/manager/sales',
  },
  BACKEND_API: {
    BASE: '/manager/sales',
    STATS: '/manager/sales/stats'
  }
};

export const ScheduleUrlConfig = {
  UI: {
    HOME: '/manager/schedule',
  },
  BACKEND_API: {
    BASE: '/manager/schedule',
    STATS: '/manager/schedule/stats'
  }
};

export const SettingsUrlConfig = {
  UI: {
    HOME: '/manager/settings',
  },
  BACKEND_API: {
    BASE: '/manager/settings',
    STATS: '/manager/settings/stats'
  }
};

export const StoreUrlConfig = {
  PAGES: {
    PRODUCTS: '/manager/store',
    ORDERS: '/manager/store',
  },
  BACKEND_API: {
    BASE: '/manager/store',
    PRODUCTS_BASE: '/manager/store/products',
    PRODUCT_UPDATE: (id: string) => `/manager/store/products/${id}`,
    PRODUCT_DELETE: (id: string) => `/manager/store/products/${id}`,
    ORDERS_BASE: '/manager/store/orders',
    SUMMARY: '/manager/store/summary',
  }
};

export const WorkoutUrlConfig = {
  UI: {
    HOME: '/manager/workout',
  },
  BACKEND_API: {
    BASE: '/manager/workout',
    WORKOUTS_BASE: '/manager/workouts',
    EXERCISES_BASE: '/manager/workouts/exercises',
    STATS: '/manager/workout/stats'
  }
};

// Backward-compatible semantic aliases used by Manager feature API modules.
export const ManagerAttendanceUrlConfig = AttendanceUrlConfig;
export const ManagerCommunicationsUrlConfig = CommunicationsUrlConfig;
export const ManagerDashboardUrlConfig = DashboardUrlConfig;
export const ManagerExpensesUrlConfig = ExpensesUrlConfig;
export const ManagerHrUrlConfig = HrUrlConfig;
export const ManagerInquiriesUrlConfig = InquiriesUrlConfig;
export const ManagerLibraryUrlConfig = LibraryUrlConfig;
export const ManagerMembersUrlConfig = MembersUrlConfig;
export const ManagerNotificationsUrlConfig = NotificationsUrlConfig;
export const ManagerProfileUrlConfig = ProfileUrlConfig;
export const ManagerPtUrlConfig = PtUrlConfig;
export const ManagerReferralsUrlConfig = ReferralsUrlConfig;
export const ManagerSalesUrlConfig = SalesUrlConfig;
export const ManagerSettingsUrlConfig = SettingsUrlConfig;
export const ManagerStoreUrlConfig = StoreUrlConfig;
export const ManagerWorkoutUrlConfig = WorkoutUrlConfig;
