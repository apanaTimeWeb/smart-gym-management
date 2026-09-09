// RESPONSIBILITY: Centralized URL configuration for all Dashboard module API endpoints and page routes.
export const DashboardUrlConfig = {
  PAGES: {
    HOME: '/admin/dashboard',
  },
  BACKEND_API: {
    STATS: (from?: string, to?: string, branchId?: string) => {
      const params = new URLSearchParams();
      if (from) params.append('from', from);
      if (to) params.append('to', to);
      if (branchId) params.append('branchId', branchId);
      const query = params.toString();
      return query ? `/admin/dashboard?${query}` : '/admin/dashboard';
    },
    CHARTS: (from?: string, to?: string, branchId?: string) => {
      const params = new URLSearchParams();
      if (from) params.append('from', from);
      if (to) params.append('to', to);
      if (branchId) params.append('branchId', branchId);
      const query = params.toString();
      return query ? `/admin/dashboard/charts?${query}` : '/admin/dashboard/charts';
    },
    RECENT: (from?: string, to?: string, branchId?: string) => {
      const params = new URLSearchParams();
      if (from) params.append('from', from);
      if (to) params.append('to', to);
      if (branchId) params.append('branchId', branchId);
      const query = params.toString();
      return query ? `/admin/dashboard/recent?${query}` : '/admin/dashboard/recent';
    },
  }
};

