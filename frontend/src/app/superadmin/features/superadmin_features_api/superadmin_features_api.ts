import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/app/superadmin/superadmin_types/superadmin_types';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import type { FeatureFlag, ReleaseNote } from '@/app/superadmin/features/superadmin_features_types/superadmin_features_types';

import { MOCK_SUPERADMIN_FEATURES, MOCK_SUPERADMIN_RELEASE_NOTES } from '@/app/superadmin/features/superadmin_features_api/SuperadminFeaturesMockData';

let mockFlags = [...MOCK_SUPERADMIN_FEATURES];
let mockNotes = [...MOCK_SUPERADMIN_RELEASE_NOTES];

export const featuresApi = {
  fetchFeatures: async () => {
    await new Promise(r => setTimeout(r, 400));
    return { success: true, message: 'Success', data: { flags: mockFlags, notes: mockNotes } };
  },
  createFlag: async (body: Partial<FeatureFlag>) => {
    await new Promise(r => setTimeout(r, 500));
    const newFlag = { ...body, id: `f${Date.now()}` } as FeatureFlag;
    mockFlags = [newFlag, ...mockFlags];
    return { success: true, message: 'Created', data: newFlag };
  },
  updateFlag: async (id: string, body: Partial<FeatureFlag>) => {
    await new Promise(r => setTimeout(r, 500));
    mockFlags = mockFlags.map(f => f.id === id ? { ...f, ...body } : f);
    return { success: true, message: 'Updated', data: mockFlags.find(f => f.id === id) as FeatureFlag };
  },
  toggleFlag: async (id: string) => {
    await new Promise(r => setTimeout(r, 400));
    mockFlags = mockFlags.map(f => f.id === id ? { ...f, isGlobalEnabled: !f.isGlobalEnabled } : f);
    return { success: true, message: 'Toggled', data: mockFlags.find(f => f.id === id) as FeatureFlag };
  },
  removeFlag: async (id: string) => {
    await new Promise(r => setTimeout(r, 400));
    mockFlags = mockFlags.filter(f => f.id !== id);
    return { success: true, message: 'Deleted', data: undefined };
  },
  createNote: async (body: Partial<ReleaseNote>) => {
    await new Promise(r => setTimeout(r, 500));
    const newNote = { ...body, id: `rn${Date.now()}` } as ReleaseNote;
    mockNotes = [newNote, ...mockNotes];
    return { success: true, message: 'Created', data: newNote };
  },
  updateNote: async (id: string, body: Partial<ReleaseNote>) => {
    await new Promise(r => setTimeout(r, 500));
    mockNotes = mockNotes.map(n => n.id === id ? { ...n, ...body } : n);
    return { success: true, message: 'Updated', data: mockNotes.find(n => n.id === id) as ReleaseNote };
  },
  removeNote: async (id: string) => {
    await new Promise(r => setTimeout(r, 400));
    mockNotes = mockNotes.filter(n => n.id !== id);
    return { success: true, message: 'Deleted', data: undefined };
  },
};
