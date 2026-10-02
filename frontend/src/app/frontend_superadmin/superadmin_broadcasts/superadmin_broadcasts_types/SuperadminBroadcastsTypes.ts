import { z } from 'zod';

import { BroadcastStatusSchema, BroadcastAudienceSchema, BroadcastResponseSchema, BroadcastSchema, SuperadminBroadcastsTenantSchema } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_schemas/SuperadminBroadcastsContractSchemas';

import type { SUPERADMIN_BROADCAST_STATUS_FILTER_CODES } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_constants/SuperadminBroadcastsBroadcastConstants';


/**
 * RESPONSIBILITY: Defines TypeScript domain contracts for the feature.
 * AI BOUNDARY: Types/interfaces only; runtime validation schemas live in the owning _schemas folder.
 */
// RESPONSIBILITY: Defines all TypeScript types, Zod schemas, and form data shapes for the Broadcasts module. Single source of truth for broadcast data contracts.
export type BroadcastStatus = z.infer<typeof BroadcastStatusSchema>;
export type BroadcastAudience = z.infer<typeof BroadcastAudienceSchema>;

export type BroadcastStatusFilter = keyof typeof SUPERADMIN_BROADCAST_STATUS_FILTER_CODES;export type Broadcast = z.infer<typeof BroadcastResponseSchema>;export type BroadcastFormData = z.infer<typeof BroadcastSchema>;
export interface SuperadminBroadcastsHeaderProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    statusFilter?: BroadcastStatusFilter;
    onStatusFilterChange?: (value: BroadcastStatusFilter) => void;
    onCreateClick: () => void;
}
export interface SuperadminBroadcastsTableProps {
    broadcasts: Broadcast[];
    onSend: (id: string) => void;
    onEdit: (broadcast: Broadcast) => void;
    onDelete: (id: string) => void;
    onCreateClick: () => void;
}
export interface SuperadminBroadcastStatusBadgeProps {
    status: BroadcastStatus;
}
export interface SuperadminBroadcastsEmptyStateProps {
    onCreateClick: () => void;
}export type SuperadminBroadcastsTenant = z.infer<typeof SuperadminBroadcastsTenantSchema>;
