// RESPONSIBILITY: TypeScript types for the Manager Support module.

export type SupportTicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
export type SupportIssueCategory = 'BILLING' | 'TECHNICAL' | 'FEATURE_REQUEST' | 'OTHER';

export interface ManagerSupportTicket {
  id: string;
  ticketRef: string;
  subject: string;
  category: SupportIssueCategory;
  status: SupportTicketStatus;
  createdAt: string;
  resolvedAt: string | null;
}

export interface CreateSupportTicketPayload {
  category: SupportIssueCategory;
  subject: string;
  message: string;
}

export type SupportFetchState = 'idle' | 'loading' | 'success' | 'error';

export const SUPPORT_ISSUE_CATEGORIES: { label: string; value: SupportIssueCategory }[] = [
  { label: 'Billing / Invoice Issue', value: 'BILLING' },
  { label: 'Technical Problem', value: 'TECHNICAL' },
  { label: 'Feature Request', value: 'FEATURE_REQUEST' },
  { label: 'Other Enquiry', value: 'OTHER' },
];

export const SUPPORT_TICKET_STATUS_STYLES: Record<SupportTicketStatus, string> = {
  OPEN: 'bg-info-bg text-info border border-info/20',
  IN_PROGRESS: 'bg-warning/10 text-warning border border-warning/20',
  RESOLVED: 'bg-success-bg text-success border border-success/20',
  CLOSED: 'bg-input text-secondary border border-border',
};
