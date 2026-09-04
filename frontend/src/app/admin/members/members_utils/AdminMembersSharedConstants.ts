// RESPONSIBILITY: Centralized constants, Zod schema, and utilities for the Admin Members module.
// Single source of truth for form defaults, status labels, cycle labels, and message templates.
import { z } from "zod";

export const AdminMemberSchema = z.object({
  name: z.string().min(2, "Name is required").regex(/^[A-Za-z\s]+$/, "Only alphabets allowed"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  address: z.string().optional(),
  aadhaar: z.string().regex(/^\d{12}$/, "Aadhaar must be 12 digits").optional().or(z.literal("")),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  billingCycle: z.string(),
  customDays: z.number().min(1).optional(),
  planId: z.string().min(1, "Please select a plan"),
  totalAmount: z.number().min(0).optional(),
  paidAmount: z.number().min(0).optional(),
  pendingAmount: z.number().optional(),
  joinDate: z.string().optional(),
  expiryDate: z.string().optional(),
});

export type AdminMemberFormValues = z.infer<typeof AdminMemberSchema>;

export const ADMIN_MEMBERS_STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  ACTIVE:  { bg: "bg-success-bg", text: "text-success" },
  PENDING: { bg: "bg-warning-bg", text: "text-warning" },
  EXPIRED: { bg: "bg-danger-bg",  text: "text-danger" },
};

export const ADMIN_MEMBERS_CYCLE_LABELS: Record<string, string> = {
  ONE_MONTH:     "1 Month",
  THREE_MONTHS:  "3 Months",
  SIX_MONTHS:    "6 Months",
  TWELVE_MONTHS: "12 Months",
  CUSTOM:        "Custom (Days)",
};

export const ADMIN_MEMBER_STATUS_OPTIONS = [
  { label: "All Status", value: "All" },
  { label: "Active",     value: "ACTIVE" },
  { label: "Pending",    value: "PENDING" },
  { label: "Expired",    value: "EXPIRED" },
];

export const ADMIN_GENDER_OPTIONS = [
  { label: "Male",   value: "MALE" },
  { label: "Female", value: "FEMALE" },
  { label: "Other",  value: "OTHER" },
];

const today = new Date();
const nextMonth = new Date(today);
nextMonth.setMonth(nextMonth.getMonth() + 1);

export const ADMIN_EMPTY_MEMBER_FORM: AdminMemberFormValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
  aadhaar: "",
  gender: "MALE",
  billingCycle: "ONE_MONTH",
  planId: "",
  joinDate: today.toISOString().split("T")[0],
  expiryDate: nextMonth.toISOString().split("T")[0],
};

export const ADMIN_MEMBERS_TABLE_HEADERS = [
  "ID", "MEMBER", "PLAN", "STATUS", "CYCLE", "PAID", "PENDING", "EXPIRY", "ACTIONS",
];

export const ADMIN_PROFILE_TABS = [
  { id: "overview",    label: "Overview" },
  { id: "attendance",  label: "Attendance" },
  { id: "payments",    label: "Payments" },
];

export const ADMIN_MSG_TEMPLATES = {
  EXPIRED: (name: string) =>
    `Hi ${name}! ??\n\nYour membership has expired. Renew today to continue your fitness journey!\n\n� Team GymSmart`,
  PENDING: (name: string, amount: string) =>
    `Hi ${name} ??\n\nFriendly reminder: You have a pending amount of ${amount}. Please clear your dues at the earliest.\n\n� Team GymSmart`,
  DEFAULT: (name: string) =>
    `Hi ${name}! ??\n\nThis is a message from GymSmart. We hope you are enjoying your fitness journey!\n\n� Team GymSmart`,
};
