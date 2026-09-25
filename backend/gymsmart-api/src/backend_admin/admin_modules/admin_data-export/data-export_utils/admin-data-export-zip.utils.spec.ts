// RESPONSIBILITY: Owns the single implementation responsibility represented by admin-data-export-zip.utils.spec.
// FLOW: Owning boundary -> implementation -> approved dependencies -> caller.
import { AdminDataExportZipUtils } from '@/backend_admin/admin_modules/admin_data-export/data-export_utils/admin-data-export-zip.utils.js';

describe('AdminDataExportZipUtils', () => {
  it('quotes CSV cells containing commas, quotes, or newlines', () => {
    const csv = AdminDataExportZipUtils.csv([{ id: '1', note: 'hello, "world"' }]);
    expect(csv).toContain('"hello, ""world"""');
  });

  it('generates a ZIP artifact from named CSV contents', () => {
    const artifact = AdminDataExportZipUtils.zip([{ name: 'members.csv', content: 'id,name\n1,Asha\n' }]);
    expect(artifact.subarray(0, 4).toString('hex')).toBe('504b0304');
    expect(artifact.length).toBeGreaterThan(50);
  });
});
