const fs = require('fs');
const path = require('path');

const schemasToAppend = {
  'branches/branches_types/superadmin_branches_types.ts': `
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
  'churn-alerts/churn_types/churn_types.ts': `
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
  'franchises/franchises_types/superadmin_franchises_types.ts': `
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
  'messaging/messaging_types/messaging_types.ts': `
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
  'onboarding/onboarding_types/onboarding_types.ts': `
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
  'profile/profile_types/SuperadminProfileTypes.ts': `
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
  'reports/reports_types/reports_types.ts': `
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
`
};

const basePath = 'c:\\Users\\satya\\Desktop\\PojectsToWork\\Smart-Gym-Management\\frontend\\src\\app\\superadmin';

// 1. Append schemas to actual type files
for (const [relativePath, schemaString] of Object.entries(schemasToAppend)) {
  const fullPath = path.join(basePath, relativePath);
  if (!fs.existsSync(fullPath)) {
    console.log("File not found: " + fullPath);
    continue;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  if (!content.includes('import { z }')) {
    content = "import { z } from 'zod';\n" + content;
  }
  
  if (!content.includes(schemaString.trim().split('\\n')[0])) {
    content += '\n' + schemaString;
    fs.writeFileSync(fullPath, content);
    console.log("Appended schemas to " + relativePath);
  }
}

// 2. Fix the imports in the API files
const apiFixes = {
  'branches/superadmin_branches_api/superadmin_branches_api.ts': { oldPath: 'branches/superadmin_branches_types/superadmin_branches_types', newPath: 'branches/branches_types/superadmin_branches_types' },
  'churn-alerts/churn_api/superadmin_churn_api.ts': { oldPath: 'churn-alerts/churn_types/superadmin_churn_types', newPath: 'churn-alerts/churn_types/churn_types' },
  'franchises/superadmin_franchises_api/superadmin_franchises_api.ts': { oldPath: 'franchises/superadmin_franchises_types/superadmin_franchises_types', newPath: 'franchises/franchises_types/superadmin_franchises_types' },
  'messaging/messaging_api/superadmin_messaging_api.ts': { oldPath: 'messaging/messaging_types/superadmin_messaging_types', newPath: 'messaging/messaging_types/messaging_types' },
  'onboarding/superadmin_onboarding_api/superadmin_onboarding_api.ts': { oldPath: 'onboarding/onboarding_types/superadmin_onboarding_types', newPath: 'onboarding/onboarding_types/onboarding_types' },
  'profile/profile_api/superadmin_profile_api.ts': { oldPath: 'profile/profile_types/superadmin_profile_types', newPath: 'profile/profile_types/SuperadminProfileTypes' },
  'reports/reports_api/superadmin_reports_api.ts': { oldPath: 'reports/reports_types/superadmin_reports_types', newPath: 'reports/reports_types/reports_types' },
};

for (const [apiPath, replacePaths] of Object.entries(apiFixes)) {
  const fullPath = path.join(basePath, apiPath);
  if (!fs.existsSync(fullPath)) {
    console.log("API File not found: " + fullPath);
    continue;
  }
  let content = fs.readFileSync(fullPath, 'utf8');
  content = content.replace(replacePaths.oldPath, replacePaths.newPath);
  fs.writeFileSync(fullPath, content);
  console.log("Fixed import path in " + apiPath);
}
