import { z } from 'zod';

export const GymProfileSchema = z.object({
  gymName: z.string().min(2, '__i18n:settings.validation.gymNameMin'),
  ownerName: z.string().min(2, '__i18n:settings.validation.ownerNameMin'),
  phone: z.string().regex(/^\d{10}$/, '__i18n:settings.validation.phoneInvalid'),
  email: z.string().email('__i18n:settings.validation.emailInvalid'),
  city: z.string().min(2, '__i18n:settings.validation.cityMin'),
  gstNumber: z.string().length(15, '__i18n:settings.validation.gstNumberLength').optional().or(z.literal('')),
});

export const NotificationsSettingsSchema = z.object({
  smssms: z.boolean(),
  emailsms: z.boolean(),
  whatsappsms: z.boolean(),
  smsonJoin: z.boolean(),
  emailonJoin: z.boolean(),
  whatsapponJoin: z.boolean(),
  smsonExpiry: z.boolean(),
  emailonExpiry: z.boolean(),
  whatsapponExpiry: z.boolean(),
  smsonPayment: z.boolean(),
  emailonPayment: z.boolean(),
  whatsapponPayment: z.boolean(),
  smsonAbsence: z.boolean(),
  emailonAbsence: z.boolean(),
  whatsapponAbsence: z.boolean(),
  expiryReminderDays: z.number().min(1, '__i18n:settings.validation.expiryReminderMin').max(30, '__i18n:settings.validation.expiryReminderMax'),
  absenceThresholdDays: z.number().min(1, '__i18n:settings.validation.absenceThresholdMin').max(30, '__i18n:settings.validation.absenceThresholdMax'),
});

export const AppIntegrationSettingsSchema = z.object({
  memberAppEnabled: z.boolean(),
  qrCheckInEnabled: z.boolean(),
  onlinePaymentsEnabled: z.boolean(),
  dietPlanEnabled: z.boolean(),
  workoutPlanEnabled: z.boolean(),
  progressTrackingEnabled: z.boolean(),
  pushNotificationsEnabled: z.boolean(),
  appStoreLink: z.string().url({ message: '__i18n:settings.validation.urlInvalid' }).optional().or(z.literal('')),
  playStoreLink: z.string().url({ message: '__i18n:settings.validation.urlInvalid' }).optional().or(z.literal('')),
  apiKey: z.string().optional(),
  webhookUrl: z.string().url({ message: '__i18n:settings.validation.urlInvalid' }).optional().or(z.literal('')),
});

export const GstTaxSettingsSchema = z.object({
  gstNumber: z.string().max(15, '__i18n:settings.validation.gstNumberMax').optional().or(z.literal('')),
  businessLegalName: z.string().optional().or(z.literal('')),
  taxRate: z.string(),
  stateCode: z.string(),
  hsnCode: z.string().optional().or(z.literal('')),
  showGstOnInvoice: z.boolean(),
  taxInclusivePricing: z.boolean(),
});

export const PaymentGatewaySettingsSchema = z.object({
  razorpayEnabled: z.boolean(),
  razorpayKeyId: z.string().optional().or(z.literal('')),
  razorpayWebhookSecret: z.string().optional().or(z.literal('')),
  upiEnabled: z.boolean(),
  upiId: z.string().optional().or(z.literal('')),
  cashEnabled: z.boolean(),
  autoReceiptEnabled: z.boolean(),
  receiptPrefix: z.string().max(6, '__i18n:settings.validation.receiptPrefixMax').optional().or(z.literal('')),
});

export const GeneralSettingsSchema = z.object({
  timezone: z.string(),
  language: z.string(),
  dateFormat: z.string(),
  sessionTimeoutMinutes: z.number().min(15, '__i18n:settings.validation.sessionTimeoutMin').max(480, '__i18n:settings.validation.sessionTimeoutMax'),
  dataRetentionMonths: z.number().min(6, '__i18n:settings.validation.dataRetentionMin').max(120, '__i18n:settings.validation.dataRetentionMax'),
  autoBackup: z.boolean(),
  backupFrequency: z.string(),
  maintenanceMode: z.boolean(),
  twoFactorAuth: z.boolean(),
});

export const AdminSettingsResponseSchema = z.object({
  success: z.boolean().default(true),
  message: z.string().default(''),
  data: z.object({
    profile: GymProfileSchema.optional().default({ gymName: '', ownerName: '', phone: '', email: '', city: '', gstNumber: '' }),
    notifications: NotificationsSettingsSchema.optional().default({
      smssms: false, emailsms: false, whatsappsms: false,
      smsonJoin: false, emailonJoin: false, whatsapponJoin: false,
      smsonExpiry: false, emailonExpiry: false, whatsapponExpiry: false,
      smsonPayment: false, emailonPayment: false, whatsapponPayment: false,
      smsonAbsence: false, emailonAbsence: false, whatsapponAbsence: false,
      expiryReminderDays: 7, absenceThresholdDays: 3
    }),
    integration: AppIntegrationSettingsSchema.optional().default({
      memberAppEnabled: false, qrCheckInEnabled: false, onlinePaymentsEnabled: false,
      dietPlanEnabled: false, workoutPlanEnabled: false, progressTrackingEnabled: false,
      pushNotificationsEnabled: false, appStoreLink: '', playStoreLink: '', apiKey: '', webhookUrl: ''
    }),
    gst: GstTaxSettingsSchema.optional().default({
      gstNumber: '', businessLegalName: '', taxRate: '18', stateCode: '27', hsnCode: '', showGstOnInvoice: true, taxInclusivePricing: false
    }),
    payment: PaymentGatewaySettingsSchema.optional().default({
      razorpayEnabled: false, razorpayKeyId: '', razorpayWebhookSecret: '', upiEnabled: false, upiId: '', cashEnabled: true, autoReceiptEnabled: true, receiptPrefix: ''
    }),
    general: GeneralSettingsSchema.optional().default({
      timezone: 'Asia/Kolkata', language: 'en', dateFormat: 'DD/MM/YYYY', sessionTimeoutMinutes: 60, dataRetentionMonths: 24, autoBackup: false, backupFrequency: 'daily', maintenanceMode: false, twoFactorAuth: false
    }),
  }),
});
