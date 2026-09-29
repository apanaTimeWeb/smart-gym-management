import { Project } from 'ts-morph';
import fs from 'fs';

const project = new Project({
  tsConfigFilePath: "tsconfig.json",
});

const unusedFiles: string[] = [];

// Framework/special files that shouldn't be deleted even if unimported
const excludePatterns = [
  "page.tsx",
  "page.ts",
  "layout.tsx",
  "layout.ts",
  "loading.tsx",
  "loading.ts",
  "error.tsx",
  "error.ts",
  "not-found.tsx",
  "not-found.ts",
  "global-error.tsx",
  "global-error.ts",
  "route.ts",
  "template.tsx",
  "template.ts",
  "default.tsx",
  "default.ts",
  "middleware.ts",
  "i18n/request.ts",
  "test.ts",
  "test.tsx",
  "spec.ts",
  "spec.tsx",
  "setupTests.ts",
  "mocks",
  "e2e",
  ".stories."
];

for (const sourceFile of project.getSourceFiles()) {
  const filePath = sourceFile.getFilePath();
  
  // Skip node_modules or .next just in case
  if (filePath.includes('node_modules') || filePath.includes('.next') || filePath.includes('.kilo')) continue;

  // Skip files that match next.js conventions or testing
  if (excludePatterns.some(pattern => filePath.includes(pattern))) continue;

  const referencingSourceFiles = sourceFile.getReferencingSourceFiles();
  
  if (referencingSourceFiles.length === 0) {
    unusedFiles.push(filePath);
  }
}

fs.writeFileSync('unused-files.json', JSON.stringify(unusedFiles, null, 2));
console.log(`Found ${unusedFiles.length} unused files.`);
