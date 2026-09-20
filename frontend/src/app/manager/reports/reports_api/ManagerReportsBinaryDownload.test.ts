import { afterEach, describe, expect, it, vi } from 'vitest';
import { downloadManagerReportsBinary } from '@/app/manager/reports/reports_api/ManagerReportsApi';


afterEach(() => {
  vi.restoreAllMocks();
});

describe('ManagerReportsBinaryDownload', () => {
  it('returns the binary response for a successful export', async () => {
    const blob = new Blob(['csv']);
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(blob, { status: 200 }));
    await expect(downloadManagerReportsBinary('/api/v1/manager/reports/export?tab=Revenue')).resolves.toEqual(blob);
  });

  it('surfaces the backend message for an export failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({ message: 'Export is currently unavailable.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    }));

    await expect(downloadManagerReportsBinary('/api/v1/manager/reports/export?tab=Revenue')).rejects.toThrow('Export is currently unavailable.');
  });
});
