import { DashboardStats } from '@/lib/api';

export interface DashboardContextType {
  stats: DashboardStats | null;
  loading: boolean;
  error: string;
}

export type { DashboardStats };
