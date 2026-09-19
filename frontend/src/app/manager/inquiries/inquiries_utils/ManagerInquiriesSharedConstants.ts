// RESPONSIBILITY: Centralized constants, Zod schema, and shared data for the Inquiries module. Single source of truth for all hardcoded values.

export const INQUIRIES_STATUS_LABELS: Record<string, string> = {
 NEW: 'New', 
 FOLLOW_UP: 'Follow Up', 
 CONVERTED: 'Converted', 
 LOST: 'Lost' };

export const INQUIRIES_STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  NEW: { bg: 'bg-info-bg', text: 'text-info' },
  FOLLOW_UP: { bg: 'bg-warning-bg', text: 'text-warning' },
  CONVERTED: { bg: 'bg-success-bg', text: 'text-success' },
  LOST: { bg: 'bg-danger-bg', text: 'text-danger' } };

export const INQUIRY_SOURCES = [
 'Walk-in', 'Call', 'Website', 'WhatsApp', 'Referral', 'Facebook', 'Instagram'
];



export const INQUIRIES_TABLE_HEADERS = [
  'Inquiry Name', 'Contact', 'Source', 'Status', 'Date', 'Actions'
];

export const INQUIRY_MODAL_FIELDS = [
 { label: 'Full Name', key: 'name', type: 'text', req: true },
 { label: 'Phone', key: 'phone', type: 'tel', req: true },
 { label: 'Email (optional)', key: 'email', type: 'email', req: false },
 { label: 'Notes', key: 'notes', type: 'text', req: false },
];

export const generateDefaultMessage = (name: string, interest: string) => {
 return `Hi ${name}! 👋\n\nThank you for your interest in GymSmart!\n\nWe received your inquiry about ${interest}. Our team will get in touch shortly.\n\n— Team GymSmart`;
};


/** Formats inquiry activity timestamps for consistent manager UI display. */
export function formatInquiryTime(value: Date | string): string {
  return new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit' }).format(new Date(value));
}
