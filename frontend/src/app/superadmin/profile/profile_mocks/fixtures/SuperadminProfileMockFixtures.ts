import type { SuperadminProfileData } from '@/app/superadmin/profile/profile_types/SuperadminProfileTypes';

export const MOCK_SUPERADMIN_PROFILE: SuperadminProfileData = {
    id: 'sa_123',
    name: 'Satya Nadella',
    email: 'satya@apnatime.com',
    phone: '+91 9876543210',
    role: 'SUPERADMIN',
    timezone: 'Asia/Kolkata',
    language: 'en',
    twoFactorEnabled: false,
    lastLoginAt: '2026-09-17T17:00:00.000Z',
    createdAt: '2025-01-01T00:00:00.000Z',
};
