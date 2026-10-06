/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminProfileMockFixtures owned by the superadmin_profile feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_profile/superadmin_profile_types/SuperadminProfileTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import type { SuperadminProfileData } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_types/SuperadminProfileTypes';

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
