// RESPONSIBILITY: Provides API access for saved Superadmin tenant segments; no fake production fallback.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminSegmentsUrlConfig } from '@/app/superadmin/segments/superadmin_segments_url_config';
import { SuperadminSegmentsResponseSchema, SuperadminSegmentMutationResponseSchema } from '@/app/superadmin/segments/segments_types/SuperadminSegmentsTypes';
import type { SuperadminSegmentsResponse, SuperadminSegmentCreatePayload, SuperadminSegmentCreateResponse, SuperadminSegmentUpdatePayload } from '@/app/superadmin/segments/segments_types/SuperadminSegmentsTypes';
export async function fetchSegments(): Promise<ApiResponse<SuperadminSegmentsResponse>> {
    return apiFetch<ApiResponse<SuperadminSegmentsResponse>>(SuperadminSegmentsUrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminSegmentsResponseSchema });
}
export async function createSegment(payload: SuperadminSegmentCreatePayload): Promise<ApiResponse<SuperadminSegmentCreateResponse>> {
    return apiFetch<ApiResponse<SuperadminSegmentCreateResponse>>(SuperadminSegmentsUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(payload), dataSchema: SuperadminSegmentMutationResponseSchema });
}
export async function updateSegment(id: string, payload: SuperadminSegmentUpdatePayload): Promise<ApiResponse<SuperadminSegmentCreateResponse>> {
    return apiFetch<ApiResponse<SuperadminSegmentCreateResponse>>(`${SuperadminSegmentsUrlConfig.BACKEND_API.BASE}/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(payload), dataSchema: SuperadminSegmentMutationResponseSchema });
}
