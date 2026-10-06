// RESPONSIBILITY: Canonical feature-owned static constants and business UI configuration for this Admin feature.
import { Building, Bell, Shield, Smartphone, Settings as SettingsIcon, Receipt, CreditCard } from 'lucide-react';



export const SETTINGS_TABS = [
  { id: 'profile', icon: Building, titleKey: 'settings.AdminSettingsTabs.gymProfile', descKey: 'settings.AdminSettingsTabs.gymProfileDesc', color: 'text-info', bg: 'bg-info-bg' },
  { id: 'notifications', icon: Bell, titleKey: 'settings.AdminSettingsTabs.notifications', descKey: 'settings.AdminSettingsTabs.notificationsDesc', color: 'text-warning', bg: 'bg-warning-bg' },
  { id: 'roles', icon: Shield, titleKey: 'settings.AdminSettingsTabs.roles', descKey: 'settings.AdminSettingsTabs.rolesDesc', color: 'text-purple-text', bg: 'bg-purple-bg' },
  { id: 'integration', icon: Smartphone, titleKey: 'settings.AdminSettingsTabs.integration', descKey: 'settings.AdminSettingsTabs.integrationDesc', color: 'text-success', bg: 'bg-success-bg' },
  { id: 'gst', icon: Receipt, titleKey: 'settings.AdminSettingsTabs.gst', descKey: 'settings.AdminSettingsTabs.gstDesc', color: 'text-warning', bg: 'bg-warning-bg' },
  { id: 'payment', icon: CreditCard, titleKey: 'settings.AdminSettingsTabs.payment', descKey: 'settings.AdminSettingsTabs.paymentDesc', color: 'text-success', bg: 'bg-success-bg' },
  { id: 'general', icon: SettingsIcon, titleKey: 'settings.AdminSettingsTabs.general', descKey: 'settings.AdminSettingsTabs.generalDesc', color: 'text-secondary', bg: 'bg-card' },
];

export const EMPTY_SETTINGS_FORM = {
  gymName: '',
  ownerName: '',
  phone: '',
  email: '',
  city: '',
  gstNumber: '',
  twoFactorEnabled: false,
  twoFactorMethod: 'SMS',
};

export const GST_STATE_CODES = [
  { value: '27', labelKey: 'settings.AdminSettingsGST.stateMaharashtra' },
  { value: '07', labelKey: 'settings.AdminSettingsGST.stateDelhi' },
  { value: '29', labelKey: 'settings.AdminSettingsGST.stateKarnataka' },
  { value: '33', labelKey: 'settings.AdminSettingsGST.stateTamilNadu' },
  { value: '06', labelKey: 'settings.AdminSettingsGST.stateHaryana' },
  { value: '24', labelKey: 'settings.AdminSettingsGST.stateGujarat' },
  { value: '36', labelKey: 'settings.AdminSettingsGST.stateTelangana' },
];

export const TAX_RATE_OPTIONS = [
  { value: '0', labelKey: 'settings.AdminSettingsGST.taxExempt' },
  { value: '5', labelKey: 'settings.AdminSettingsGST.tax5' },
  { value: '12', labelKey: 'settings.AdminSettingsGST.tax12' },
  { value: '18', labelKey: 'settings.AdminSettingsGST.tax18' },
  { value: '28', labelKey: 'settings.AdminSettingsGST.tax28' },
];


export const TIMEZONE_OPTIONS = [
  { value: 'Asia/Kolkata', labelKey: 'settings.AdminSettingsGeneral.timezoneKolkata' },
  { value: 'Asia/Dubai', labelKey: 'settings.AdminSettingsGeneral.timezoneDubai' },
  { value: 'UTC', labelKey: 'settings.AdminSettingsGeneral.timezoneUtc' },
];

export const LANGUAGE_OPTIONS = [
  { value: 'en', labelKey: 'settings.AdminSettingsGeneral.languageEnglish' },
  { value: 'hi', labelKey: 'settings.AdminSettingsGeneral.languageHindi' },
];

export const BACKUP_FREQUENCY_OPTIONS = [
  { value: 'daily', labelKey: 'settings.AdminSettingsGeneral.backupDaily' },
  { value: 'weekly', labelKey: 'settings.AdminSettingsGeneral.backupWeekly' },
  { value: 'monthly', labelKey: 'settings.AdminSettingsGeneral.backupMonthly' },
];

export const ADMIN_SETTINGS_NOTIFICATION_CHANNELS = [
  { key: 'sms', labelKey: 'settings.AdminAuditRepair.sms', color: 'text-info' },
  { key: 'email', labelKey: 'settings.AdminAuditRepair.email', color: 'text-warning' },
  { key: 'whatsapp', labelKey: 'settings.AdminAuditRepair.whatsapp', color: 'text-success' },
] as const;

export const ADMIN_SETTINGS_NOTIFICATION_EVENTS = [
  { key: 'onJoin', labelKey: 'settings.AdminAuditRepair.newMemberJoins' },
  { key: 'onExpiry', labelKey: 'settings.AdminAuditRepair.membershipExpiryReminder' },
  { key: 'onPayment', labelKey: 'settings.AdminAuditRepair.paymentReceived' },
  { key: 'onAbsence', labelKey: 'settings.AdminAuditRepair.memberAbsenceAlert' },
] as const;

export const ADMIN_SETTINGS_GENERAL_SELECT_FIELDS = [
  { labelKey: 'settings.AdminAuditRepair.timezone', key: 'timezone', options: TIMEZONE_OPTIONS },
  { labelKey: 'settings.AdminAuditRepair.language', key: 'language', options: LANGUAGE_OPTIONS },
  { labelKey: 'settings.AdminAuditRepair.backupFrequency', key: 'backupFrequency', options: BACKUP_FREQUENCY_OPTIONS },
] as const;

export const ADMIN_SETTINGS_GENERAL_TOGGLE_FIELDS = [
  { key: 'autoBackup', labelKey: 'settings.AdminAuditRepair.automaticDailyBackup' },
  { key: 'maintenanceMode', labelKey: 'settings.AdminAuditRepair.maintenanceMode' },
  { key: 'twoFactorAuth', labelKey: 'settings.AdminAuditRepair.twoFactor' },
] as const;
