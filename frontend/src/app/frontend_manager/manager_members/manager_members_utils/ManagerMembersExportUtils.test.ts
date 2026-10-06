import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from '@/app/frontend_manager/manager_members/manager_members_utils/ManagerMembersExportUtils';

describe('ManagerMembersExportUtils behavioral contract', () => {
  it('downloadManagerMembersCsv is callable', () => {
    expect(typeof moduleUnderTest.downloadManagerMembersCsv).toBe('function');
  });
  it('printManagerMembersPdf is callable', () => {
    expect(typeof moduleUnderTest.printManagerMembersPdf).toBe('function');
  });
});
