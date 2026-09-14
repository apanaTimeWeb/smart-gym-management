import { z } from 'zod';

export const managerSettingsPreferencesSchema = z.object({
  language: z.string(),
  timezone: z.string(),
  pushNotificationsEnabled: z.boolean(),
  emailDailyReports: z.boolean(),
});

export const gymProfileSchema = z.object({
  gymName: z.string(),
  logoUrl: z.string().optional(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  pincode: z.string(),
  phone: z.string(),
  email: z.string(),
  website: z.string().optional(),
  gstin: z.string().optional(),
});

export const operatingHoursDaySchema = z.object({
  day: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
  isOpen: z.boolean(),
  openTime: z.string(),
  closeTime: z.string(),
});

export const operatingHoursSchema = z.array(operatingHoursDaySchema);

export const membershipSettingsSchema = z.object({
  gracePeriodDays: z.number(),
  autoSuspendOnExpiry: z.boolean(),
  autoSuspendAfterDays: z.number(),
  allowFreeze: z.boolean(),
  maxFreezeDaysPerYear: z.number(),
  reminderDaysBefore: z.number(),
});

export const notificationTemplateSchema = z.object({
  id: z.string(),
  type: z.enum(['renewal_reminder', 'payment_receipt', 'welcome_message', 'expiry_alert', 'payment_due']),
  channel: z.enum(['whatsapp', 'email', 'both']),
  subject: z.string().optional(),
  body: z.string(),
  variables: z.array(z.string()),
  isActive: z.boolean(),
  updatedAt: z.string(),
});

export const managerAllSettingsSchema = z.object({
  preferences: managerSettingsPreferencesSchema,
  gymProfile: gymProfileSchema,
  operatingHours: operatingHoursSchema,
  membershipSettings: membershipSettingsSchema,
  notificationTemplates: z.array(notificationTemplateSchema),
});
