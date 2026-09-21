// RESPONSIBILITY: Mechanically checks high-value architecture gates on authored backend files before CI/package release.
// FLOW: CLI → filesystem scan → isolation/naming/size checks → exit status.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

import * as ts from 'typescript';


const root = join(process.cwd(), 'src');
const failures: string[] = [];


function importGroup(source: string, typeOnly: boolean): number {
  if (typeOnly) return 6;
  if (source.startsWith('node:')) return 0;
  if (source.startsWith('@nestjs/') || source === 'express') return 1;
  if (source.startsWith('@/core/')) return 3;
  if (source.startsWith('@/modules/')) return 4;
  if (source.startsWith('../') || source.startsWith('./')) return 5;
  return 2;
}

function verifyImportOrder(file: string, text: string, relative: string): void {
  const sourceFile = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
  const imports = sourceFile.statements.filter(ts.isImportDeclaration);
  let previousGroup = -1;
  for (let index = 0; index < imports.length; index += 1) {
    const current = imports[index];
    const group = importGroup(current.moduleSpecifier.text, current.importClause?.isTypeOnly === true);
    if (group < previousGroup) {
      failures.push(`${relative}: import groups are out of order (Rule 88).`);
    }
    if (index > 0 && group !== previousGroup) {
      const previous = imports[index - 1];
      const between = text.slice(previous.getEnd(), current.getStart(sourceFile));
      if (!/\n\s*\n/.test(between)) failures.push(`${relative}: import groups must be separated by a blank line (Rule 88).`);
    }
    previousGroup = group;
  }
}

function walk(directory: string): string[] {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

for (const file of walk(root)) {
  const text = readFileSync(file, 'utf8');
  const relative = file.replace(`${root}/`, '').replaceAll('\\', '/');
  if (text.includes("console.log(")) failures.push(`${relative}: console.log is forbidden.`);
  if (/\bany\b/.test(text.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '')) && !relative.includes('spec.ts')) failures.push(`${relative}: raw any token detected.`);
  if (text.includes('@ts-ignore') || text.includes('@ts-nocheck')) failures.push(`${relative}: TypeScript suppression detected.`);
  if (/from ['"](?:\.\.\/|\.\/)\//.test(text)) failures.push(`${relative}: relative import detected.`);
  verifyImportOrder(file, text, relative);

  const lines = text.split('\n').length;
  const ceiling =
    file.endsWith('.controller.ts') ? 200 :
    file.endsWith('.service.ts') ? 300 :
    file.endsWith('.repository.ts') ? 200 :
    file.endsWith('.entity.ts') || file.endsWith('.dto.ts') ? 150 :
    file.endsWith('.module.ts') ? 100 :
    0;
  if (ceiling > 0 && lines > ceiling) failures.push(`${relative}: ${lines} lines exceeds ${ceiling}.`);

  if (relative.startsWith('modules/landing/')) {
    const base = relative.split('/').at(-1) ?? '';
    const isReserved = ['landing.module.ts'].includes(base);
    if (!isReserved && !base.startsWith('landing')) failures.push(`${relative}: module file must use the landing prefix.`);
  }
}

for (const required of [
  'modules/landing/landing_backend_feature.md',
  'modules/landing/landing_dependencies.md',
  'modules/landing/landing_forbidden.md',
]) {
  try { readFileSync(join(root, required), 'utf8'); } catch { failures.push(`${required}: required module documentation missing.`); }
}

if (failures.length) {
  process.stderr.write(`${failures.join('\n')}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write('Architecture verification passed.\n');
}
