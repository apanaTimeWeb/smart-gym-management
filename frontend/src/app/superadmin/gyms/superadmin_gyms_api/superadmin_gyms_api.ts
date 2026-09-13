// RESPONSIBILITY: Modularized API client for the Gyms module. All methods import apiFetch from src/lib/api.ts.
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { Tenant } from '@/app/superadmin/gyms/superadmin_gyms_types/superadmin_gyms_types';

import { MOCK_GYMS, MOCK_GYM_STATS } from '@/app/superadmin/gyms/superadmin_gyms_api/SuperadminGymsMockData';

let mockGymsList = [...MOCK_GYMS];

export const gymsApi = {
  fetchGyms: async (params?: Record<string, string>) => {
    await new Promise(r => setTimeout(r, 400));
    return { success: true, message: 'Success', data: mockGymsList };
  },
  fetchGymById: async (id: string) => {
    await new Promise(r => setTimeout(r, 300));
    return { success: true, message: 'Success', data: mockGymsList.find(g => g.id === id) as Tenant };
  },
  createGym: async (body: Partial<Tenant>) => {
    await new Promise(r => setTimeout(r, 500));
    const newGym = { ...body, id: `t${Date.now()}`, createdAt: new Date().toISOString() } as Tenant;
    mockGymsList = [newGym, ...mockGymsList];
    return { success: true, message: 'Created', data: newGym };
  },
  updateGym: async (id: string, body: Partial<Tenant>) => {
    await new Promise(r => setTimeout(r, 500));
    mockGymsList = mockGymsList.map(g => g.id === id ? { ...g, ...body } : g);
    return { success: true, message: 'Updated', data: mockGymsList.find(g => g.id === id) as Tenant };
  },
  changeGymStatus: async (id: string, status: string) => {
    await new Promise(r => setTimeout(r, 300));
    mockGymsList = mockGymsList.map(g => g.id === id ? { ...g, status: status as Tenant['status'] } : g);
    return { success: true, message: 'Status updated', data: mockGymsList.find(g => g.id === id) as Tenant };
  },
  deleteGym: async (id: string) => {
    await new Promise(r => setTimeout(r, 400));
    mockGymsList = mockGymsList.filter(g => g.id !== id);
    return { success: true, message: 'Deleted', data: undefined };
  },
  fetchGymStats: async () => {
    await new Promise(r => setTimeout(r, 200));
    return { success: true, message: 'Success', data: MOCK_GYM_STATS };
  },
  impersonateTenant: async (id: string) => {
    await new Promise(r => setTimeout(r, 400));
    return { success: true, message: 'Impersonating', data: { token: 'mock-jwt-token' } };
  },
  emailGymOwner: async (id: string, body: { subject: string; message: string; [key: string]: unknown }) => {
    await new Promise(r => setTimeout(r, 500));
    return { success: true, message: 'Email sent', data: undefined };
  },
  exportGymsCSV: async (params?: Record<string, string>) => {
    await new Promise(r => setTimeout(r, 600));
    return { success: true, message: 'Success', data: { downloadUrl: '/mock-download-url.csv' } };
  },
};
