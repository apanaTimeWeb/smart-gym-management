import { describe, expect, it, vi, afterEach } from 'vitest';
import { logErrorToMonitoring } from '@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutMonitoring';

describe('logErrorToMonitoring', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('sends sanitized monitoring context to the configured monitoring endpoint', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);
    const error = Object.assign(new Error('boom'), { digest: 'digest-1' });

    logErrorToMonitoring(error, { module: 'admin_members', route: '/admin/members' });
    await Promise.resolve();

    expect(fetchMock).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ method: 'POST' }));
    const body = JSON.parse(fetchMock.mock.calls[0][1].body as string) as { error: string; extra: { module: string; route: string; digest: string } };
    expect(body).toEqual(expect.objectContaining({ error: 'boom', extra: expect.objectContaining({ module: 'admin_members', route: '/admin/members', digest: 'digest-1' }) }));
  });
});
