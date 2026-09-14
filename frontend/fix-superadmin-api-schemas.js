const fs = require('fs');
const path = require('path');

const schemasToAppend = {
  'analytics/superadmin_analytics_types/superadmin_analytics_types.ts': `
export const AnalyticsApiDataSchema = z.object({
  activeUsers: z.number(),
  monthlyRecurringRevenue: z.number(),
  churnRate: z.number(),
  newSignups: z.number(),
  revenueHistory: z.array(z.any()),
  userGrowth: z.array(z.any())
});
`,
  'backups/superadmin_backups_types/superadmin_backups_types.ts': `
export const BackupRecordSchema = z.object({
  id: z.string(),
  tenantName: z.string(),
  databaseName: z.string(),
  sizeMB: z.number(),
  status: z.enum(['SUCCESS', 'FAILED', 'IN_PROGRESS']),
  timestamp: z.string()
});
`,
  'branches/superadmin_branches_types/superadmin_branches_types.ts': `
export const SuperadminBranchSchema = z.object({
  id: z.string(),
  name: z.string(),
  managerId: z.string().optional(),
  location: z.string(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  createdAt: z.string(),
  updatedAt: z.string(),
  totalMembers: z.number().optional(),
  monthlyRevenue: z.number().optional()
});
`,
  'broadcasts/superadmin_broadcasts_types/superadmin_broadcasts_types.ts': `
export const BroadcastSchema = z.object({
  id: z.string(),
  title: z.string(),
  message: z.string(),
  targetAudience: z.enum(['ALL', 'TENANTS', 'TRAINERS', 'MEMBERS', 'SPECIFIC_GYM']),
  status: z.enum(['SCHEDULED', 'SENT', 'DRAFT']),
  scheduledAt: z.string().optional(),
  sentAt: z.string().optional(),
  authorId: z.string(),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT'])
});
`,
  'churn-alerts/churn_types/superadmin_churn_types.ts': `
export const ChurnAlertSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  tenantName: z.string(),
  riskScore: z.number(),
  riskLevel: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  reasons: z.array(z.string()),
  lastContactDate: z.string(),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED']),
  assignedTo: z.string().optional(),
  createdAt: z.string()
});

export const ChurnKpiDataSchema = z.object({
  totalAtRisk: z.number(),
  highRiskCount: z.number(),
  averageRiskScore: z.number(),
  resolvedThisMonth: z.number()
});
`,
  'dashboard/dashboard_types/superadmin_dashboard_types.ts': `
export const SuperadminDashboardApiDataSchema = z.object({
  totalTenants: z.number(),
  activeUsers: z.number(),
  monthlyRevenue: z.number(),
  systemHealth: z.number()
});
`,
  'features/superadmin_features_types/superadmin_features_types.ts': `
export const FeatureFlagSchema = z.object({
  id: z.string(),
  name: z.string(),
  key: z.string(),
  description: z.string(),
  isEnabled: z.boolean(),
  rolloutPercentage: z.number(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const ReleaseNoteSchema = z.object({
  id: z.string(),
  version: z.string(),
  title: z.string(),
  content: z.string(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
  publishedAt: z.string().optional(),
  authorId: z.string()
});
`,
  'franchises/superadmin_franchises_types/superadmin_franchises_types.ts': `
export const SuperadminFranchiseSchema = z.object({
  id: z.string(),
  name: z.string(),
  ownerId: z.string(),
  totalBranches: z.number(),
  status: z.enum(['ACTIVE', 'SUSPENDED', 'PENDING']),
  joinDate: z.string(),
  subscriptionPlanId: z.string()
});
`,
  'invoices/superadmin_invoices_types/superadmin_invoices_types.ts': `
export const SaaSInvoiceSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  tenantName: z.string(),
  amount: z.number(),
  status: z.enum(['PAID', 'PENDING', 'OVERDUE', 'CANCELLED']),
  dueDate: z.string(),
  issuedDate: z.string(),
  paidDate: z.string().optional(),
  items: z.array(z.any()).optional()
});
`,
  'messaging/messaging_types/superadmin_messaging_types.ts': `
export const TenantMessageSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  subject: z.string(),
  content: z.string(),
  senderRole: z.string(),
  isRead: z.boolean(),
  createdAt: z.string()
});

export const SuperadminNotificationSchema = z.object({
  id: z.string(),
  title: z.string(),
  message: z.string(),
  type: z.enum(['INFO', 'WARNING', 'ERROR', 'SUCCESS']),
  isRead: z.boolean(),
  createdAt: z.string()
});

export const MessagingTenantSchema = z.object({
  id: z.string(),
  name: z.string(),
  contactEmail: z.string(),
  unreadCount: z.number()
});
`,
  'migrations/superadmin_migrations_types/superadmin_migrations_types.ts': `
export const MigrationLogSchema = z.object({
  id: z.string(),
  version: z.string(),
  description: z.string(),
  status: z.enum(['SUCCESS', 'FAILED', 'ROLLBACK', 'PENDING']),
  executedAt: z.string(),
  durationMs: z.number(),
  executedBy: z.string(),
  errorDetails: z.string().optional()
});
`,
  'onboarding/onboarding_types/superadmin_onboarding_types.ts': `
export const TenantOnboardingSchema = z.object({
  id: z.string(),
  tenantName: z.string(),
  ownerEmail: z.string(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'REJECTED']),
  step: z.number(),
  totalSteps: z.number(),
  createdAt: z.string(),
  updatedAt: z.string()
});
`,
  'profile/profile_types/superadmin_profile_types.ts': `
export const SuperadminProfileDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
  avatarUrl: z.string().optional(),
  lastLogin: z.string(),
  twoFactorEnabled: z.boolean()
});
`,
  'reports/reports_types/superadmin_reports_types.ts': `
export const RevenueRowSchema = z.object({
  id: z.string(),
  date: z.string(),
  amount: z.number(),
  source: z.string(),
  tenantId: z.string().optional()
});

export const ChurnRecordSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  tenantName: z.string(),
  churnDate: z.string(),
  reason: z.string(),
  lifetimeValue: z.number()
});

export const TenantHealthScoreSchema = z.object({
  tenantId: z.string(),
  tenantName: z.string(),
  score: z.number(),
  trend: z.enum(['UP', 'DOWN', 'STABLE']),
  lastCalculated: z.string()
});
`,
  'tickets/superadmin_tickets_types/superadmin_tickets_types.ts': `
export const SupportTicketSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  subject: z.string(),
  description: z.string(),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'WAITING', 'RESOLVED', 'CLOSED']),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT']),
  createdAt: z.string(),
  updatedAt: z.string(),
  assignedTo: z.string().optional()
});
`,
  'usage-meters/superadmin_usage-meters_types/superadmin_usage-meters_types.ts': `
export const UsageMeterSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  tenantName: z.string(),
  metricName: z.string(),
  currentValue: z.number(),
  limitValue: z.number(),
  resetDate: z.string()
});
`
};

const basePath = 'c:\\Users\\satya\\Desktop\\PojectsToWork\\Smart-Gym-Management\\frontend\\src\\app\\superadmin';

for (const [relativePath, schemaString] of Object.entries(schemasToAppend)) {
  const fullPath = path.join(basePath, relativePath);
  if (!fs.existsSync(fullPath)) {
    console.log("File not found: " + fullPath);
    continue;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Ensure z is imported
  if (!content.includes('import { z }')) {
    content = "import { z } from 'zod';\n" + content;
  }
  
  if (!content.includes(schemaString.trim().split('\\n')[0])) {
    content += '\n' + schemaString;
    fs.writeFileSync(fullPath, content);
    console.log("Appended schemas to " + relativePath);
  }
}
