const fs = require('fs');
const path = require('path');

const srcDir = 'c:\\Users\\satya\\Desktop\\PojectsToWork\\Smart-Gym-Management\\frontend\\src\\app\\superadmin';

const replacements = [
  // Modals
  { regex: /overflow-y-auto max-h-\[70vh\] custom-scrollbar/g, replacement: 'modal-scroll-area' },
  // Empty states
  { regex: /flex flex-col items-center justify-center min-h-\[400px\] gap-4 text-center p-8/g, replacement: 'empty-state-container' },
  // Tables
  { regex: /w-\[15%\]/g, replacement: 'w-2/12' },
  { regex: /w-\[20%\]/g, replacement: 'w-1/5' },
  { regex: /w-\[5%\]/g, replacement: 'w-1/12' },
  { regex: /w-\[10%\]/g, replacement: 'w-1/12' },
  { regex: /min-h-\[120px\]/g, replacement: 'min-h-32' },
  { regex: /min-h-\[500px\]/g, replacement: 'min-h-[32rem]' },
  // Charts
  { regex: /h-\[250px\]/g, replacement: 'h-64' },
  { regex: /h-\[350px\]/g, replacement: 'h-80' },
  { regex: /min-h-\[400px\]/g, replacement: 'min-h-96' },
  // Truncations
  { regex: /max-w-\[160px\]/g, replacement: 'max-w-xs' },
  { regex: /max-w-\[120px\]/g, replacement: 'max-w-[8rem]' },
  { regex: /max-w-\[100px\]/g, replacement: 'max-w-[6rem]' },
  { regex: /max-w-\[200px\]/g, replacement: 'max-w-sm' },
  { regex: /max-w-\[250px\]/g, replacement: 'max-w-md' }
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const { regex, replacement } of replacements) {
        if (regex.test(content)) {
          content = content.replace(regex, replacement);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Updated:', fullPath);
      }
    }
  }
}

processDir(srcDir);
console.log('Refactoring complete.');
