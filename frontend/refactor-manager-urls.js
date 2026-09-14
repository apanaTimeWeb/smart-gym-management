const fs = require('fs');
const path = require('path');

const managerDir = 'c:\\Users\\satya\\Desktop\\PojectsToWork\\Smart-Gym-Management\\frontend\\src\\app\\manager';

function getDirectories(srcPath) {
  return fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isDirectory());
}

const modules = getDirectories(managerDir).filter(dir => !['manager_components', 'manager_utils'].includes(dir));

let filesUpdated = 0;

for (const module of modules) {
  const moduleDir = path.join(managerDir, module);
  const apiDir = path.join(moduleDir, `${module}_api`);
  
  if (fs.existsSync(apiDir)) {
    const apiFiles = fs.readdirSync(apiDir).filter(f => f.endsWith('.ts'));
    
    if (apiFiles.length > 0) {
      // 1. Create URL config
      const capitalizedModule = module.charAt(0).toUpperCase() + module.slice(1);
      const urlConfigName = `${module}_url_config.ts`;
      const urlConfigPath = path.join(moduleDir, urlConfigName);
      
      const urlConfigContent = `export const Manager${capitalizedModule}UrlConfig = {
  BACKEND_API: {
    BASE: '/manager/${module}',
  }
};
`;
      if (!fs.existsSync(urlConfigPath)) {
        fs.writeFileSync(urlConfigPath, urlConfigContent);
      }
      
      // 2. Update API files
      for (const apiFile of apiFiles) {
        const apiFilePath = path.join(apiDir, apiFile);
        let content = fs.readFileSync(apiFilePath, 'utf8');
        
        let hasChanges = false;
        
        // Add import
        const importStr = `import { Manager${capitalizedModule}UrlConfig } from '@/app/manager/${module}/${module}_url_config';`;
        if (!content.includes(importStr) && content.includes(`/manager/${module}`)) {
          const firstImportIdx = content.indexOf('import ');
          if (firstImportIdx !== -1) {
             content = content.slice(0, firstImportIdx) + importStr + '\n' + content.slice(firstImportIdx);
          } else {
             content = importStr + '\n' + content;
          }
          hasChanges = true;
        }
        
        // Replace `/manager/${module}` with ManagerXUrlConfig.BACKEND_API.BASE
        const stringRegex = new RegExp(`(['"\`])/manager/${module}(.*?)(\\1)`, 'g');
        const newContent = content.replace(stringRegex, (match, quote1, suffix, quote2) => {
            if (suffix === '') {
                // Was just '/manager/module' -> ManagerXUrlConfig.BACKEND_API.BASE
                return `Manager${capitalizedModule}UrlConfig.BACKEND_API.BASE`;
            } else if (quote1 === '`') {
                // It's a template string e.g. `/manager/members/${id}` -> `${ManagerXUrlConfig.BACKEND_API.BASE}/${id}`
                return `\`\${Manager${capitalizedModule}UrlConfig.BACKEND_API.BASE}${suffix}\``;
            } else {
                // It's a normal string e.g. '/manager/members/stats' -> `${ManagerXUrlConfig.BACKEND_API.BASE}/stats`
                return `\`\${Manager${capitalizedModule}UrlConfig.BACKEND_API.BASE}${suffix}\``;
            }
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
