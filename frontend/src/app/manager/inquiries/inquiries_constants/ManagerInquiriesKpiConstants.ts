import { MessageSquare, Plus, Clock, CheckCircle } from 'lucide-react';

export const MANAGER_INQUIRIES_KPI_CONFIG = [
  { key: 'total', label: 'Total Inquiries', icon: MessageSquare, color: 'text-info', bg: 'bg-info' },
  { key: 'new', label: 'New', icon: Plus, color: 'text-warning', bg: 'bg-warning' },
  { key: 'followUp', label: 'Follow Up', icon: Clock, color: 'text-warning', bg: 'bg-warning' },
  { key: 'converted', label: 'Converted', icon: CheckCircle, color: 'text-success', bg: 'bg-success' },
] as const;
