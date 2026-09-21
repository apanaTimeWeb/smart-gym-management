import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

// RESPONSIBILITY: Runs a TypeScript noEmit check over staged TypeScript files only before commit.
// FLOW: Git index -> staged TypeScript paths -> tsc --noEmit -> pre-commit result.

const staged = execFileSync('git', ['diff', '--cached', '--name-only', '--diff-filter=ACMR'], { encoding: 'utf8' })
  .split('\n')
  .map((value) => value.trim())
  .filter((value) => /\.(ts|mts|cts)$/.test(value));

if (staged.length === 0) process.exit(0);

const tsconfig = JSON.parse(readFileSync(new URL('../tsconfig.json', import.meta.url), 'utf8'));
const options = tsconfig.compilerOptions;
const compilerArgs = [
  '--noEmit',
  '--strict',
  '--target', String(options.target),
  '--module', String(options.module),
  '--moduleResolution', String(options.moduleResolution),
  '--baseUrl', String(options.baseUrl),
  '--esModuleInterop',
  '--experimentalDecorators',
  '--emitDecoratorMetadata',
  '--skipLibCheck',
  ...staged,
];

execFileSync('npx', ['--no-install', 'tsc', ...compilerArgs], { stdio: 'inherit' });
