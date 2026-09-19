// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { downloadManagerMembersCsv } from '@/app/manager/members/members_utils/ManagerMembersExportUtils';

describe('ManagerMembersExportUtils', () => {
  it('creates a CSV download from current server-backed member rows', () => {
    const url = 'blob:manager-members';
    vi.spyOn(URL, 'createObjectURL').mockReturnValue(url);
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    const anchor = { href: '', download: '', click: vi.fn(), remove: vi.fn() } as unknown as HTMLAnchorElement;
    vi.spyOn(document, 'createElement').mockReturnValue(anchor);
    vi.spyOn(document.body, 'appendChild').mockImplementation((node) => node);

    const member = { id: 'M1', name: 'Asha', phone: '9999999999', email: 'asha@example.com', plan: { name: 'Gold' }, planId: 'P1', status: 'ACTIVE', joinDate: '2026-01-01', expiryDate: '2026-12-31', paidAmount: 1000, pendingAmount: 0 };
    downloadManagerMembersCsv([member as never]);

    expect(anchor.click).toHaveBeenCalledOnce();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith(url);
  });
});
