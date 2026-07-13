export type FetchState = 'idle' | 'loading' | 'success' | 'error';
export interface DashboardContextType { stats: DashboardStats | null; status: FetchState; error: string; }
export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  newMembersThisMonth: number;
  totalRevenue: number;
  monthlyRevenue: number;
  pendingPayments: number;
  totalStaff: number;
  activeStaff: number;
  totalProducts: number;
  lowStockCount: number;
  totalInquiries: number;
  newInquiries: number;
  memberGrowth: { month: string; count: number }[];
  revenueChart: { month: string; revenue: number }[];
  membersByPlan: { plan: string; count: number }[];
  membersByStatus: { active: number; pending: number; expired: number };
  recentMembers: RecentMember[];
  recentPayments: RecentPayment[];
  pendingPaymentsList: PendingPayment[];
}
export interface RecentMember {
  id: number; name: string; plan: string; status: string;
  joinDate: string; paidAmount: number;
}
export interface RecentPayment {
  id: number; invoiceNo: string; amount: number; method: string; paidAt: string;
  member: { name: string };
}
export interface PendingPayment {
  id: number; name: string; pendingAmount: number; expiryDate: string;
}
