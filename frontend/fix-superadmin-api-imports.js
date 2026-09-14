const fs = require('fs');
const path = require('path');

const fixes = {
  'affiliates/superadmin_affiliates_api/superadmin_affiliates_api.ts': {
    schema: ['AffiliateSchema'],
    typeFile: 'affiliates/superadmin_affiliates_types/superadmin_affiliates_types'
  },
  'analytics/superadmin_analytics_api/superadmin_analytics_api.ts': {
    schema: ['AnalyticsApiDataSchema'],
    typeFile: 'analytics/superadmin_analytics_types/superadmin_analytics_types'
  },
  'backups/superadmin_backups_api/superadmin_backups_api.ts': {
    schema: ['BackupRecordSchema'],
    typeFile: 'backups/superadmin_backups_types/superadmin_backups_types'
  },
  'branches/superadmin_branches_api/superadmin_branches_api.ts': {
    schema: ['SuperadminBranchSchema'],
    typeFile: 'branches/superadmin_branches_types/superadmin_branches_types'
  },
  'broadcasts/superadmin_broadcasts_api/superadmin_broadcasts_api.ts': {
    schema: ['BroadcastSchema'],
    typeFile: 'broadcasts/superadmin_broadcasts_types/superadmin_broadcasts_types'
  },
  'churn-alerts/churn_api/superadmin_churn_api.ts': {
    schema: ['ChurnAlertSchema', 'ChurnKpiDataSchema'],
    typeFile: 'churn-alerts/churn_types/superadmin_churn_types'
  },
  'coupons/superadmin_coupons_api/superadmin_coupons_api.ts': {
    schema: ['CouponSchema'],
    typeFile: 'coupons/superadmin_coupons_types/superadmin_coupons_types'
  },
  'dashboard/dashboard_api/superadmin_dashboard_api.ts': {
    schema: ['SuperadminDashboardApiDataSchema'],
    typeFile: 'dashboard/dashboard_types/superadmin_dashboard_types'
  },
  'features/superadmin_features_api/superadmin_features_api.ts': {
    schema: ['FeatureFlagSchema', 'ReleaseNoteSchema'],
    typeFile: 'features/superadmin_features_types/superadmin_features_types'
  },
  'franchises/superadmin_franchises_api/superadmin_franchises_api.ts': {
    schema: ['SuperadminFranchiseSchema'],
    typeFile: 'franchises/superadmin_franchises_types/superadmin_franchises_types'
  },
  'invoices/superadmin_invoices_api/superadmin_invoices_api.ts': {
    schema: ['SaaSInvoiceSchema'],
    typeFile: 'invoices/superadmin_invoices_types/superadmin_invoices_types'
  },
  'messaging/messaging_api/superadmin_messaging_api.ts': {
    schema: ['TenantMessageSchema', 'SuperadminNotificationSchema', 'MessagingTenantSchema'],
    typeFile: 'messaging/messaging_types/superadmin_messaging_types'
  },
  'migrations/superadmin_migrations_api/superadmin_migrations_api.ts': {
    schema: ['MigrationLogSchema'],
    typeFile: 'migrations/superadmin_migrations_types/superadmin_migrations_types'
  },
  'onboarding/superadmin_onboarding_api/superadmin_onboarding_api.ts': {
    schema: ['TenantOnboardingSchema'],
    typeFile: 'onboarding/onboarding_types/superadmin_onboarding_types'
  },
  'profile/profile_api/superadmin_profile_api.ts': {
    schema: ['SuperadminProfileDataSchema'],
    typeFile: 'profile/profile_types/superadmin_profile_types' // Or profile_schemas? Let's check in a bit.
  },
  'reports/reports_api/superadmin_reports_api.ts': {
    schema: ['RevenueRowSchema', 'ChurnRecordSchema', 'TenantHealthScoreSchema'],
    typeFile: 'reports/reports_types/superadmin_reports_types'
  },
  'tickets/superadmin_tickets_api/superadmin_tickets_api.ts': {
    schema: ['SupportTicketSchema'],
    typeFile: 'tickets/superadmin_tickets_types/superadmin_tickets_types'
  },
  'usage-meters/superadmin_usage-meters_api/superadmin_usage-meters_api.ts': {
    schema: ['UsageMeterSchema'],
    typeFile: 'usage-meters/superadmin_usage-meters_types/superadmin_usage-meters_types'
  }
};

const basePath = 'c:\\Users\\satya\\Desktop\\PojectsToWork\\Smart-Gym-Management\\frontend\\src\\app\\superadmin';

for (const [relativePath, info] of Object.entries(fixes)) {
  const fullPath = path.join(basePath, relativePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${fullPath}`);
    continue;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  const importStatement = `import { ${info.schema.join(', ')} } from '@/app/superadmin/${info.typeFile}';\n`;
  
  if (!content.includes(info.schema[0])) continue; // if no mention of the schema, skip
  if (content.includes(importStatement.trim())) continue; // already imported
  
  content = importStatement + content;
  fs.writeFileSync(fullPath, content);
  console.log(`Updated imports for ${relativePath}`);
}
