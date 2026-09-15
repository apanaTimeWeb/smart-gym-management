import { http, HttpResponse, delay } from 'msw';
import type { FeatureFlag, ReleaseNote } from '@/app/superadmin/features/superadmin_features_types/superadmin_features_types';
import type { ApiResponse } from '@/lib/api';

const BASE_URL = '*/api/v1/superadmin/features';

let mockFlags: FeatureFlag[] = [
  { id: 'f1', name: 'Beta Dashboard', description: 'New analytics layout', isGlobalEnabled: false, enabledTenantIds: ['t1', 't2'] },
  { id: 'f2', name: 'AI Workout Generator', description: 'Generates workouts using AI', isGlobalEnabled: true, enabledTenantIds: [] },
  { id: 'f3', name: 'WhatsApp Integration', description: 'Send automated WhatsApp alerts', isGlobalEnabled: false, enabledTenantIds: ['t3'] },
];

let mockNotes: ReleaseNote[] = [
  { id: 'rn1', version: 'v2.1.0', title: 'WhatsApp Alerts Live', content: 'Added WhatsApp integration for all Enterprise users.', date: '2023-10-15', isPublished: true },
  { id: 'rn2', version: 'v2.2.0-beta', title: 'AI Workouts Beta', content: 'Testing AI generated workouts.', date: '2023-11-01', isPublished: false },
];

export const superadminFeaturesHandlers = [
  http.get(BASE_URL, async () => {
    await delay(400);
    return HttpResponse.json<ApiResponse<{ flags: FeatureFlag[]; notes: ReleaseNote[] }>>({
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
      return HttpResponse.json<ApiResponse<FeatureFlag>>({ success: false, message: 'Not found', data: null }, { status: 404 });
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
      return HttpResponse.json<ApiResponse<FeatureFlag>>({ success: false, message: 'Not found', data: null }, { status: 404 });
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
      date: body.date || new Date().toISOString().split('T')[0] as string,
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
      return HttpResponse.json<ApiResponse<ReleaseNote>>({ success: false, message: 'Not found', data: null }, { status: 404 });
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
