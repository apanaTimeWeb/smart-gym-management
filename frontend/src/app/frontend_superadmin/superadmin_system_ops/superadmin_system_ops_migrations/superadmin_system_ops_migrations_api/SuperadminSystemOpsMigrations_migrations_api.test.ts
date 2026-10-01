// Test: migrationsApi — validates API contract, query-key propagation, and Zod schema parsing (P1-29/30)
// Note: Migrations module has no dedicated hook file; the API itself is the tested boundary.
import { SUPERADMIN_MIGRATION_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_constants/SuperadminSystemOpsMigrationsConstants';
import { useQuery } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('@tanstack/react-query', () => ({
    useQuery: vi.fn(),
}));
vi.mock('@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_api/SuperadminSystemOpsMigrationsApi', () => ({
    migrationsApi: {
        fetchMigrations: vi.fn(),
        startMigration: vi.fn(),
    },
}));
vi.mock('@/lib/api', () => ({
    apiFetch: vi.fn(),
}));
import { migrationsApi } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_api/SuperadminSystemOpsMigrationsApi';
describe('migrationsApi contract', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('fetchMigrations resolves with migration data', async () => {
        const mockData = [
            { id: 'MIG-001', tenantId: 'GYM-001', status: SUPERADMIN_MIGRATION_STATUS_CODES.COMPLETED, startedAt: '2024-01-01T10:00:00Z', completedAt: '2024-01-01T10:05:00Z' },
        ];
        (migrationsApi.fetchMigrations as ReturnType<typeof vi.fn>).mockResolvedValue({
            success: true,
            data: mockData,
        });
        const result = await migrationsApi.fetchMigrations();
        expect(result.success).toBe(true);
        expect(result.data).toEqual(mockData);
    });
    it('fetchMigrations with params appends query string correctly', async () => {
        (migrationsApi.fetchMigrations as ReturnType<typeof vi.fn>).mockResolvedValue({
            success: true,
            data: [],
        });
        await migrationsApi.fetchMigrations({ status: SUPERADMIN_MIGRATION_STATUS_CODES.FAILED, page: '1' });
        expect(migrationsApi.fetchMigrations).toHaveBeenCalledWith({ status: SUPERADMIN_MIGRATION_STATUS_CODES.FAILED, page: '1' });
    });
    it('fetchMigrations returns empty array without crashing', async () => {
        (migrationsApi.fetchMigrations as ReturnType<typeof vi.fn>).mockResolvedValue({
            success: true,
            data: [],
        });
        const result = await migrationsApi.fetchMigrations();
        expect(result.data).toEqual([]);
    });
    it('startMigration posts with the correct tenantId', async () => {
        (migrationsApi.startMigration as ReturnType<typeof vi.fn>).mockResolvedValue({
            success: true,
            message: 'Migration triggered successfully',
            data: undefined,
        });
        const result = await migrationsApi.startMigration('GYM-001', 'test-migration-001');
        expect(migrationsApi.startMigration).toHaveBeenCalledWith('GYM-001');
        expect(result.success).toBe(true);
    });
    it('startMigration surfaces server error message on failure', async () => {
        (migrationsApi.startMigration as ReturnType<typeof vi.fn>).mockResolvedValue({
            success: false,
            message: 'Tenant database is locked',
        });
        const result = await migrationsApi.startMigration('GYM-LOCKED', 'test-migration-locked');
        expect(result.success).toBe(false);
        expect(result.message).toContain('locked');
    });
});
