const fs = require('fs');
const path = require('path');

const adminDir = 'c:\\Users\\satya\\Desktop\\PojectsToWork\\Smart-Gym-Management\\frontend\\src\\app\\admin';

function getDirectories(srcPath) {
  return fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isDirectory());
}

const modules = getDirectories(adminDir).filter(dir => !['admin_components', 'admin_utils', 'admin_types', 'admin_store'].includes(dir));

let filesUpdated = 0;

for (const module of modules) {
  const moduleDir = path.join(adminDir, module);
  // Admin module api folders might be module_api
  const apiDir = path.join(moduleDir, `${module}_api`);
  
  if (fs.existsSync(apiDir)) {
    const apiFiles = fs.readdirSync(apiDir).filter(f => f.endsWith('.ts'));
    
    if (apiFiles.length > 0) {
      // 1. Create URL config
      // Note: for admin, url configs are at admin/module/admin_module_url_config.ts or module_url_config.ts
      let capitalizedModule = module.charAt(0).toUpperCase() + module.slice(1);
      // Sometimes it's camelCase, we can just use the literal module name for the export name 
      // Replace - with capitalized letter
      const exportModuleName = module.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
      
      const urlConfigName = `${module}_url_config.ts`;
      let urlConfigPath = path.join(moduleDir, urlConfigName);
      let foundExistingConfig = false;
      
      // Admin actually uses admin_module_url_config.ts sometimes. Let's check which exists.
      if (!fs.existsSync(urlConfigPath)) {
        if (fs.existsSync(path.join(moduleDir, `admin_${module}_url_config.ts`))) {
            urlConfigPath = path.join(moduleDir, `admin_${module}_url_config.ts`);
            foundExistingConfig = true;
        }
      } else {
          foundExistingConfig = true;
      }
      
      const configBaseName = path.basename(urlConfigPath, '.ts');
      
      const urlConfigContent = `export const Admin${exportModuleName}UrlConfig = {
  BACKEND_API: {
    BASE: '/api/admin/${module}',
  }
};
`;
      if (!foundExistingConfig) {
        fs.writeFileSync(urlConfigPath, urlConfigContent);
      }
      
      // Let's read the export name from the existing config if it exists
      let exportName = `Admin${exportModuleName}UrlConfig`;
      if (foundExistingConfig) {
          const cfgContent = fs.readFileSync(urlConfigPath, 'utf8');
          const match = cfgContent.match(/export const (\w+)UrlConfig/);
          if (match) {
              exportName = match[1] + 'UrlConfig';
          }
      }
      
      // 2. Update API files
      for (const apiFile of apiFiles) {
        const apiFilePath = path.join(apiDir, apiFile);
        let content = fs.readFileSync(apiFilePath, 'utf8');
        
        let hasChanges = false;
        
        // Add import
        const importStr = `import { ${exportName} } from '@/app/admin/${module}/${configBaseName}';`;
        if (!content.includes(importStr) && (content.includes(`/api/admin/${module}`) || content.includes(`/admin/${module}`))) {
          const firstImportIdx = content.indexOf('import ');
          if (firstImportIdx !== -1) {
             content = content.slice(0, firstImportIdx) + importStr + '\n' + content.slice(firstImportIdx);
          } else {
             content = importStr + '\n' + content;
          }
          hasChanges = true;
        }
        
        // Replace `/api/admin/${module}` with UrlConfig.BACKEND_API.BASE
        const stringRegex = new RegExp(`(['"\`])\\/api\\/admin\\/${module}(.*?)(\\1)`, 'g');
        let newContent = content.replace(stringRegex, (match, quote1, suffix, quote2) => {
            if (suffix === '') return `${exportName}.BACKEND_API.BASE`;
            if (quote1 === '`') return `\`\${${exportName}.BACKEND_API.BASE}${suffix}\``;
            return `\`\${${exportName}.BACKEND_API.BASE}${suffix}\``;
        });
        
        // Replace `/admin/${module}` (some files use this instead)
        const stringRegex2 = new RegExp(`(['"\`])\\/admin\\/${module}(.*?)(\\1)`, 'g');
        newContent = newContent.replace(stringRegex2, (match, quote1, suffix, quote2) => {
            if (suffix === '') return `${exportName}.BACKEND_API.BASE`;
            if (quote1 === '`') return `\`\${${exportName}.BACKEND_API.BASE}${suffix}\``;
            return `\`\${${exportName}.BACKEND_API.BASE}${suffix}\``;
        });
        
        if (newContent !== content) {
           fs.writeFileSync(apiFilePath, newContent);
           filesUpdated++;
        }
      }
    }
  }
}

console.log(`Updated ${filesUpdated} files.`);
