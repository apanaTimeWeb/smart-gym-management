import { describe, expect, it } from 'vitest';
import { createAdminMembersExportCsv } from '@/app/admin/members/members_utils/AdminMembersCreateExportCsv';
import type { AdminMember } from '@/app/admin/members/members_types/AdminMembersTypes';

const createMember = (overrides: Partial<AdminMember>): AdminMember => ({
  id: 'member-1',
  name: 'Riya Sharma',
  email: 'riya@example.com',
  phone: '9876543210',
  branchId: 'branch-1',
  branchName: 'Main Branch',
  planId: 'plan-1',
  planName: 'Premium',
  status: 'active',
  gender: 'female',
  joinDate: '2026-08-01',
  expiryDate: '2027-08-01',
  pendingAmount: 1250,
  ...overrides,
});

describe('createAdminMembersExportCsv', () => {
  it('contains the actual filtered member records rather than placeholder export rows', () => {
    const csv = createAdminMembersExportCsv([
      createMember({ id: 'member-1', name: 'Riya Sharma' }),
      createMember({ id: 'member-2', name: 'Amit Kumar', branchName: 'City Branch' }),
    ]);

    expect(csv).toContain('"member-1","Riya Sharma"');
    expect(csv).toContain('"member-2","Amit Kumar"');
    expect(csv).toContain('"City Branch"');
    expect(csv.split('\n')).toHaveLength(3);
  });

  it('escapes quotes in values without dropping the record', () => {
    const csv = createAdminMembersExportCsv([createMember({ name: 'A"B' })]);
    expect(csv).toContain('"A""B"');
  });
});
