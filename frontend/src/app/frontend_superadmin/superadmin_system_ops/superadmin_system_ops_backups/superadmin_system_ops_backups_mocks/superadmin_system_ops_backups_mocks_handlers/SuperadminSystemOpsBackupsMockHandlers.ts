/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsBackupsMockHandlers owned by the superadmin_system_ops_backups feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_constants/SuperadminSystemOpsBackupsConstants, http-status-codes, msw, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_mocks/superadmin_system_ops_backups_mocks_fixtures/SuperadminSystemOpsBackupsMockFixtures, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_schemas/SuperadminSystemOpsBackupsScheduleSchema, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_types/SuperadminSystemOpsBackupsScheduleTypes, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_types/SuperadminSystemOpsBackupsTypes, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse, delay } from 'msw';

import { SUPERADMIN_BACKUPS_STATUS_CODES, SUPERADMIN_BACKUPS_FILTER_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_constants/SuperadminSystemOpsBackupsConstants';
import { MOCK_SUPERADMIN_BACKUPS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_mocks/superadmin_system_ops_backups_mocks_fixtures/SuperadminSystemOpsBackupsMockFixtures';
import { SuperadminBackupsScheduleInputSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_schemas/SuperadminSystemOpsBackupsScheduleSchema';

import type { SuperadminBackupsSchedule } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_types/SuperadminSystemOpsBackupsScheduleTypes';
import type { BackupRecord } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_types/SuperadminSystemOpsBackupsTypes';
import type { ApiResponse } from '@/lib/api';



const BASE_URL = '*/superadmin/system-ops/backups';
let mockBackups = [...MOCK_SUPERADMIN_BACKUPS];
let mockBackupSchedule: SuperadminBackupsSchedule = { cronExpression: '0 2 * * *', retentionDays: 30, updatedAt: '2026-09-18T02:00:00Z' };
export function resetSuperadminBackupsMockState(): void {
    mockBackups = [...MOCK_SUPERADMIN_BACKUPS];
    mockBackupSchedule = { cronExpression: '0 2 * * *', retentionDays: 30, updatedAt: '2026-09-18T02:00:00Z' };
}

export const superadminBackupsHandlers = [
    http.get(`${BASE_URL}/schedule`, async () => HttpResponse.json<ApiResponse<SuperadminBackupsSchedule>>({ success: true, message: 'Backup schedule loaded', data: mockBackupSchedule })),
    http.patch(`${BASE_URL}/schedule`, async ({ request }) => {
        const parsed = SuperadminBackupsScheduleInputSchema.safeParse(await request.json());
        if (!parsed.success) return HttpResponse.json<ApiResponse<SuperadminBackupsSchedule>>({ success: false, message: 'Invalid backup schedule', data: null as unknown as SuperadminBackupsSchedule }, { status: StatusCodes.BAD_REQUEST });
        mockBackupSchedule = { ...parsed.data, updatedAt: new Date().toISOString() };
        return HttpResponse.json<ApiResponse<SuperadminBackupsSchedule>>({ success: true, message: 'Backup schedule updated', data: mockBackupSchedule });
    }),
    http.get(BASE_URL, async ({ request }) => {
        await delay(250);
        const u = new URL(request.url);
        const page = Number(u.searchParams.get('page') || '1');
        const limit = Number(u.searchParams.get('limit') || '10');
        const search = (u.searchParams.get('search') || '').toLowerCase();
        const status = u.searchParams.get('status');
        const type = u.searchParams.get('type');
        let filtered = [...mockBackups];
        if (search)
            filtered = filtered.filter((b) => `${b.tenantName} ${b.databaseName} ${b.id}`.toLowerCase().includes(search));
        if (status && status !== SUPERADMIN_BACKUPS_FILTER_STATUS_CODES.ALL)
            filtered = filtered.filter((b) => b.status === status);
        if (type && type !== 'ALL')
            filtered = filtered.filter((b) => (Number(b.id.replace('bk', '')) % 2 === 0 ? 'MANUAL' : 'AUTOMATED') === type);
        const total = filtered.length;
        const data = filtered.slice((page - 1) * limit, page * limit);
        return HttpResponse.json<ApiResponse<BackupRecord[]>>({ success: true, message: 'Success', data, meta: { total, page, limit, totalPages: Math.max(1, Math.ceil(total / limit)) } });
    }),
    http.post(`${BASE_URL}/trigger`, async () => { await delay(300); const created: BackupRecord = { ...MOCK_SUPERADMIN_BACKUPS[0]!, id: `bk${Date.now()}`, status: SUPERADMIN_BACKUPS_STATUS_CODES.IN_PROGRESS, timestamp: new Date().toISOString() }; mockBackups = [created, ...mockBackups]; return HttpResponse.json<ApiResponse<null>>({ success: true, message: 'Backup snapshot queued', data: null }); }),
    http.post(`${BASE_URL}/:id/restore`, async ({ params }) => {
        await delay(350);
        const id = String(params.id);
        const existing = mockBackups.find((backup) => backup.id === id);
        if (!existing) {
            return HttpResponse.json<ApiResponse<null>>({ success: false, message: 'Backup snapshot not found', data: null }, { status: StatusCodes.NOT_FOUND });
        }
        mockBackups = mockBackups.map((backup) => backup.id === id ? { ...backup, status: SUPERADMIN_BACKUPS_STATUS_CODES.IN_PROGRESS, timestamp: new Date().toISOString() } : backup);
        return HttpResponse.json<ApiResponse<null>>({ success: true, message: 'Backup restore started', data: null });
    }),
    http.get(`${BASE_URL}/:id/download`, async ({ params }) => HttpResponse.json<ApiResponse<{
        downloadUrl: string;
    }>>({ success: true, message: 'Backup download ready', data: { downloadUrl: `/mock-backups/${String(params.id)}.sql` } })),
];
