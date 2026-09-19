// RESPONSIBILITY: Defines named mutation contracts for Superadmin franchise lifecycle operations.
import type { FranchiseFormValues } from '@/app/superadmin/franchises/franchises_utils/SuperadminFranchisesSchemas';
export interface SuperadminFranchiseMutationTarget { id: string; idempotencyKey: string; }
export interface SuperadminFranchiseUpdateInput { id: string; payload: FranchiseFormValues; idempotencyKey: string; }
