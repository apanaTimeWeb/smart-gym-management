const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('c:\\Users\\satya\\Desktop\\PojectsToWork\\Smart-Gym-Management\\backend\\gymsmart-api\\src');
let changedCount = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  
  // Replace the old import path with the new one
  const newContent = content.replace(/@\/backend_superadmin\/modules\/backend_superadmin\//g, '@/backend_superadmin/modules/superadmin/');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    changedCount++;
    console.log(`Updated imports in: ${file}`);
  }
}

console.log(`\nFinished updating ${changedCount} files.`);
