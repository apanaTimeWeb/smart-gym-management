/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminWhiteLabelingMockFixtures owned by the superadmin_white_labeling feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_types/SuperadminWhiteLabelingTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import type { WhiteLabelDomain } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_types/SuperadminWhiteLabelingTypes';

export const mockWhiteLabelDomains: WhiteLabelDomain[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    gymId: '223e4567-e89b-12d3-a456-426614174000',
    gymName: 'Titan Fitness Elite',
    domain: 'titanelite.com',
    status: 'active',
    sslStatus: 'issued',
    logoUrl: 'https://placehold.co/100x100/png?text=Titan',
    primaryColor: '#D32F2F',
    createdAt: '2026-08-01T10:00:00Z',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    gymId: '223e4567-e89b-12d3-a456-426614174001',
    gymName: 'CrossFit Pioneers',
    domain: 'pioneers-app.com',
    status: 'pending',
    sslStatus: 'pending',
    logoUrl: 'https://placehold.co/100x100/png?text=CrossFit',
    primaryColor: '#F57C00',
    createdAt: '2026-09-18T14:30:00Z',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174002',
    gymId: '223e4567-e89b-12d3-a456-426614174002',
    gymName: 'Yoga Zen Studio',
    domain: 'zenyoga.me',
    status: 'failed',
    sslStatus: 'failed',
    logoUrl: null,
    primaryColor: null,
    createdAt: '2026-09-19T09:15:00Z',
  }
];
