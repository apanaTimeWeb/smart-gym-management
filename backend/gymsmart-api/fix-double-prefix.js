const fs = require('fs');
const path = require('path');

const managerModulesDir = 'c:/Users/satya/Desktop/PojectsToWork/Smart-Gym-Management/backend/gymsmart-api/src/backend_manager/manager_modules';

function cleanDoublePrefix(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fp = path.join(dir, file);
        if (fs.statSync(fp).isDirectory()) {
            cleanDoublePrefix(fp);
        } else if (fp.endsWith('.ts')) {
            let content = fs.readFileSync(fp, 'utf8');
            if (content.includes('ManagerManager')) {
                // Fix double-Manager
                content = content.replace(/ManagerManager/g, 'Manager');
                fs.writeFileSync(fp, content);
            }
        }
    }
}

cleanDoublePrefix(managerModulesDir);
console.log('Fixed ManagerManager double prefix issue');
