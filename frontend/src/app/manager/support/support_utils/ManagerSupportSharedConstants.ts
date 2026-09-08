// RESPONSIBILITY: Centralized constants for the Manager Support module.

export const SUPPORT_TICKET_STATUS = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  RESOLVED: 'Resolved',
  CLOSED: 'Closed',
} as const;

export type SupportTicketStatus = typeof SUPPORT_TICKET_STATUS[keyof typeof SUPPORT_TICKET_STATUS];

export const SUPPORT_TICKET_STATUS_STYLES: Record<SupportTicketStatus, string> = {
  Open: 'bg-info-bg text-info',
  'In Progress': 'bg-warning-bg text-warning',
  Resolved: 'bg-success-bg text-success',
  Closed: 'bg-input text-secondary',
};

export const SUPPORT_ISSUE_CATEGORIES = [
  { value: 'billing', label: 'Billing Issue' },
  { value: 'technical', label: 'Technical Problem' },
  { value: 'member', label: 'Member Complaint' },
  { value: 'staff', label: 'Staff Issue' },
  { value: 'equipment', label: 'Equipment / Facility' },
  { value: 'other', label: 'Other' },
] as const;

export const SUPPORT_PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
] as const;
