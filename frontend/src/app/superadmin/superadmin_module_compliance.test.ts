import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const moduleRoot = path.resolve(__dirname);

const FEATURE_ROOTS = new Set(
    fs.readdirSync(moduleRoot, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && !entry.name.startsWith('superadmin_'))
        .map((entry) => entry.name),
);

function sourceFiles(root: string): string[] {
    const output: string[] = [];
    for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
        if (entry.name === 'node_modules') continue;
        const absolute = path.join(root, entry.name);
        if (entry.isDirectory()) output.push(...sourceFiles(absolute));
        else if (/\.(ts|tsx)$/.test(entry.name)) output.push(absolute);
    }
    return output;
}

function productionFiles(): string[] {
    return sourceFiles(moduleRoot).filter((file) => !/\.test\.tsx?$/.test(file));
}

describe('superadmin module architecture contract', () => {
    it('contains no relative imports or TypeScript ignore directives', () => {
        for (const file of sourceFiles(moduleRoot)) {
            const source = fs.readFileSync(file, 'utf8');
            expect(source, file).not.toMatch(/(?:from|import)\s+['"]\./);
            expect(source, file).not.toMatch(/@ts-(?:ignore|nocheck)/);
        }
    });

    it('contains no forbidden cross-feature business imports', () => {
        for (const file of productionFiles()) {
            const normalized = file.split(path.sep).join('/');
            const match = normalized.match(/\/superadmin\/([^/]+)\//);
            if (!match || !FEATURE_ROOTS.has(match[1])) continue;

            const currentFeature = match[1];
            const source = fs.readFileSync(file, 'utf8');
            const imports = source.matchAll(/from\s+['"]@\/app\/superadmin\/([^/'"]+)/g);
            for (const imported of imports) {
                const importedFeature = imported[1];
                if (FEATURE_ROOTS.has(importedFeature)) {
                    expect(importedFeature, `${normalized} -> ${importedFeature}`).toBe(currentFeature);
                }
            }
        }
    });

    it('does not contain a role-wide business status registry', () => {
        const forbiddenFile = path.join(
            moduleRoot,
            'superadmin_components',
            'SuperadminShared',
            'SuperadminStatusBadgeConfig.ts',
        );
        expect(fs.existsSync(forbiddenFile)).toBe(false);
        for (const file of productionFiles()) {
            const source = fs.readFileSync(file, 'utf8');
            expect(source, file).not.toContain('SuperadminStatusBadgeConfig');
        }
    });

    it('uses semantic theme classes instead of raw/arbitrary Tailwind colors or generic shadows', () => {
        for (const file of productionFiles()) {
            if (!file.endsWith('.tsx')) continue;
            const source = fs.readFileSync(file, 'utf8');
            expect(source, file).not.toMatch(/\b(?:bg|text|border|ring)-\[(?:var\(|#)/);
            expect(source, file).not.toMatch(/\b(?:bg|text)-(?:white|black|background|foreground)\b/);
            expect(source, file).not.toMatch(/\bshadow-(?:sm|md|lg|xl|2xl)\b/);
        }
    });

    it('contains no numeric HTTP status literals or legacy status CSS variables', () => {
        for (const file of productionFiles()) {
            const source = fs.readFileSync(file, 'utf8');
            expect(source, file).not.toMatch(/StatusCodes\s*==?\s*\d+/);
            expect(source, file).not.toMatch(/\b(?:status|statusCode)\s*===?\s*(?:400|401|403|404|409|422|429|500|502|503)\b/);
            expect(source, file).not.toMatch(/var\(--(?:success|warning|danger|info|purple)\b/);
        }
    });

    it('contains no placeholder/no-op test patterns', () => {
        for (const file of sourceFiles(moduleRoot)) {
            if (!/\.test\.tsx?$/.test(file)) continue;
            const source = fs.readFileSync(file, 'utf8');
            expect(source, file).not.toMatch(/statSync\(import\.meta\.url\.replace/);
            expect(source, file).not.toMatch(/expect\(\s*(?:true|false|1)\s*\)\.to/);
        }
    });

    it('keeps TypeScript components within the documented 300-line ceiling', () => {
        for (const file of productionFiles()) {
            if (!file.endsWith('.tsx')) continue;
            const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/).length;
            expect(lines, file).toBeLessThanOrEqual(300);
        }
    });
});
