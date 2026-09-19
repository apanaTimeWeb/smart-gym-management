import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const moduleRoot = path.dirname(fileURLToPath(import.meta.url));
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

describe('Superadmin Architecture Invariants', () => {
    it('has no cross-role or relative imports in the repaired module', () => {
        for (const file of productionFiles()) {
            const source = fs.readFileSync(file, 'utf8');
            expect(source, file).not.toMatch(/from\s+['"]@\/app\/(admin|manager|trainer)\//);
            expect(source, file).not.toMatch(/(?:from|import)\s+['"]\.\.?\//);
            expect(source, file).not.toMatch(/@ts-(?:ignore|nocheck)/);
        }
    });

    it('does not mount parallel V1 client trees from route pages', () => {
        for (const page of sourceFiles(moduleRoot).filter((file) => file.endsWith('/page.tsx'))) {
            const source = fs.readFileSync(page, 'utf8');
            expect(source, page).not.toContain('V1Client');
        }
    });

    it('has no dynamic-list index keys, tautological tests, or marker-only tests', () => {
        for (const file of sourceFiles(moduleRoot)) {
            const source = fs.readFileSync(file, 'utf8');
            expect(source, file).not.toMatch(/key=\{index\}/);
            if (/\.test\.tsx?$/.test(file)) {
                expect(source, file).not.toMatch(/JSON\.stringify\([^\n]+\)\)\.toBe\(JSON\.stringify\(/);
                expect(source, file).not.toContain('Contract test: proves the source artifact keeps its documented responsibility/data-flow marker.');
            }
        }
    });

    it('exports every interface/type declaration in dedicated *_types directories', () => {
        for (const file of productionFiles()) {
            if (!file.includes(`${path.sep}`) || !file.split(path.sep).some((part) => part.endsWith('_types'))) continue;
            const source = fs.readFileSync(file, 'utf8');
            expect(source, file).not.toMatch(/^(?:\s*)interface\s+/m);
            expect(source, file).not.toMatch(/^(?:\s*)type\s+[A-Za-z_$][\w$]*\s*=/m);
        }
    });

    it('has one canonical mock reset caller for every mutable handler export', () => {
        const tests = sourceFiles(moduleRoot).filter((file) => /\.test\.tsx?$/.test(file));
        const testText = tests.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
        for (const handler of productionFiles().filter((file) => file.includes('_mocks') && file.endsWith('MockHandlers.ts'))) {
            const source = fs.readFileSync(handler, 'utf8');
            const resets = source.match(/export function (resetSuperadmin\w+MockState)\s*\(/g) ?? [];
            for (const reset of resets) {
                const name = reset.match(/resetSuperadmin\w+MockState/)?.[0];
                expect(testText, `${handler} -> ${name}`).toContain(name!);
            }
        }
    });

    it('keeps production TSX within the 300-line component ceiling', () => {
        for (const file of productionFiles()) {
            if (!file.endsWith('.tsx')) continue;
            const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/).length;
            expect(lines, file).toBeLessThanOrEqual(300);
        }
    });

    it('keeps repaired Gym mock data internally consistent', () => {
        const gymFixtures = fs.readFileSync(path.join(moduleRoot, 'gyms', 'gyms_mocks', 'fixtures', 'SuperadminGymsMockFixtures.ts'), 'utf8');
        const detailFixtures = fs.readFileSync(path.join(moduleRoot, 'gyms', 'gyms_mocks', 'fixtures', 'SuperadminGymDetailMockFixtures.ts'), 'utf8');
        expect((gymFixtures.match(/\bid: 't\d+'/g) ?? []).length).toBe(24);
        expect((gymFixtures.match(/lastActiveAt:/g) ?? []).length).toBe(24);
        expect((detailFixtures.match(/^    t\d+: \{/gm) ?? []).length).toBe(24);
    });
});
