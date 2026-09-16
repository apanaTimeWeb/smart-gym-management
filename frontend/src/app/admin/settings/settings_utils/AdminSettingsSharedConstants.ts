// RESPONSIBILITY: Centralized constants, schema, and shared utilities for the Settings module.
import { Building, Bell, Shield, Smartphone, Settings as SettingsIcon, Webhook, Receipt, CreditCard } from 'lucide-react';

export const SETTINGS_TABS = [
  { id: 'profile', icon: Building, title: 'Gym Profile', desc: 'Update gym name, logo, address, and contact details', color: 'text-info', bg: 'bg-info-bg' },
  { id: 'notifications', icon: Bell, title: 'Notifications', desc: 'Configure SMS, email and WhatsApp alerts', color: 'text-warning', bg: 'bg-warning-bg' },
  { id: 'roles', icon: Shield, title: 'Roles & Permissions', desc: 'Manage admin roles and access control', color: 'text-purple', bg: 'bg-purple-bg' },
  { id: 'integration', icon: Smartphone, title: 'App Integration', desc: 'Member app settings and configurations', color: 'text-success', bg: 'bg-success-bg' },
  { id: 'webhooks', icon: Webhook, title: 'Webhooks', desc: 'Configure API webhooks and integrations', color: 'text-primary', bg: 'bg-primary/20' },
  { id: 'gst', icon: Receipt, title: 'GST & Tax', desc: 'Configure GST number, tax rates, and invoice settings', color: 'text-warning', bg: 'bg-warning-bg' },
  { id: 'payment', icon: CreditCard, title: 'Payment Gateway', desc: 'Manage Razorpay, Stripe, and UPI payment configurations', color: 'text-success', bg: 'bg-success-bg' },
  { id: 'general', icon: SettingsIcon, title: 'General Settings', desc: 'System preferences, timezone, language', color: 'text-secondary', bg: 'bg-card' },
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

export { MOCK_ROLES } from '@/app/admin/settings/settings_mocks/fixtures/AdminSettingsMockFixtures';
