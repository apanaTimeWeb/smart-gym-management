import { z } from 'zod';
// RESPONSIBILITY: All TypeScript types for the Superadmin Franchises module.

export type FranchiseStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface SuperadminFranchise {
  id: string;
  franchiseName: string;
  ownerName: string;
  ownerEmail: string;
  phone: string;
  status: FranchiseStatus;
  branchCount: number;
  totalMembers: number;
  totalStaff: number;
  totalMonthlyRevenue: number;
  plan: string;
  city: string;
  state: string;
  gstin?: string;
  registrationNumber?: string;
  contractStartDate?: string;
  createdAt: string;
}

export type FranchisesFetchState = 'idle' | 'loading' | 'success' | 'error';


export const SuperadminFranchiseSchema = z.object({
  id: z.string(),
  franchiseName: z.string(),
  ownerName: z.string(),
  ownerEmail: z.string(),
  phone: z.string(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED']),
  branchCount: z.number(),
  totalMembers: z.number(),
  totalStaff: z.number(),
  totalMonthlyRevenue: z.number(),
  plan: z.string(),
  city: z.string(),
  state: z.string(),
  gstin: z.string().optional(),
  registrationNumber: z.string().optional(),
  contractStartDate: z.string().optional(),
  createdAt: z.string()
});
