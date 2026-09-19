// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { downloadManagerHrStaffCsv } from '@/app/manager/hr/hr_utils/ManagerHrExportUtils';

describe('ManagerHrExportUtils', () => {
  it('creates and triggers a CSV download from query-backed staff rows', () => {
    const url = 'blob:manager-hr';
    vi.spyOn(URL, 'createObjectURL').mockReturnValue(url);
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    const click = vi.fn();
    vi.spyOn(document, 'createElement').mockImplementation(((tagName: string) => {
      if (tagName === 'a') return { href: '', download: '', click } as unknown as HTMLAnchorElement;
      return document.createElementNS('http://www.w3.org/1999/xhtml', tagName);
    }) as typeof document.createElement);

    downloadManagerHrStaffCsv([{ id: 'S1', name: 'Asha', email: 'asha@example.com', phone: '9999999999', role: 'Trainer', salary: 50000, branch: 'Main', isActive: true }]);

    expect(URL.createObjectURL).toHaveBeenCalledOnce();
    expect(click).toHaveBeenCalledOnce();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith(url);
  });
});
