const fs = require('fs');
const path = require('path');

const superadminDir = 'c:\\Users\\satya\\Desktop\\PojectsToWork\\Smart-Gym-Management\\frontend\\src\\app\\superadmin';

function getFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, files);
    } else if (fullPath.endsWith('_api.ts')) {
      files.push(fullPath);
    }
  }
  return files;
}

const files = getFiles(superadminDir);

function typeToZod(typeStr) {
  typeStr = typeStr.trim();
  if (typeStr === 'void') return 'z.any()';
  if (typeStr === 'unknown') return 'z.unknown()';
  if (typeStr === 'string') return 'z.string()';
  if (typeStr === 'number') return 'z.number()';
  if (typeStr === 'boolean') return 'z.boolean()';
  if (typeStr === 'null') return 'z.null()';
  
  if (typeStr.endsWith('[]')) {
    const inner = typeStr.slice(0, -2);
    return `z.array(${typeToZod(inner)})`;
  }
  
  if (typeStr.startsWith('{') && typeStr.endsWith('}')) {
     // Very basic inline object handling, e.g. { token: string }
     if (typeStr.includes('downloadUrl')) return 'z.object({ downloadUrl: z.string() })';
     if (typeStr.includes('token: string')) return 'z.object({ token: z.string() })';
     if (typeStr.includes('id: string')) return 'z.object({ id: z.string() })';
     return 'z.any()'; // Fallback
  }
  
  // Custom types
  return `${typeStr}Schema`;
}

let updatedFiles = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let hasChanges = false;
  
  const regex = /apiFetch<ApiResponse<([^>]+)>>\(([\s\S]*?)dataSchema:\s*z\.unknown\(\)([\s\S]*?)\)/g;
  
  let match;
  let newContent = content;
  let typesToImport = new Set();
  
  while ((match = regex.exec(content)) !== null) {
    const typeArg = match[1];
    const zodSchema = typeToZod(typeArg);
    
    // Extract base types for import (e.g. "Tenant" from "z.array(TenantSchema)")
    const baseTypeMatch = typeArg.match(/^([a-zA-Z0-9_]+)/);
    if (baseTypeMatch && !['void', 'unknown', 'string', 'number', 'boolean', 'null'].includes(baseTypeMatch[1])) {
       typesToImport.add(baseTypeMatch[1]);
    }
    
    const replacement = `apiFetch<ApiResponse<${typeArg}>>(${match[2]}dataSchema: ${zodSchema}${match[3]})`;
    newContent = newContent.replace(match[0], replacement);
    hasChanges = true;
  }
  
  if (hasChanges) {
    // We would need to add imports for the *Schema variables here.
    // e.g. if we used TenantSchema, we should import it from gyms_types
    const typeMappings = {
      Tenant: '@/app/superadmin/gyms/gyms_types/superadmin_gyms_types',
      SaaSDashboardMetrics: '@/app/superadmin/dashboard/dashboard_types/superadmin_dashboard_types',
      RevenueChartData: '@/app/superadmin/analytics/analytics_types/superadmin_analytics_types',
      GrowthChartData: '@/app/superadmin/analytics/analytics_types/superadmin_analytics_types',
      SubscriptionPlan: '@/app/superadmin/plans/plans_types/superadmin_plans_types',
      BackgroundJob: '@/app/superadmin/jobs/jobs_types/superadmin_jobs_types',
      JobsMetrics: '@/app/superadmin/jobs/jobs_types/superadmin_jobs_types',
      SchemaMigration: '@/app/superadmin/migrations/migrations_types/superadmin_migrations_types',
      MigrationsPageData: '@/app/superadmin/migrations/migrations_types/superadmin_migrations_types',
      PlatformSetting: '@/app/superadmin/settings/settings_types/superadmin_settings_types',
      InfrastructureNode: '@/app/superadmin/infrastructure/infrastructure_types/superadmin_infrastructure_types',
      RedisTelemetry: '@/app/superadmin/infrastructure/infrastructure_types/superadmin_infrastructure_types',
      GlobalAuditLog: '@/app/superadmin/global-audit/global_audit_types/superadmin_global_audit_types',
      AuditLog: '@/app/superadmin/global-audit/global_audit_types/superadmin_global_audit_types',
    };
    
    let importStatements = '';
    for (const type of typesToImport) {
        if (typeMappings[type]) {
            importStatements += `import { ${type}Schema } from '${typeMappings[type]}';\n`;
        }
    }
    
    // Inject imports below the last import
    if (importStatements) {
        const lastImportIndex = newContent.lastIndexOf('import ');
        if (lastImportIndex !== -1) {
            const nextNewline = newContent.indexOf('\n', lastImportIndex);
            newContent = newContent.slice(0, nextNewline + 1) + importStatements + newContent.slice(nextNewline + 1);
        } else {
             newContent = importStatements + '\n' + newContent;
        }
    }

    fs.writeFileSync(file, newContent);
    updatedFiles++;
  }
}

console.log(`Updated ${updatedFiles} files`);
