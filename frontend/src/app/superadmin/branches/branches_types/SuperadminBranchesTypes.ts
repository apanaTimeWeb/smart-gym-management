import { z } from 'zod';
// RESPONSIBILITY: All TypeScript types for the Superadmin Branches module.
export type BranchStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
export interface SuperadminBranch {
    id: string;
    tenantId: string;
    tenantName: string;
    branchName: string;
    location: string;
    city: string;
    state: string;
    managerName: string;
    managerEmail: string;
    phone: string;
    status: BranchStatus;
    memberCount: number;
    staffCount: number;
    monthlyRevenue: number;
    createdAt: string;
}
export const SuperadminBranchSchema = z.object({
    id: z.string(),
    tenantId: z.string(),
    tenantName: z.string(),
    branchName: z.string(),
    location: z.string(),
    city: z.string(),
    state: z.string(),
    managerName: z.string(),
    managerEmail: z.string().email(),
    phone: z.string(),
    status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED']),
    memberCount: z.number(),
    staffCount: z.number(),
    monthlyRevenue: z.number(),
    createdAt: z.string(),
});

export type SuperadminBranchStatusFilter = 'ALL' | BranchStatus;
