// RESPONSIBILITY: InquiriesSharedConstants.ts handles the logic and UI for its corresponding feature.
import { z } from 'zod';

export const InquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address").optional().or(z.literal('')),
  interest: z.string().min(2, "Interest is required"),
  status: z.enum(['NEW', 'FOLLOW_UP', 'CONVERTED', 'LOST']),
  source: z.string(),
  notes: z.string().optional()
});

export type InquiryFormValues = z.infer<typeof InquirySchema>;

export const INQUIRIES_STATUS_LABELS: Record<string, string> = {
 NEW: 'New', 
 FOLLOW_UP: 'Follow Up', 
 CONVERTED: 'Converted', 
 LOST: 'Lost',
};

export const INQUIRIES_STATUS_STYLES: Record<string, { bg: string; text: string }> = {
 NEW: { bg: 'var(--inquiries-status-new-bg)', text: 'var(--inquiries-status-new-text)' },
 FOLLOW_UP: { bg: 'var(--inquiries-status-follow-up-bg)', text: 'var(--inquiries-status-follow-up-text)' },
 CONVERTED: { bg: 'var(--inquiries-status-converted-bg)', text: 'var(--inquiries-status-converted-text)' },
 LOST: { bg: 'var(--inquiries-status-lost-bg)', text: 'var(--inquiries-status-lost-text)' },
};

export const EMPTY_INQUIRY_FORM = { 
 name: '', 
 phone: '', 
 email: '', 
 interest: '', 
 status: 'NEW', 
 source: 'Walk-in', 
 notes: '' 
};

export const INQUIRY_SOURCES = [
 'Walk-in', 'Call', 'Website', 'WhatsApp', 'Referral', 'Facebook', 'Instagram'
];

export const INQUIRIES_TABLE_HEADERS = [
 'Lead', 'Contact', 'Interest', 'Source', 'Status', 'Date', 'Actions'
];

export const INQUIRY_MODAL_FIELDS = [
 { label: 'Full Name', key: 'name', type: 'text', req: true },
 { label: 'Phone', key: 'phone', type: 'tel', req: true },
 { label: 'Email (optional)', key: 'email', type: 'email', req: false },
 { label: 'Interest (Plan)', key: 'interest', type: 'text', placeholder: 'Basic Membership, Personal Training...', req: true },
 { label: 'Notes', key: 'notes', type: 'text', req: false },
];

export const generateDefaultMessage = (name: string, interest: string) => {
 return `Hi ${name}! 👋\n\nThank you for your interest in GymSmart!\n\nWe received your inquiry about ${interest}. Our team will get in touch shortly.\n\n— Team GymSmart`;
};
