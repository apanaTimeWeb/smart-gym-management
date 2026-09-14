const fs = require('fs');
const file = 'c:\\Users\\satya\\Desktop\\PojectsToWork\\Smart-Gym-Management\\frontend\\src\\app\\superadmin\\profile\\profile_components\\SuperadminProfileMain\\SuperadminProfileMain.test.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/jest\.mock/g, 'vi.mock');
content = content.replace(/jest\.fn/g, 'vi.fn');
content = content.replace(/jest\.Mock/g, 'import(\'vitest\').Mock');
content = content.replace(/import \{ describe, it, expect \} from 'vitest';/g, "import { describe, it, expect, vi } from 'vitest';");

// Fix vitest component mocking (needs default export)
content = content.replace(/vi\.mock\('(.*?)',\s*\(\)\s*=>\s*\(\)\s*=>\s*<div\s*data-testid="(.*?)"\s*\/>\);/g, "vi.mock('$1', () => ({ default: () => <div data-testid=\"$2\" /> }));");

fs.writeFileSync(file, content);
console.log('Fixed SuperadminProfileMain.test.tsx');
