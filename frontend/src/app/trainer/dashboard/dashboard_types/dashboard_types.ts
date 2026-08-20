// RESPONSIBILITY: Defines strict types for the Dashboard module, including comprehensive KPI stats and recent activity shapes.
export type FetchState = 'idle' | 'loading' | 'success' | 'error';
export interface DashboardContextType { stats: DashboardStats | null; status: FetchState; error: string; }

export interface RecentMember {
  id: string; 
  name: string; 
  plan: string | { name: string }; 
  status: string;
  joinDate: string; 
  paidAmount: number;
}

export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  newMembersThisMonth: number;
  membersByPlan: { plan: string; count: number }[];
  membersByStatus: { active: number; pending: number; expired: number };
  recentMembers: RecentMember[];
}
