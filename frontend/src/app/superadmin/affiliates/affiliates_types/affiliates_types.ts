// RESPONSIBILITY: Defines all TypeScript types, Zod schemas, and form data shapes for the Affiliates module. Single source of truth for affiliate data contracts.
import { z } from 'zod';
import type { Affiliate, AffiliateStatus } from '@/app/superadmin/superadmin_types/superadmin_types';

export type { Affiliate, AffiliateStatus };

export const AffiliateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  referralCode: z.string().min(3, 'Code must be at least 3 characters').regex(/^[A-Z0-9]+$/, 'Only uppercase letters and numbers allowed'),
});

export type AffiliateFormData = z.infer<typeof AffiliateSchema>;

export interface AffiliatesHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
}

export interface AffiliatesStatsBarProps {
  totalAffiliates: number;
  totalCommission: number;
}

export interface AffiliatesTableProps {
  affiliates: Affiliate[];
  onToggleStatus: (id: string, status: AffiliateStatus) => void;
  onEdit: (affiliate: Affiliate) => void;
  onDelete: (id: string) => void;
}

export interface AffiliatesTableRowProps {
  affiliate: Affiliate;
  onToggleStatus: (id: string, status: AffiliateStatus) => void;
  onEdit: (affiliate: Affiliate) => void;
  onDelete: (id: string) => void;
}

export interface AffiliateStatusBadgeProps {
  status: AffiliateStatus;
}

export interface AffiliatesEmptyStateProps {
  onAddClick: () => void;
}
