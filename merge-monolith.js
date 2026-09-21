const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'backend');
const target = path.join(root, 'gymsmart-api');
const domains = ['backend_auth', 'backend_admin', 'backend_superadmin', 'backend_landing'];

// 1. Setup target
if (!fs.existsSync(target)) fs.mkdirSync(target, { recursive: true });
const targetSrc = path.join(target, 'src');
if (!fs.existsSync(targetSrc)) fs.mkdirSync(targetSrc, { recursive: true });

// 2. Copy src folders and rewrite imports
domains.forEach(domain => {
  const sourcePath = path.join(root, domain, 'src');
  const targetPath = path.join(targetSrc, domain);
  
  if (!fs.existsSync(sourcePath)) return;
  
  function copyAndRewrite(src, dest, domainName) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcFile = path.join(src, entry.name);
      const destFile = path.join(dest, entry.name);
      
      if (entry.isDirectory()) {
        copyAndRewrite(srcFile, destFile, domainName);
      } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.js'))) {
        let content = fs.readFileSync(srcFile, 'utf8');
        // Rewrite @/ to @/domainName/ to fix absolute paths
        content = content.replace(/from\s+['"]@\//g, `from '@/${domainName}/`);
        content = content.replace(/import\s+['"]@\//g, `import '@/${domainName}/`);
        fs.writeFileSync(destFile, content);
      } else {
        fs.copyFileSync(srcFile, destFile);
      }
    }
  }
  
  copyAndRewrite(sourcePath, targetPath, domain);
});

// 3. Merge package.json dependencies
let mergedDeps = {};
let mergedDevDeps = {};

domains.forEach(domain => {
  const pkgPath = path.join(root, domain, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    mergedDeps = { ...mergedDeps, ...(pkg.dependencies || {}) };
    mergedDevDeps = { ...mergedDevDeps, ...(pkg.devDependencies || {}) };
  }
});

const basePkgPath = path.join(root, 'backend_superadmin', 'package.json');
let basePkg = {};
if (fs.existsSync(basePkgPath)) {
  basePkg = JSON.parse(fs.readFileSync(basePkgPath, 'utf8'));
} else {
  basePkg = { name: "gymsmart-api-monolith", version: "1.0.0", scripts: { "start:dev": "nest start --watch" } };
}

basePkg.name = 'gymsmart-api-monolith';
basePkg.dependencies = mergedDeps;
basePkg.devDependencies = mergedDevDeps;
fs.writeFileSync(path.join(target, 'package.json'), JSON.stringify(basePkg, null, 2));

// 4. Create tsconfig.json
const tsconfig = {
  "compilerOptions": {
    "module": "commonjs",
    "target": "ES2023",
    "lib": ["ES2023"],
    "moduleResolution": "node",
    "outDir": "./dist",
    "baseUrl": "./",
    "paths": { "@/*": ["src/*"] },
    "sourceMap": true,
    "declaration": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts"]
};
fs.writeFileSync(path.join(target, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2));

// 5. Create Unified app.module.ts
const appModuleContent = `import { Module } from '@nestjs/common';

@Module({
  imports: [
    // TODO: Consolidate Database (TypeORM), Config, and Cache modules globally here
    // before importing the individual domain root modules.
  ],
})
export class AppModule {}
`;
fs.writeFileSync(path.join(targetSrc, 'app.module.ts'), appModuleContent);

// 6. Create main.ts
const mainContent = `import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Set global prefix if needed: app.setGlobalPrefix('api/v1');
  await app.listen(5000);
  console.log('Unified Monolith running on port 5000');
}
bootstrap();
`;
fs.writeFileSync(path.join(targetSrc, 'main.ts'), mainContent);

console.log('Migration script completed successfully!');
