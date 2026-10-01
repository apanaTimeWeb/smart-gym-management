// RESPONSIBILITY: Renders the SuperadminProfileBasic.test UI for the profile feature. Business/data orchestration is delegated to module-owned hooks.
import { beforeEach, describe, expect, it } from 'vitest';

import { MOCK_SUPERADMIN_PROFILE } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_mocks/superadmin_profile_mocks_fixtures/SuperadminProfileMockFixtures';
import { resetSuperadminProfileMockState } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_mocks/superadmin_profile_mocks_handlers/SuperadminProfileMockHandlers';

beforeEach(() => resetSuperadminProfileMockState());

describe('Superadmin Profile fixture behavior', () => {
  it('contains the identity, role, timezone, and security fields required by profile tabs', () => {
    expect(MOCK_SUPERADMIN_PROFILE).toMatchObject({ id: 'sa_123', role: 'SUPERADMIN', timezone: 'Asia/Kolkata', language: 'en', twoFactorEnabled: false });
    expect(MOCK_SUPERADMIN_PROFILE.email).toContain('@');
    expect(MOCK_SUPERADMIN_PROFILE.createdAt).toBeTruthy();
  });
});
