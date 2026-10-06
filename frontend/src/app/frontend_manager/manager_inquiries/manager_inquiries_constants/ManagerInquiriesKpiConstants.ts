import { MessageSquare, Plus, Clock, CheckCircle } from 'lucide-react';

/**
 * @description Provides the ManagerInquiriesKpiConstants implementation for the inquiries module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_INQUIRIES_KPI_CONFIG = [
  { key: 'total', label: 'Total Inquiries', icon: MessageSquare, color: 'text-info', bg: 'bg-info-bg' },
  { key: 'new', label: 'New', icon: Plus, color: 'text-warning', bg: 'bg-warning-bg' },
  { key: 'followUp', label: 'Follow Up', icon: Clock, color: 'text-warning', bg: 'bg-warning-bg' },
  { key: 'converted', label: 'Converted', icon: CheckCircle, color: 'text-success', bg: 'bg-success-bg' },
] as const;
