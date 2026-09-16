// RESPONSIBILITY: Defines static notification presentation styles and filter options.
export const NOTIFICATION_TYPE_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  SYSTEM: { bg: 'bg-secondary/10', text: 'text-secondary', label: 'System' },
  PAYMENT: { bg: 'bg-success/10', text: 'text-success', label: 'Payment' },
  EXPIRY: { bg: 'bg-danger/10', text: 'text-danger', label: 'Expiry' },
  ATTENDANCE: { bg: 'bg-info/10', text: 'text-info', label: 'Attendance' },
  INQUIRY: { bg: 'bg-warning/10', text: 'text-warning', label: 'Inquiry' },
  ANNOUNCEMENT: { bg: 'bg-primary/10', text: 'text-primary', label: 'Announcement' },
};

export const NOTIFICATION_PRIORITY_STYLES: Record<string, { bg: string; text: string }> = {
  HIGH: { bg: 'bg-danger/10', text: 'text-danger' },
  MEDIUM: { bg: 'bg-warning/10', text: 'text-warning' },
  LOW: { bg: 'bg-info/10', text: 'text-info' },
};

export const NOTIFICATION_TYPE_OPTIONS = ['ALL', 'PAYMENT', 'EXPIRY', 'ATTENDANCE', 'INQUIRY', 'ANNOUNCEMENT', 'SYSTEM'];
export const NOTIFICATION_PRIORITY_OPTIONS = ['ALL', 'HIGH', 'MEDIUM', 'LOW'];
export const NOTIFICATION_STATUS_OPTIONS = ['ALL', 'UNREAD', 'READ'];
