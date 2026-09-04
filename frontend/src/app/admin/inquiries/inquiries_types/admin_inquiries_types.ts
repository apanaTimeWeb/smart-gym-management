export interface AdminInquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  source: "facebook" | "instagram" | "website" | "google" | "walk-in" | "referral" | "other";
  status: "new" | "follow_up" | "converted" | "closed";
  interest?: string;
  notes?: string;
  followUpDate?: string;
  createdAt: string;
  assignedTo?: string;
}
export interface AdminInquiryStats {
  total: number;
  new: number;
  followUp: number;
  converted: number;
  conversionRate: number;
}
