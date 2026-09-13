import { z } from 'zod';

export const GymProfileSchema = z.object({
  gymName: z.string().min(2, 'Gym name must be at least 2 characters'),
  ownerName: z.string().min(2, 'Owner name must be at least 2 characters'),
  phone: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  email: z.string().email('Invalid email address'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  gstNumber: z.string().length(15, 'GST number must be exactly 15 characters').optional().or(z.literal('')),
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
  expiryReminderDays: z.number().min(1).max(30),
  absenceThresholdDays: z.number().min(1).max(30),
});

export const AppIntegrationSettingsSchema = z.object({
  memberAppEnabled: z.boolean(),
  qrCheckInEnabled: z.boolean(),
  onlinePaymentsEnabled: z.boolean(),
  dietPlanEnabled: z.boolean(),
  workoutPlanEnabled: z.boolean(),
  progressTrackingEnabled: z.boolean(),
  pushNotificationsEnabled: z.boolean(),
  appStoreLink: z.string().url().optional().or(z.literal('')),
  playStoreLink: z.string().url().optional().or(z.literal('')),
  apiKey: z.string().optional(),
  webhookUrl: z.string().url().optional().or(z.literal('')),
});

export const GstTaxSettingsSchema = z.object({
  gstNumber: z.string().max(15).optional().or(z.literal('')),
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
  receiptPrefix: z.string().max(6).optional().or(z.literal('')),
});

export const GeneralSettingsSchema = z.object({
  timezone: z.string(),
  language: z.string(),
  dateFormat: z.string(),
  sessionTimeoutMinutes: z.number().min(15).max(480),
  dataRetentionMonths: z.number().min(6).max(120),
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
