import { StatusCodes } from 'http-status-codes';
import { FeaturesUrlConfig } from '@/app/superadmin/features/superadmin_features_url_config';
import { formatSuperadminFeaturesCalendarDate } from '@/app/superadmin/features/features_utils/SuperadminFeaturesDateUtils';
import { http, HttpResponse, delay } from 'msw';
import type { FeatureFlag, ReleaseNote, SuperadminFeatureHistoryEntry } from '@/app/superadmin/features/features_types/SuperadminFeaturesTypes';
import type { ApiResponse } from '@/lib/api';
import { SUPERADMIN_FEATURE_FLAGS, SUPERADMIN_RELEASE_NOTES, SUPERADMIN_FEATURE_TENANTS, SUPERADMIN_FEATURE_HISTORY } from '@/app/superadmin/features/features_mocks/fixtures/SuperadminFeaturesMockFixtures';
const BASE_URL = `*${FeaturesUrlConfig.BACKEND_API.BASE}`;
export let mockFlags: FeatureFlag[] = [...SUPERADMIN_FEATURE_FLAGS];
export let mockNotes: ReleaseNote[] = [...SUPERADMIN_RELEASE_NOTES];

export function resetSuperadminFeaturesMockState(): void {
    mockFlags = [...SUPERADMIN_FEATURE_FLAGS];
    mockNotes = [...SUPERADMIN_RELEASE_NOTES];
}
export const superadminFeaturesHandlers = [
    http.get(`*${FeaturesUrlConfig.BACKEND_API.TENANTS}`, async () => HttpResponse.json({ success: true, message: 'Success', data: SUPERADMIN_FEATURE_TENANTS })),
    http.get(`${BASE_URL}/flags/:id/history`, async ({ params }) => {
        await delay(250);
        const id = String(params.id);
        const history: SuperadminFeatureHistoryEntry[] = SUPERADMIN_FEATURE_HISTORY[id] ?? [];
        return HttpResponse.json<ApiResponse<SuperadminFeatureHistoryEntry[]>>({ success: true, message: 'Feature history loaded', data: history });
    }),
    http.get(BASE_URL, async () => {
        await delay(400);
        return HttpResponse.json<ApiResponse<{
            flags: FeatureFlag[];
            notes: ReleaseNote[];
        }>>({
            success: true,
            message: 'Success',
            data: { flags: mockFlags, notes: mockNotes },
        });
    }),
    http.post(`${BASE_URL}/flags`, async ({ request }) => {
        await delay(500);
        const body = await request.json() as Partial<FeatureFlag>;
        const newFlag: FeatureFlag = {
            ...body,
            id: `f${Date.now()}`,
            name: body.name || 'New Feature',
            description: body.description || '',
            isGlobalEnabled: body.isGlobalEnabled || false,
            enabledTenantIds: body.enabledTenantIds || [],
        };
        mockFlags = [newFlag, ...mockFlags];
        return HttpResponse.json<ApiResponse<FeatureFlag>>({
            success: true,
            message: 'Created',
            data: newFlag,
        });
    }),
    http.patch(`${BASE_URL}/flags/:id`, async ({ params, request }) => {
        await delay(500);
        const id = params.id as string;
        const body = await request.json() as Partial<FeatureFlag>;
        let updated: FeatureFlag | null = null;
        mockFlags = mockFlags.map(f => {
            if (f.id === id) {
                updated = { ...f, ...body };
                return updated;
            }
            return f;
        });
        if (!updated) {
            return HttpResponse.json<ApiResponse<FeatureFlag>>({ success: false, message: 'Not found', data: null }, { status: StatusCodes.NOT_FOUND });
        }
        return HttpResponse.json<ApiResponse<FeatureFlag>>({
            success: true,
            message: 'Updated',
            data: updated,
        });
    }),
    http.post(`${BASE_URL}/flags/:id/toggle`, async ({ params }) => {
        await delay(400);
        const id = params.id as string;
        let updated: FeatureFlag | null = null;
        mockFlags = mockFlags.map(f => {
            if (f.id === id) {
                updated = { ...f, isGlobalEnabled: !f.isGlobalEnabled };
                return updated;
            }
            return f;
        });
        if (!updated) {
            return HttpResponse.json<ApiResponse<FeatureFlag>>({ success: false, message: 'Not found', data: null }, { status: StatusCodes.NOT_FOUND });
        }
        return HttpResponse.json<ApiResponse<FeatureFlag>>({
            success: true,
            message: 'Toggled',
            data: updated,
        });
    }),
    http.delete(`${BASE_URL}/flags/:id`, async ({ params }) => {
        await delay(400);
        const id = params.id as string;
        mockFlags = mockFlags.filter(f => f.id !== id);
        return HttpResponse.json<ApiResponse<null>>({
            success: true,
            message: 'Deleted',
            data: null,
        });
    }),
    http.post(`${BASE_URL}/notes`, async ({ request }) => {
        await delay(500);
        const body = await request.json() as Partial<ReleaseNote>;
        const newNote: ReleaseNote = {
            ...body,
            id: `rn${Date.now()}`,
            version: body.version || 'v1.0.0',
            title: body.title || 'New Note',
            content: body.content || '',
            date: body.date || formatSuperadminFeaturesCalendarDate(new Date()),
            isPublished: body.isPublished || false,
        };
        mockNotes = [newNote, ...mockNotes];
        return HttpResponse.json<ApiResponse<ReleaseNote>>({
            success: true,
            message: 'Created',
            data: newNote,
        });
    }),
    http.patch(`${BASE_URL}/notes/:id`, async ({ params, request }) => {
        await delay(500);
        const id = params.id as string;
        const body = await request.json() as Partial<ReleaseNote>;
        let updated: ReleaseNote | null = null;
        mockNotes = mockNotes.map(n => {
            if (n.id === id) {
                updated = { ...n, ...body };
                return updated;
            }
            return n;
        });
        if (!updated) {
            return HttpResponse.json<ApiResponse<ReleaseNote>>({ success: false, message: 'Not found', data: null }, { status: StatusCodes.NOT_FOUND });
        }
        return HttpResponse.json<ApiResponse<ReleaseNote>>({
            success: true,
            message: 'Updated',
            data: updated,
        });
    }),
    http.delete(`${BASE_URL}/notes/:id`, async ({ params }) => {
        await delay(400);
        const id = params.id as string;
        mockNotes = mockNotes.filter(n => n.id !== id);
        return HttpResponse.json<ApiResponse<null>>({
            success: true,
            message: 'Deleted',
            data: null,
        });
    }),
];
