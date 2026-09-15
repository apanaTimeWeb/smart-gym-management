const fs = require('fs');
const path = require('path');

const superadminDir = path.join(__dirname, '../src/app/superadmin');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(superadminDir, function(filePath) {
  if (filePath.endsWith('Handlers.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix request.json() as unknown
    content = content.replace(/await request\.json\(\) as unknown/g, 'await request.json() as Record<string, any>');
    
    // Fix data: null as unknown
    content = content.replace(/data: null as unknown/g, 'data: null as unknown as any');
    
    // Fix newMig as unknown
    content = content.replace(/newMig as unknown/g, 'newMig as any');
    
    fs.writeFileSync(filePath, content, 'utf8');
  }
});
console.log('Done fixing handlers.');
