export const ADMIN_INQUIRY_SOURCES = [
  { value: "facebook",  label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "website",   label: "Website" },
  { value: "google",    label: "Google" },
  { value: "walk-in",   label: "Walk-In" },
  { value: "referral",  label: "Referral" },
  { value: "other",     label: "Other" },
];
export const ADMIN_INQUIRY_STATUS_OPTIONS = [
  { value: "new",       label: "New",        className: "bg-info-bg text-info" },
  { value: "follow_up", label: "Follow Up",  className: "bg-warning-bg text-warning" },
  { value: "converted", label: "Converted",  className: "bg-success-bg text-success" },
  { value: "closed",    label: "Closed",     className: "bg-border text-text-secondary" },
];
export const ADMIN_INQUIRY_FILTER_OPTIONS = [
  { value: "All", label: "All Status" },
  ...ADMIN_INQUIRY_STATUS_OPTIONS,
];
export const ADMIN_EMPTY_INQUIRY = { name: "", phone: "", email: "", source: "walk-in" as const, status: "new" as const, interest: "", notes: "" };
