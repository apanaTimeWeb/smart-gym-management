const fs = require('fs');
const path = require('path');

function replaceInDir(dir, searchStr, replaceStr) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath, searchStr, replaceStr);
    } else if (fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes(searchStr)) {
        content = content.replace(new RegExp(searchStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replaceStr);
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

// 1. Landing
replaceInDir('c:/Users/satya/Desktop/PojectsToWork/Smart-Gym-Management/backend/gymsmart-api/src/backend_landing', "'app.", "'landing.");
let landingConfig = fs.readFileSync('c:/Users/satya/Desktop/PojectsToWork/Smart-Gym-Management/backend/gymsmart-api/src/backend_landing/landing_core/landing_config/landing-app.config.ts', 'utf8');
landingConfig = landingConfig.replace("registerAs('app',", "registerAs('landing',");
fs.writeFileSync('c:/Users/satya/Desktop/PojectsToWork/Smart-Gym-Management/backend/gymsmart-api/src/backend_landing/landing_core/landing_config/landing-app.config.ts', landingConfig, 'utf8');

// 2. Superadmin
replaceInDir('c:/Users/satya/Desktop/PojectsToWork/Smart-Gym-Management/backend/gymsmart-api/src/backend_superadmin', "'app.", "'superadmin.");
let superadminConfig = fs.readFileSync('c:/Users/satya/Desktop/PojectsToWork/Smart-Gym-Management/backend/gymsmart-api/src/backend_superadmin/superadmin_core/superadmin_core_config/superadmin-core-configuration.ts', 'utf8');
superadminConfig = superadminConfig.replace("registerAs('app',", "registerAs('superadmin',");
fs.writeFileSync('c:/Users/satya/Desktop/PojectsToWork/Smart-Gym-Management/backend/gymsmart-api/src/backend_superadmin/superadmin_core/superadmin_core_config/superadmin-core-configuration.ts', superadminConfig, 'utf8');

// 3. Admin
replaceInDir('c:/Users/satya/Desktop/PojectsToWork/Smart-Gym-Management/backend/gymsmart-api/src/backend_admin', "'app.", "'adminApp.");
let adminConfig = fs.readFileSync('c:/Users/satya/Desktop/PojectsToWork/Smart-Gym-Management/backend/gymsmart-api/src/backend_admin/admin_core/admin_core_config/admin-core-app.config.ts', 'utf8');
adminConfig = adminConfig.replace("registerAs('app',", "registerAs('adminApp',");
fs.writeFileSync('c:/Users/satya/Desktop/PojectsToWork/Smart-Gym-Management/backend/gymsmart-api/src/backend_admin/admin_core/admin_core_config/admin-core-app.config.ts', adminConfig, 'utf8');

console.log("Done");
