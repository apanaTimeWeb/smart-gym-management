// RESPONSIBILITY: Owns mutable MSW behavior for the Superadmin tenant segments feature.
import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';
import { SuperadminSegmentsUrlConfig } from '@/app/superadmin/segments/superadmin_segments_url_config';
import { SUPERADMIN_SEGMENTS_MOCK_FIXTURE } from '@/app/superadmin/segments/segments_mocks/fixtures/SuperadminSegmentsMockFixtures';
let mockSegments = [...SUPERADMIN_SEGMENTS_MOCK_FIXTURE.segments];

export function resetSuperadminSegmentsMockState(): void {
  mockSegments = [...SUPERADMIN_SEGMENTS_MOCK_FIXTURE.segments];
}
const presets = [...SUPERADMIN_SEGMENTS_MOCK_FIXTURE.presets];
export const superadminSegmentsHandlers = [
    http.get('*' + SuperadminSegmentsUrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin segments loaded.', data: { segments: mockSegments, presets } })),
    http.post(SuperadminSegmentsUrlConfig.BACKEND_API.BASE, async ({ request }) => {
        const payload = await request.json() as { name: string; description: string; rules: number; usedIn: string };
        const segment = { id: `seg-${Date.now()}`, ...payload, tenantCount: 0, updatedAt: new Date().toISOString(), usedIn: payload.usedIn };
        mockSegments = [segment, ...mockSegments];
        return HttpResponse.json({ success: true, message: 'Segment created.', data: { segment } });
    }),
    http.patch(`${SuperadminSegmentsUrlConfig.BACKEND_API.BASE}/:id`, async ({ params, request }) => {
        const id = String(params.id);
        const payload = await request.json() as { name: string; description: string; rules: number; usedIn: string };
        const current = mockSegments.find((item) => item.id === id);
        if (!current) return HttpResponse.json({ success: false, message: 'Segment not found.', data: null }, { status: StatusCodes.NOT_FOUND });
        const segment = { ...current, ...payload, updatedAt: new Date().toISOString() };
        mockSegments = mockSegments.map((item) => item.id === id ? segment : item);
        return HttpResponse.json({ success: true, message: 'Segment updated.', data: { segment } });
    }),
];
