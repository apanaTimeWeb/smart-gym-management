import { z } from 'zod';
// RESPONSIBILITY: All TypeScript types for the Superadmin Franchises module.
export const FranchiseStatusSchema = z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED']);
export type FranchiseStatus = z.infer<typeof FranchiseStatusSchema>;
export const SuperadminFranchiseSchema = z.object({
    id: z.string(),
    franchiseName: z.string(),
    ownerName: z.string(),
    ownerEmail: z.string(),
    phone: z.string(),
    status: FranchiseStatusSchema,
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
export type SuperadminFranchise = z.infer<typeof SuperadminFranchiseSchema>;
