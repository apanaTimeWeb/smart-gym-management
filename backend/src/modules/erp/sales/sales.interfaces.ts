export interface SalesOverviewResponse { success: boolean; message: string; data: { monthlyRevenue: any[]; } }
export interface MembershipReportResponse { success: boolean; message: string; data: { report: any[]; totals: any; } }
export interface PendingPaymentsResponse { success: boolean; message: string; data: { members: any[]; total: number; page: number; limit: number; } }
export interface AllMembershipsResponse { success: boolean; message: string; data: { members: any[]; total: number; page: number; limit: number; } }

export enum SalesStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}
