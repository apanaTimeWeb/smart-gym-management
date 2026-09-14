const fs = require('fs');
const path = require('path');

const superadminDir = 'c:\\Users\\satya\\Desktop\\PojectsToWork\\Smart-Gym-Management\\frontend\\src\\app\\superadmin';

const typeMappings = {
  TenantStatus: '@/app/superadmin/gyms/gyms_types/superadmin_gyms_types',
  Tenant: '@/app/superadmin/gyms/gyms_types/superadmin_gyms_types',
  SaaSDashboardMetrics: '@/app/superadmin/dashboard/dashboard_types/superadmin_dashboard_types',
  RevenueChartData: '@/app/superadmin/analytics/analytics_types/superadmin_analytics_types',
  GrowthChartData: '@/app/superadmin/analytics/analytics_types/superadmin_analytics_types',
  SubscriptionPlan: '@/app/superadmin/plans/plans_types/superadmin_plans_types',
  CreatePlanPayload: '@/app/superadmin/plans/plans_types/superadmin_plans_types',
  UpdatePlanPayload: '@/app/superadmin/plans/plans_types/superadmin_plans_types',
  BackgroundJob: '@/app/superadmin/jobs/jobs_types/superadmin_jobs_types',
  JobsMetrics: '@/app/superadmin/jobs/jobs_types/superadmin_jobs_types',
  SchemaMigration: '@/app/superadmin/migrations/migrations_types/superadmin_migrations_types',
  MigrationsPageData: '@/app/superadmin/migrations/migrations_types/superadmin_migrations_types',
  PlatformSetting: '@/app/superadmin/settings/settings_types/superadmin_settings_types',
  InfrastructureNode: '@/app/superadmin/infrastructure/infrastructure_types/superadmin_infrastructure_types',
  RedisTelemetry: '@/app/superadmin/infrastructure/infrastructure_types/superadmin_infrastructure_types',
  GlobalAuditLog: '@/app/superadmin/global-audit/global_audit_types/superadmin_global_audit_types',
  AuditLog: '@/app/superadmin/global-audit/global_audit_types/superadmin_global_audit_types',
  FetchState: '@/app/superadmin/superadmin_utils/superadmin_shared_types',
  ApiResponse: '@/lib/api'
};

function getFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, files);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  return files;
}

const files = getFiles(superadminDir);

let updatedFiles = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Use [^}]+ to strictly match only inside the import block curly braces
  const regex = /import\s+(?:type\s+)?\{([^}]+)\}\s+from\s+['"]@\/app\/superadmin\/superadmin_types\/superadmin_types['"];/g;
  
  let match;
  let hasChanges = false;
  
  while ((match = regex.exec(content)) !== null) {
    const importBlock = match[0];
    const importedTypesStr = match[1];
    
    // Split by commas, handling newlines and whitespace
    const importedTypes = importedTypesStr
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);
      
    const importsByPath = {};
    
    for (const type of importedTypes) {
      // Handle aliased imports e.g. "Tenant as GymTenant"
      const typeNameMatch = type.match(/^(\w+)/);
      if (typeNameMatch) {
        const typeName = typeNameMatch[1];
        const modulePath = typeMappings[typeName];
        
        if (modulePath) {
          if (!importsByPath[modulePath]) {
            importsByPath[modulePath] = [];
          }
          importsByPath[modulePath].push(type);
        } else {
            // Unmapped types, we might have missed some
            if (!importsByPath['UNMAPPED']) {
                importsByPath['UNMAPPED'] = [];
            }
            importsByPath['UNMAPPED'].push(type);
        }
      }
    }
    
    let replacement = '';
    for (const [modulePath, types] of Object.entries(importsByPath)) {
        if (modulePath !== 'UNMAPPED') {
            replacement += `import type { ${types.join(', ')} } from '${modulePath}';\n`;
        } else {
            console.warn(`Unmapped types in ${file}: ${types.join(', ')}`);
        }
    }
    
    content = content.replace(importBlock, replacement.trim());
    hasChanges = true;
  }
  
  if (hasChanges) {
    fs.writeFileSync(file, content);
    updatedFiles++;
  }
}

console.log(`Updated ${updatedFiles} files`);
