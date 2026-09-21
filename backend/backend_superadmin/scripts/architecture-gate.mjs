import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve('src');
const files = [];
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name); if(entry.name==='node_modules'||entry.name==='dist') continue; if(entry.isDirectory()) walk(p); else files.push(p);}}
walk(root);
const errors=[];
for(const file of files.filter(f=>f.endsWith('.ts'))){const rel=path.relative(root,file).replaceAll('\\','/'); const text=fs.readFileSync(file,'utf8');
 if(/(^|\n)\s*\/\/(?! RESPONSIBILITY:| FLOW:| SLA:)/.test(text.split('\n')[0]??'')){};
 if((rel.includes('/services/')||rel.endsWith('.controller.ts')||rel.endsWith('.repository.ts')) && !text.startsWith('// RESPONSIBILITY:')) errors.push(`${rel}: missing RESPONSIBILITY header`);
 if((rel.includes('/services/')||rel.endsWith('.controller.ts')||rel.endsWith('.repository.ts')) && !text.includes('// FLOW:')) errors.push(`${rel}: missing FLOW header`);
 if(text.includes('require(')) errors.push(`${rel}: CommonJS require() forbidden`);
 if(/from ['"]\.\.\//.test(text)) errors.push(`${rel}: relative upward import forbidden`);
 if(/\.save\(/.test(text) && rel.includes('/services/')) errors.push(`${rel}: service persistence via save() forbidden`);
 if(/\bconsole\.(log|error|warn)\(/.test(text)) errors.push(`${rel}: console logging forbidden`);
}
if(errors.length){console.error(errors.join('\n')); process.exit(1);}
console.log(`Architecture gate passed: ${files.length} authored files scanned.`);
