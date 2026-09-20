import { z } from 'zod';

export const commChannelSchema = z.enum(['whatsapp', 'email']);
export const commSegmentSchema = z.enum([
  'all_active',
  'expiring_7_days',
  'expiring_30_days',
  'expired',
  'pending_payment',
  'custom',
]);
export const commStatusSchema = z.enum(['sent', 'failed', 'partial', 'scheduled']);

export const commRecipientSchema = z.object({
  memberId: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  status: z.string(),
  expiryDate: z.string(),
  pendingAmount: z.number() });

export const commCampaignSchema = z.object({
  id: z.string(),
  title: z.string(),
  channel: commChannelSchema,
  segment: commSegmentSchema,
  segmentLabel: z.string(),
  message: z.string(),
  subject: z.string().optional(),
  recipientCount: z.number(),
  sentCount: z.number(),
  status: commStatusSchema,
  sentAt: z.string(),
  sentBy: z.string(),
  failedCount: z.number(),
  deliveredCount: z.number(),
  openRate: z.number().optional(),
  scheduledAt: z.string().optional() });

export const messageTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  channel: commChannelSchema,
  body: z.string(),
  variables: z.array(z.string()),
  isDefault: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string() });

export const commKPIDataSchema = z.object({
  totalSent: z.number(),
  whatsappSent: z.number(),
  emailSent: z.number(),
  campaignsThisMonth: z.number() });

export const commAutomationTypeSchema = z.enum(['birthday', 'anniversary']);

export const commAutomationSchema = z.object({
  id: z.string(),
  type: commAutomationTypeSchema,
  title: z.string(),
  description: z.string(),
  enabled: z.boolean(),
  channel: commChannelSchema,
  messageTemplate: z.string(),
  sendTime: z.string() });

export const churnReasonTypeSchema = z.enum([
  'price',
  'relocation',
  'schedule',
  'personal',
  'dissatisfied',
  'unknown',
]);

export const churnedMemberSchema = z.object({
  memberId: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  plan: z.string(),
  exitDate: z.string(),
  daysSinceExit: z.number(),
  reason: churnReasonTypeSchema,
  lastContactedAt: z.string().nullable(),
  recovered: z.boolean(),
  lifetimeValue: z.number() });

export const churnKPIDataSchema = z.object({
  totalChurned: z.number(),
  churnedThisMonth: z.number(),
  recoveryRate: z.number(),
  avgDaysSinceExit: z.number() });

export const winBackTemplateTierSchema = z.enum(['7_days', '30_days', '90_days', 'custom']);

export const winBackRecordSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  memberName: z.string(),
  channel: commChannelSchema,
  templateTier: winBackTemplateTierSchema,
  sentAt: z.string(),
  recovered: z.boolean() });
