import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Superadmin Architecture Invariants', () => {
  it('should not import from /admin, /manager, or /trainer', () => {
    const superadminDir = __dirname;
    
    function checkDir(dir: string) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
          checkDir(fullPath);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
          const content = fs.readFileSync(fullPath, 'utf-8');
          
          // Check for forbidden absolute imports
          const forbiddenAbsolute = /from\s+['"]@\/app\/(admin|manager|trainer)\/.*?['"]/g;
          const matchAbsolute = forbiddenAbsolute.exec(content);
          if (matchAbsolute) {
            throw new Error(`Architecture violation in ${fullPath}: Imports from @/app/${matchAbsolute[1]} are strictly forbidden in the Superadmin module.`);
          }
          
          // Check for forbidden relative imports jumping out of superadmin
          const forbiddenRelative = /from\s+['"]\.\.\/.*?['"]/g;
          let matchRelative;
          while ((matchRelative = forbiddenRelative.exec(content)) !== null) {
            const importPath = matchRelative[0];
            if (importPath.includes('/admin/') || importPath.includes('/manager/') || importPath.includes('/trainer/')) {
              throw new Error(`Architecture violation in ${fullPath}: Relative imports resolving to admin/manager/trainer are forbidden.`);
            }
          }
        }
      }
    }
    
    checkDir(superadminDir);
  });
});
