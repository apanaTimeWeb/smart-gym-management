// RESPONSIBILITY: Defines all TypeScript types, Zod schemas, and form data shapes for the Broadcasts module. Single source of truth for broadcast data contracts.
import { z } from 'zod';

export const BroadcastStatusSchema = z.enum(['SENT', 'SCHEDULED', 'DRAFT']);
export type BroadcastStatus = z.infer<typeof BroadcastStatusSchema>;

export const BroadcastAudienceSchema = z.enum(['ALL_TENANTS', 'PRO_ONLY', 'SUSPENDED_ONLY']);
export type BroadcastAudience = z.infer<typeof BroadcastAudienceSchema>;

export type BroadcastStatusFilter = 'ALL' | BroadcastStatus | 'FAILED';

export const BroadcastResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  status: BroadcastStatusSchema,
  targetGymIds: z.array(z.string()),
  scheduledDate: z.string().nullable().optional(),
  sentDate: z.string().nullable().optional(),
  totalRecipients: z.number().optional(),
  deliveredCount: z.number().optional(),
  failedCount: z.number().optional(),
  audience: BroadcastAudienceSchema.optional(),
});
export type Broadcast = z.infer<typeof BroadcastResponseSchema>;

export const BroadcastSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  content: z.string().min(5, 'Content must be at least 5 characters'),
  targetGymIds: z.array(z.string()).min(1, 'Select at least one gym'),
  status: z.enum(['DRAFT', 'SCHEDULED', 'SENT']),
  scheduledDate: z.string().optional().nullable(),
}).refine((data) => {
  if (data.status === 'SCHEDULED' && !data.scheduledDate) return false;
  return true;
}, { message: 'Scheduled date is required when status is SCHEDULED', path: ['scheduledDate'] });

export type BroadcastFormData = z.infer<typeof BroadcastSchema>;

export interface BroadcastsHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter?: 'ALL' | 'DRAFT' | 'SCHEDULED' | 'SENT' | 'FAILED';
  onStatusFilterChange?: (value: 'ALL' | 'DRAFT' | 'SCHEDULED' | 'SENT' | 'FAILED') => void;
  onCreateClick: () => void;
}

export interface BroadcastsTableProps {
  broadcasts: Broadcast[];
  onSend: (id: string) => void;
  onEdit: (broadcast: Broadcast) => void;
  onDelete: (id: string) => void;
  onCreateClick: () => void;
}

export interface BroadcastStatusBadgeProps {
  status: BroadcastStatus;
}

export interface BroadcastsEmptyStateProps {
  onCreateClick: () => void;
}

export const SuperadminBroadcastsTenantSchema = z.object({
  id: z.string(),
  name: z.string(),
  plan: z.string(),
  ownerName: z.string().optional(),
  phone: z.string().optional(),
});
export type SuperadminBroadcastsTenant = z.infer<typeof SuperadminBroadcastsTenantSchema>;
