// RESPONSIBILITY: Defines static notification presentation styles and filter options.
export const NOTIFICATION_TYPE_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  SYSTEM: { bg: 'bg-input', text: 'text-secondary', label: 'System' },
  PAYMENT: { bg: 'bg-success-bg', text: 'text-success', label: 'Payment' },
  EXPIRY: { bg: 'bg-danger-bg', text: 'text-danger', label: 'Expiry' },
  ATTENDANCE: { bg: 'bg-info-bg', text: 'text-info', label: 'Attendance' },
  INQUIRY: { bg: 'bg-warning-bg', text: 'text-warning', label: 'Inquiry' },
  ANNOUNCEMENT: { bg: 'bg-primary-subtle', text: 'text-primary', label: 'Announcement' } };

export const NOTIFICATION_PRIORITY_STYLES: Record<string, { bg: string; text: string }> = {
  HIGH: { bg: 'bg-danger-bg', text: 'text-danger' },
  MEDIUM: { bg: 'bg-warning-bg', text: 'text-warning' },
  LOW: { bg: 'bg-info-bg', text: 'text-info' } };

export const NOTIFICATION_TYPE_OPTIONS = ['ALL', 'PAYMENT', 'EXPIRY', 'ATTENDANCE', 'INQUIRY', 'ANNOUNCEMENT', 'SYSTEM'];
export const NOTIFICATION_PRIORITY_OPTIONS = ['ALL', 'HIGH', 'MEDIUM', 'LOW'];
export const NOTIFICATION_STATUS_OPTIONS = ['ALL', 'UNREAD', 'READ'];
