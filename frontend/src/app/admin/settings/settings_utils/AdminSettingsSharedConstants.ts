// RESPONSIBILITY: Centralized constants, schema, and shared utilities for the Settings module.
import { Building, Bell, Shield, Smartphone, Settings as SettingsIcon, Webhook, Receipt, CreditCard } from 'lucide-react';

export const SETTINGS_TABS = [
  { icon: Building, title: 'Gym Profile', desc: 'Update gym name, logo, address, and contact details', color: 'text-info', bg: 'bg-info-bg' },
  { icon: Bell, title: 'Notifications', desc: 'Configure SMS, email and WhatsApp alerts', color: 'text-warning', bg: 'bg-warning-bg' },
  { icon: Shield, title: 'Roles & Permissions', desc: 'Manage admin roles and access control', color: 'text-purple', bg: 'bg-purple-bg' },
  { icon: Smartphone, title: 'App Integration', desc: 'Member app settings and configurations', color: 'text-success', bg: 'bg-success-bg' },
  { icon: Webhook, title: 'Webhooks', desc: 'Configure API webhooks and integrations', color: 'text-primary', bg: 'bg-primary/20' },
  { icon: Receipt, title: 'GST & Tax', desc: 'Configure GST number, tax rates, and invoice settings', color: 'text-warning', bg: 'bg-warning-bg' },
  { icon: CreditCard, title: 'Payment Gateway', desc: 'Manage Razorpay, Stripe, and UPI payment configurations', color: 'text-success', bg: 'bg-success-bg' },
  { icon: SettingsIcon, title: 'General Settings', desc: 'System preferences, timezone, language', color: 'text-secondary', bg: 'bg-card' },
];

export const EMPTY_SETTINGS_FORM = {
  gymName: '',
  ownerName: '',
  phone: '',
  email: '',
  city: '',
  gstNumber: '',
  twoFactorEnabled: false,
  twoFactorMethod: 'SMS' as 'SMS' | 'TOTP',
};

export const MOCK_GST_SETTINGS = {
  gstNumber: '27AABCU9603R1ZX',
  businessLegalName: '',
  taxRate: '18',
  taxInclusivePricing: false,
  showGstOnInvoice: true,
  hsnCode: '999311',
  stateCode: '27',
};

export const MOCK_PAYMENT_GATEWAY_SETTINGS = {
  razorpayEnabled: true,
  razorpayKeyId: 'rzp_live_xxxxxxxxxxxxxxxx',
  razorpayWebhookSecret: '',
  stripeEnabled: false,
  stripePublishableKey: '',
  upiEnabled: true,
  upiId: 'gymsmart@upi',
  cashEnabled: true,
  autoReceiptEnabled: true,
  receiptPrefix: 'GS',
};

export const GST_STATE_CODES = [
  { value: '27', label: '27 — Maharashtra' },
  { value: '07', label: '07 — Delhi' },
  { value: '29', label: '29 — Karnataka' },
  { value: '33', label: '33 — Tamil Nadu' },
  { value: '06', label: '06 — Haryana' },
  { value: '24', label: '24 — Gujarat' },
  { value: '36', label: '36 — Telangana' },
];

export const TAX_RATE_OPTIONS = [
  { value: '0', label: '0% — Exempt' },
  { value: '5', label: '5% — GST' },
  { value: '12', label: '12% — GST' },
  { value: '18', label: '18% — GST (Standard)' },
  { value: '28', label: '28% — GST (Luxury)' },
];

export const MOCK_NOTIFICATION_SETTINGS = {
  smsOnJoin: true,
  smsOnExpiry: true,
  smsOnPayment: true,
  smsOnAbsence: false,
  emailOnJoin: true,
  emailOnExpiry: true,
  emailOnPayment: false,
  emailOnAbsence: false,
  whatsappOnJoin: true,
  whatsappOnExpiry: true,
  whatsappOnPayment: true,
  whatsappOnAbsence: true,
  expiryReminderDays: '7',
  absenceThresholdDays: '3',
};

export const MOCK_ROLES = [
  { id: 'r1', name: 'Super Admin', description: 'Full access to all modules and branches', permissions: ['all'], color: 'text-danger', bg: 'bg-danger-bg', memberCount: 1 },
  { id: 'r2', name: 'Branch Manager', description: 'Manage single branch operations, members, and staff', permissions: ['members', 'finance', 'hr', 'attendance'], color: 'text-warning', bg: 'bg-warning-bg', memberCount: 3 },
  { id: 'r3', name: 'Trainer', description: 'View assigned members, mark attendance, update workouts', permissions: ['attendance', 'members_view'], color: 'text-success', bg: 'bg-success-bg', memberCount: 8 },
  { id: 'r4', name: 'Receptionist', description: 'Handle walk-ins, collect fees, manage enquiries', permissions: ['members', 'finance_collect', 'enquiries'], color: 'text-info', bg: 'bg-info-bg', memberCount: 5 },
  { id: 'r5', name: 'Accountant', description: 'View and manage financial reports and expenses', permissions: ['finance', 'reports'], color: 'text-purple', bg: 'bg-purple-bg', memberCount: 2 },
];

export const MOCK_APP_INTEGRATION = {
  memberAppEnabled: true,
  qrCheckInEnabled: true,
  onlinePaymentsEnabled: false,
  dietPlanEnabled: true,
  workoutPlanEnabled: true,
  progressTrackingEnabled: true,
  pushNotificationsEnabled: true,
  appStoreLink: 'https://apps.apple.com/gymsmart',
  playStoreLink: 'https://play.google.com/store/gymsmart',
  apiKey: 'gsk_live_12345',
  webhookUrl: 'https://gymsmart.example.com/webhook',
};

export const MOCK_GENERAL_SETTINGS = {
  timezone: 'Asia/Kolkata',
  language: 'en',
  currency: 'INR',
  dateFormat: 'DD/MM/YYYY',
  timeFormat: '12h',
  fiscalYearStart: 'April',
  autoBackup: true,
  backupFrequency: 'daily',
  dataRetentionMonths: '24',
  maintenanceMode: false,
  twoFactorAuth: false,
  sessionTimeoutMinutes: '60',
};

export const TIMEZONE_OPTIONS = [
  { value: 'Asia/Kolkata', label: 'IST — Asia/Kolkata (UTC+5:30)' },
  { value: 'Asia/Dubai', label: 'GST — Asia/Dubai (UTC+4:00)' },
  { value: 'UTC', label: 'UTC — Coordinated Universal Time' },
];

export const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'Hindi' },
  { value: 'mr', label: 'Marathi' },
];

export const BACKUP_FREQUENCY_OPTIONS = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];
